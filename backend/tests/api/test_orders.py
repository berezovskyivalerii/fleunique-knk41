from decimal import Decimal

import pytest
from fastapi import status

from app.models.product import Product
from app.models.promocode import Promocode
from app.models.user import User

API = "/api/v1"


def register_and_login(
    client, email: str, password: str = "password123"
) -> dict[str, str]:
    register_response = client.post(
        f"{API}/auth/register",
        json={
            "account_type": "personal",
            "full_name": "Order Test User",
            "email": email,
            "phone_number": "+380501234567",
            "password": password,
            "password_confirm": password,
        },
    )
    assert register_response.status_code == status.HTTP_201_CREATED

    login_response = client.post(
        f"{API}/auth/login",
        data={"username": email, "password": password},
    )
    assert login_response.status_code == status.HTTP_200_OK

    token = login_response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def order_payload(product_id: int, **overrides):
    payload = {
        "items": [{"product_id": product_id, "quantity": 2}],
        "receiver_name": "John Receiver",
        "receiver_phone": "+380501112233",
        "delivery_type": "delivery",
        "delivery_address": "Kyiv, Khreshchatyk 1",
        "delivery_floor": "3",
        "delivery_apartment": "12",
        "comment": "Call before delivery",
    }
    payload.update(overrides)
    return payload


@pytest.fixture(scope="module")
def products(db):
    first = Product(
        name="Order Test Roses",
        description="Test bouquet",
        price=Decimal("25.50"),
        is_active=True,
    )
    second = Product(
        name="Order Test Tulips",
        description="Second test bouquet",
        price=Decimal("10.00"),
        is_active=True,
    )
    inactive = Product(
        name="Inactive Order Product",
        description="Inactive product",
        price=Decimal("15.00"),
        is_active=False,
    )
    db.add_all([first, second, inactive])
    db.commit()
    db.refresh(first)
    db.refresh(second)
    db.refresh(inactive)
    return first, second, inactive


def test_create_order_requires_authentication(client, products):
    product, _, _ = products

    response = client.post(f"{API}/orders/", json=order_payload(product.id))

    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_create_delivery_order_success(client, products):
    product, _, _ = products
    headers = register_and_login(client, "order-create@example.com")

    response = client.post(
        f"{API}/orders/",
        headers=headers,
        json=order_payload(product.id),
    )

    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["status"] == "pending"
    assert data["receiver_name"] == "John Receiver"
    assert data["delivery_type"] == "delivery"
    assert data["delivery_address"] == "Kyiv, Khreshchatyk 1"
    assert Decimal(data["subtotal"]) == Decimal("51.00")
    assert Decimal(data["delivery_cost"]) == Decimal("4.00")
    assert Decimal(data["discount_amount"]) == Decimal("0.00")
    assert Decimal(data["total_price"]) == Decimal("55.00")
    assert len(data["items"]) == 1
    assert data["items"][0]["product_id"] == product.id
    assert data["items"][0]["quantity"] == 2
    assert Decimal(data["items"][0]["price_per_item"]) == Decimal("25.50")


def test_pickup_order_clears_delivery_address(client, products):
    product, _, _ = products
    headers = register_and_login(client, "order-pickup@example.com")

    response = client.post(
        f"{API}/orders/",
        headers=headers,
        json=order_payload(
            product.id,
            delivery_type="pickup",
            delivery_address="This value must not be persisted",
            delivery_floor="8",
            delivery_apartment="99",
        ),
    )

    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["delivery_type"] == "pickup"
    assert data["delivery_address"] is None
    assert data["delivery_floor"] is None
    assert data["delivery_apartment"] is None
    assert Decimal(data["delivery_cost"]) == Decimal("0.00")
    assert Decimal(data["total_price"]) == Decimal("51.00")


def test_delivery_order_requires_address(client, products):
    product, _, _ = products
    headers = register_and_login(client, "order-no-address@example.com")

    response = client.post(
        f"{API}/orders/",
        headers=headers,
        json=order_payload(product.id, delivery_address=None),
    )

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_create_order_with_missing_product_returns_404(client):
    headers = register_and_login(client, "order-missing-product@example.com")

    response = client.post(
        f"{API}/orders/",
        headers=headers,
        json=order_payload(999999),
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert "Products not found" in response.json()["detail"]


def test_create_order_with_inactive_product_returns_400(client, products):
    _, _, inactive = products
    headers = register_and_login(client, "order-inactive@example.com")

    response = client.post(
        f"{API}/orders/",
        headers=headers,
        json=order_payload(inactive.id),
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "Inactive products cannot be ordered" in response.json()["detail"]


def test_percentage_promocode_is_applied(client, db, products):
    product, _, _ = products
    promo = Promocode(
        code="SAVE10",
        discount_percentage=10,
        discount_fixed=None,
        is_active=True,
    )
    db.add(promo)
    db.commit()

    headers = register_and_login(client, "order-promo@example.com")
    response = client.post(
        f"{API}/orders/",
        headers=headers,
        json=order_payload(product.id, promocode="save10"),
    )

    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["promocode_str"] == "SAVE10"
    assert Decimal(data["subtotal"]) == Decimal("51.00")
    assert Decimal(data["discount_amount"]) == Decimal("5.10")
    assert Decimal(data["delivery_cost"]) == Decimal("4.00")
    assert Decimal(data["total_price"]) == Decimal("49.90")


def test_user_can_get_own_orders_and_order_by_id(client, products):
    product, _, _ = products
    headers = register_and_login(client, "order-read@example.com")

    create_response = client.post(
        f"{API}/orders/", headers=headers, json=order_payload(product.id)
    )
    order_id = create_response.json()["id"]

    list_response = client.get(f"{API}/orders/", headers=headers)
    get_response = client.get(f"{API}/orders/{order_id}", headers=headers)

    assert list_response.status_code == status.HTTP_200_OK
    assert any(order["id"] == order_id for order in list_response.json())
    assert get_response.status_code == status.HTTP_200_OK
    assert get_response.json()["id"] == order_id


def test_user_cannot_view_another_users_order(client, products):
    product, _, _ = products
    owner_headers = register_and_login(client, "order-owner@example.com")
    stranger_headers = register_and_login(client, "order-stranger@example.com")

    create_response = client.post(
        f"{API}/orders/", headers=owner_headers, json=order_payload(product.id)
    )
    order_id = create_response.json()["id"]

    response = client.get(f"{API}/orders/{order_id}", headers=stranger_headers)

    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_owner_can_cancel_pending_order(client, products):
    product, _, _ = products
    headers = register_and_login(client, "order-cancel@example.com")

    create_response = client.post(
        f"{API}/orders/", headers=headers, json=order_payload(product.id)
    )
    order_id = create_response.json()["id"]

    response = client.patch(f"{API}/orders/{order_id}/cancel", headers=headers)

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["status"] == "cancelled"


def test_regular_user_cannot_access_admin_orders(client):
    headers = register_and_login(client, "order-regular@example.com")

    response = client.get(f"{API}/orders/admin/all", headers=headers)

    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_admin_can_get_all_orders_and_update_status(client, db, products):
    product, _, _ = products
    user_email = "order-admin@example.com"
    headers = register_and_login(client, user_email)

    admin = db.query(User).filter(User.email == user_email).first()
    assert admin is not None
    admin.is_admin = True
    db.commit()

    create_response = client.post(
        f"{API}/orders/", headers=headers, json=order_payload(product.id)
    )
    order_id = create_response.json()["id"]

    list_response = client.get(f"{API}/orders/admin/all", headers=headers)
    update_response = client.patch(
        f"{API}/orders/{order_id}/status",
        headers=headers,
        json={"status": "processing"},
    )

    assert list_response.status_code == status.HTTP_200_OK
    assert any(order["id"] == order_id for order in list_response.json())
    assert update_response.status_code == status.HTTP_200_OK
    assert update_response.json()["status"] == "processing"

from decimal import Decimal

import pytest
from fastapi import status

from app.models.product import Product

API = "/api/v1"


def product_payload(**overrides):
    payload = {
        "name": "Test Bouquet",
        "description": "A beautiful test bouquet",
        "price": "19.99",
        "category_id": None,
        "is_active": True,
    }
    payload.update(overrides)
    return payload


@pytest.fixture(scope="module")
def products(db):
    active_one = Product(
        name="Product Test Roses",
        description="Active product one",
        price=Decimal("25.50"),
        category_id=1,
        is_active=True,
    )
    active_two = Product(
        name="Product Test Tulips",
        description="Active product two",
        price=Decimal("10.00"),
        category_id=2,
        is_active=True,
    )
    inactive = Product(
        name="Product Test Inactive",
        description="Inactive product",
        price=Decimal("15.00"),
        category_id=1,
        is_active=False,
    )
    db.add_all([active_one, active_two, inactive])
    db.commit()
    db.refresh(active_one)
    db.refresh(active_two)
    db.refresh(inactive)
    return active_one, active_two, inactive


# ---------------------------------------------------------------------------
# GET /products/
# ---------------------------------------------------------------------------


def test_get_all_products_is_public(client, products):
    response = client.get(f"{API}/products/")

    assert response.status_code == status.HTTP_200_OK


def test_get_all_products_excludes_inactive(client, products):
    active_one, active_two, inactive = products

    response = client.get(f"{API}/products/")

    assert response.status_code == status.HTTP_200_OK
    returned_ids = {item["id"] for item in response.json()}
    assert active_one.id in returned_ids
    assert active_two.id in returned_ids
    assert inactive.id not in returned_ids


def test_get_all_products_filters_by_category_id(client, products):
    active_one, active_two, _ = products

    response = client.get(f"{API}/products/", params={"category_id": active_one.category_id})

    assert response.status_code == status.HTTP_200_OK
    returned_ids = {item["id"] for item in response.json()}
    assert active_one.id in returned_ids
    assert active_two.id not in returned_ids


def test_get_all_products_respects_limit(client, products):
    response = client.get(f"{API}/products/", params={"skip": 0, "limit": 1})

    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) <= 1


def test_get_all_products_with_nonexistent_category_returns_empty(client, products):
    response = client.get(f"{API}/products/", params={"category_id": 999999})

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == []


# ---------------------------------------------------------------------------
# GET /products/{product_id}
# ---------------------------------------------------------------------------


def test_get_product_by_id_success(client, products):
    active_one, _, _ = products

    response = client.get(f"{API}/products/{active_one.id}")

    assert response.status_code == status.HTTP_200_OK
    body = response.json()
    assert body["id"] == active_one.id
    assert body["name"] == active_one.name
    assert Decimal(body["price"]) == active_one.price


def test_get_inactive_product_by_id_is_still_accessible(client, products):
    """Direct lookup by id is not filtered by is_active (unlike the list endpoint)."""
    _, _, inactive = products

    response = client.get(f"{API}/products/{inactive.id}")

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["is_active"] is False


def test_get_product_by_id_not_found(client, products):
    response = client.get(f"{API}/products/999999")

    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_get_product_by_id_invalid_id_type(client, products):
    response = client.get(f"{API}/products/not-a-number")

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


# ---------------------------------------------------------------------------
# POST /products/
# ---------------------------------------------------------------------------


def test_create_product_requires_authentication(client):
    response = client.post(f"{API}/products/", json=product_payload())

    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_create_product_requires_admin(client, normal_user_token_headers):
    response = client.post(
        f"{API}/products/",
        headers=normal_user_token_headers,
        json=product_payload(name="Should Not Be Created"),
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_create_product_success_as_admin(client, admin_token_headers):
    response = client.post(
        f"{API}/products/",
        headers=admin_token_headers,
        json=product_payload(name="Admin Created Bouquet", price="42.00"),
    )

    assert response.status_code == status.HTTP_201_CREATED
    body = response.json()
    assert body["name"] == "Admin Created Bouquet"
    assert Decimal(body["price"]) == Decimal("42.00")
    assert body["is_active"] is True
    assert "id" in body
    assert "created_at" in body


def test_create_product_defaults_is_active_true(client, admin_token_headers):
    payload = product_payload(name="Default Active Bouquet")
    del payload["is_active"]

    response = client.post(f"{API}/products/", headers=admin_token_headers, json=payload)

    assert response.status_code == status.HTTP_201_CREATED
    assert response.json()["is_active"] is True


@pytest.mark.parametrize("bad_price", ["0", "-5.00"])
def test_create_product_rejects_non_positive_price(client, admin_token_headers, bad_price):
    response = client.post(
        f"{API}/products/",
        headers=admin_token_headers,
        json=product_payload(price=bad_price),
    )

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_create_product_missing_required_fields(client, admin_token_headers):
    response = client.post(
        f"{API}/products/",
        headers=admin_token_headers,
        json={"description": "No name or price"},
    )

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_create_product_name_too_long(client, admin_token_headers):
    response = client.post(
        f"{API}/products/",
        headers=admin_token_headers,
        json=product_payload(name="a" * 300),
    )

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


# ---------------------------------------------------------------------------
# PATCH /products/{product_id}
# ---------------------------------------------------------------------------


def test_update_product_requires_authentication(client, products):
    active_one, _, _ = products

    response = client.patch(f"{API}/products/{active_one.id}", json={"name": "Hacked"})

    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_update_product_requires_admin(client, normal_user_token_headers, products):
    active_one, _, _ = products

    response = client.patch(
        f"{API}/products/{active_one.id}",
        headers=normal_user_token_headers,
        json={"name": "Hacked"},
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_update_product_partial_update_as_admin(client, admin_token_headers, db):
    product = Product(
        name="Product To Update",
        description="Original description",
        price=Decimal("30.00"),
        is_active=True,
    )
    db.add(product)
    db.commit()
    db.refresh(product)

    response = client.patch(
        f"{API}/products/{product.id}",
        headers=admin_token_headers,
        json={"price": "35.50"},
    )

    assert response.status_code == status.HTTP_200_OK
    body = response.json()
    assert Decimal(body["price"]) == Decimal("35.50")
    # Untouched fields must remain the same.
    assert body["name"] == "Product To Update"
    assert body["description"] == "Original description"


def test_update_product_can_deactivate(client, admin_token_headers, db):
    product = Product(name="Product To Deactivate", price=Decimal("12.00"), is_active=True)
    db.add(product)
    db.commit()
    db.refresh(product)

    response = client.patch(
        f"{API}/products/{product.id}",
        headers=admin_token_headers,
        json={"is_active": False},
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["is_active"] is False

    # Deactivated product must disappear from the public listing.
    list_response = client.get(f"{API}/products/")
    returned_ids = {item["id"] for item in list_response.json()}
    assert product.id not in returned_ids


def test_update_product_not_found(client, admin_token_headers):
    response = client.patch(
        f"{API}/products/999999",
        headers=admin_token_headers,
        json={"name": "Doesn't matter"},
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_update_product_rejects_non_positive_price(client, admin_token_headers, products):
    active_one, _, _ = products

    response = client.patch(
        f"{API}/products/{active_one.id}",
        headers=admin_token_headers,
        json={"price": "0"},
    )

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_update_product_empty_body_is_noop(client, admin_token_headers, db):
    product = Product(name="Untouched Product", price=Decimal("20.00"), is_active=True)
    db.add(product)
    db.commit()
    db.refresh(product)

    response = client.patch(
        f"{API}/products/{product.id}",
        headers=admin_token_headers,
        json={},
    )

    assert response.status_code == status.HTTP_200_OK
    body = response.json()
    assert body["name"] == "Untouched Product"
    assert Decimal(body["price"]) == Decimal("20.00")


# ---------------------------------------------------------------------------
# DELETE /products/{product_id}
# ---------------------------------------------------------------------------


def test_delete_product_requires_authentication(client, db):
    product = Product(name="Product To Delete Unauth", price=Decimal("5.00"), is_active=True)
    db.add(product)
    db.commit()
    db.refresh(product)

    response = client.delete(f"{API}/products/{product.id}")

    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_delete_product_requires_admin(client, normal_user_token_headers, db):
    product = Product(name="Product To Delete Forbidden", price=Decimal("5.00"), is_active=True)
    db.add(product)
    db.commit()
    db.refresh(product)

    response = client.delete(
        f"{API}/products/{product.id}",
        headers=normal_user_token_headers,
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_delete_product_success_as_admin(client, admin_token_headers, db):
    product = Product(name="Product To Delete", price=Decimal("8.00"), is_active=True)
    db.add(product)
    db.commit()
    db.refresh(product)

    response = client.delete(
        f"{API}/products/{product.id}",
        headers=admin_token_headers,
    )

    assert response.status_code == status.HTTP_204_NO_CONTENT

    get_response = client.get(f"{API}/products/{product.id}")
    assert get_response.status_code == status.HTTP_404_NOT_FOUND


def test_delete_product_not_found(client, admin_token_headers):
    response = client.delete(
        f"{API}/products/999999",
        headers=admin_token_headers,
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_delete_product_twice_returns_404_second_time(client, admin_token_headers, db):
    product = Product(name="Product Deleted Twice", price=Decimal("9.00"), is_active=True)
    db.add(product)
    db.commit()
    db.refresh(product)

    first = client.delete(f"{API}/products/{product.id}", headers=admin_token_headers)
    second = client.delete(f"{API}/products/{product.id}", headers=admin_token_headers)

    assert first.status_code == status.HTTP_204_NO_CONTENT
    assert second.status_code == status.HTTP_404_NOT_FOUND
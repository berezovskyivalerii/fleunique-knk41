import uuid

from fastapi import status
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models.address import Address
from app.models.payment_method import PaymentMethod
from app.models.user import User


# Helper function to generate an isolated user for each test
def _create_isolated_user(client: TestClient) -> tuple[dict, int, str]:
    email = f"user_{uuid.uuid4().hex[:8]}@example.com"
    password = "securePassword123!"

    register_res = client.post(
        "/api/v1/auth/register",
        json={
            "email": email,
            "password": password,
            "password_confirm": password,
            "full_name": "Isolated User",
        },
    )
    user_id = register_res.json()["id"]

    login_res = client.post(
        "/api/v1/auth/login", data={"username": email, "password": password}
    )
    token = login_res.json()["access_token"]

    return {"Authorization": f"Bearer {token}"}, user_id, email


def test_read_users_me(client: TestClient):
    headers, user_id, email = _create_isolated_user(client)

    response = client.get("/api/v1/users/me", headers=headers)

    assert response.status_code == 200
    data = response.json()
    assert data["email"] == email
    assert data["id"] == user_id
    assert data["is_active"] is True


def test_update_user_me(client: TestClient, db: Session):
    headers, user_id, _ = _create_isolated_user(client)
    update_data = {"full_name": "Updated Name", "phone_number": "+380991234567"}

    response = client.patch("/api/v1/users/me", headers=headers, json=update_data)

    assert response.status_code == 200
    data = response.json()
    assert data["full_name"] == "Updated Name"
    assert data["phone_number"] == "+380991234567"

    user = db.query(User).filter(User.id == user_id).first()
    assert user.full_name == "Updated Name"


def test_update_password_me(client: TestClient):
    headers, _, email = _create_isolated_user(client)
    old_password = "securePassword123!"
    new_password = "newPass123"

    res = client.patch(
        "/api/v1/users/me/password",
        headers=headers,
        json={"old_password": old_password, "new_password": new_password},
    )
    assert res.status_code == status.HTTP_204_NO_CONTENT

    # Verify login with new password
    login_new = client.post(
        "/api/v1/auth/login", data={"username": email, "password": new_password}
    )
    assert login_new.status_code == status.HTTP_200_OK
    assert "access_token" in login_new.json()


def test_delete_user_me(client: TestClient):
    headers, _, _ = _create_isolated_user(client)

    response = client.delete("/api/v1/users/me", headers=headers)
    assert response.status_code == status.HTTP_204_NO_CONTENT

    # Verify deactivation
    verify_response = client.get("/api/v1/users/me", headers=headers)
    assert verify_response.status_code in [
        status.HTTP_401_UNAUTHORIZED,
        status.HTTP_400_BAD_REQUEST,
    ]


def test_create_user_address(client: TestClient):
    headers, _, _ = _create_isolated_user(client)
    address_data = {"address_line": "123 Main St", "floor": "4", "apartment": "42"}

    response = client.post(
        "/api/v1/users/me/addresses",
        headers=headers,
        json=address_data,
    )

    assert response.status_code == 201
    data = response.json()
    assert data["address_line"] == "123 Main St"
    assert data["id"] is not None


def test_get_user_addresses(client: TestClient):
    headers, _, _ = _create_isolated_user(client)

    # Create address via API to maintain isolation
    client.post(
        "/api/v1/users/me/addresses",
        headers=headers,
        json={"address_line": "Test Avenue 1", "floor": "1", "apartment": "1"},
    )

    response = client.get("/api/v1/users/me/addresses", headers=headers)

    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert any(addr["address_line"] == "Test Avenue 1" for addr in data)


def test_update_user_address(client: TestClient):
    headers, _, _ = _create_isolated_user(client)

    create_res = client.post(
        "/api/v1/users/me/addresses",
        headers=headers,
        json={"address_line": "Old Street"},
    )
    address_id = create_res.json()["id"]

    update_data = {"address_line": "New Street", "apartment": "100"}

    response = client.patch(
        f"/api/v1/users/me/addresses/{address_id}",
        headers=headers,
        json=update_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert data["address_line"] == "New Street"
    assert data["apartment"] == "100"


def test_delete_user_address(client: TestClient, db: Session):
    headers, _, _ = _create_isolated_user(client)

    create_res = client.post(
        "/api/v1/users/me/addresses",
        headers=headers,
        json={"address_line": "To Be Deleted"},
    )
    address_id = create_res.json()["id"]

    response = client.delete(
        f"/api/v1/users/me/addresses/{address_id}", headers=headers
    )

    assert response.status_code == 204

    # Verify hard delete
    deleted_address = db.query(Address).filter(Address.id == address_id).first()
    assert deleted_address is None


def test_create_user_payment_method(client: TestClient):
    headers, _, _ = _create_isolated_user(client)
    payment_data = {
        "card_name": "Visa",
        "last_four_digits": "4242",
        "expiry_date": "12/26",
        "provider_token": "tok_12345",
    }

    response = client.post(
        "/api/v1/users/me/payment-methods",
        headers=headers,
        json=payment_data,
    )

    assert response.status_code == 201
    data = response.json()
    assert data["card_name"] == "Visa"
    assert data["last_four_digits"] == "4242"
    assert "provider_token" not in data


def test_delete_user_payment_method(client: TestClient, db: Session):
    headers, _, _ = _create_isolated_user(client)

    create_res = client.post(
        "/api/v1/users/me/payment-methods",
        headers=headers,
        json={
            "card_name": "MasterCard",
            "last_four_digits": "5555",
            "expiry_date": "11/25",
            "provider_token": "tok_67890",
        },
    )
    payment_id = create_res.json()["id"]

    response = client.delete(
        f"/api/v1/users/me/payment-methods/{payment_id}",
        headers=headers,
    )

    assert response.status_code == 204

    deleted_pm = db.query(PaymentMethod).filter(PaymentMethod.id == payment_id).first()
    assert deleted_pm is None


def test_admin_get_users(client: TestClient, admin_token_headers: dict):
    response = client.get("/api/v1/users", headers=admin_token_headers)

    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)


def test_normal_user_get_users_forbidden(client: TestClient):
    headers, _, _ = _create_isolated_user(client)
    response = client.get("/api/v1/users", headers=headers)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_admin_get_user_by_id(client: TestClient, admin_token_headers: dict):
    _, user_id, email = _create_isolated_user(client)

    response = client.get(f"/api/v1/users/{user_id}", headers=admin_token_headers)

    assert response.status_code == 200
    data = response.json()
    assert data["id"] == user_id
    assert data["email"] == email


def test_admin_update_user(client: TestClient, admin_token_headers: dict):
    _, user_id, _ = _create_isolated_user(client)
    update_data = {"is_active": False, "account_type": "business"}

    response = client.patch(
        f"/api/v1/users/{user_id}", headers=admin_token_headers, json=update_data
    )

    assert response.status_code == 200
    data = response.json()
    assert data["is_active"] is False
    assert data["account_type"] == "business"


def test_admin_delete_user(client: TestClient, admin_token_headers: dict, db: Session):
    _, user_id, _ = _create_isolated_user(client)

    response = client.delete(f"/api/v1/users/{user_id}", headers=admin_token_headers)

    assert response.status_code == 204

    # Verify hard delete
    deleted_user = db.query(User).filter(User.id == user_id).first()
    assert deleted_user is None


def test_update_nonexistent_address(client: TestClient):
    headers, _, _ = _create_isolated_user(client)
    response = client.patch(
        "/api/v1/users/me/addresses/99999",
        headers=headers,
        json={"address_line": "New"},
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_delete_nonexistent_address(client: TestClient):
    headers, _, _ = _create_isolated_user(client)
    response = client.delete("/api/v1/users/me/addresses/99999", headers=headers)
    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_access_other_user_address(client: TestClient):
    headers_a, _, _ = _create_isolated_user(client)
    addr_res = client.post(
        "/api/v1/users/me/addresses",
        headers=headers_a,
        json={"address_line": "User A St"},
    )
    addr_id = addr_res.json()["id"]

    headers_b, _, _ = _create_isolated_user(client)

    patch_res = client.patch(
        f"/api/v1/users/me/addresses/{addr_id}",
        headers=headers_b,
        json={"address_line": "Stolen St"},
    )
    assert patch_res.status_code == status.HTTP_404_NOT_FOUND

    del_res = client.delete(f"/api/v1/users/me/addresses/{addr_id}", headers=headers_b)
    assert del_res.status_code == status.HTTP_404_NOT_FOUND


def test_get_user_payment_methods_empty(client: TestClient):
    headers, _, _ = _create_isolated_user(client)
    response = client.get("/api/v1/users/me/payment-methods", headers=headers)
    assert response.status_code in [status.HTTP_200_OK, status.HTTP_400_BAD_REQUEST]


def test_delete_nonexistent_payment_method(client: TestClient):
    headers, _, _ = _create_isolated_user(client)
    response = client.delete("/api/v1/users/me/payment-methods/99999", headers=headers)
    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_delete_other_user_payment_method(client: TestClient):
    # User A
    headers_a, _, _ = _create_isolated_user(client)
    pm_res = client.post(
        "/api/v1/users/me/payment-methods",
        headers=headers_a,
        json={"card_name": "Visa", "last_four_digits": "9999", "expiry_date": "12/28"},
    )
    pm_id = pm_res.json()["id"]

    # User B
    headers_b, _, _ = _create_isolated_user(client)

    del_res = client.delete(
        f"/api/v1/users/me/payment-methods/{pm_id}", headers=headers_b
    )
    assert del_res.status_code == status.HTTP_404_NOT_FOUND


def test_admin_get_user_by_id_forbidden(client: TestClient):
    headers, _, _ = _create_isolated_user(client)
    response = client.get("/api/v1/users/1", headers=headers)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_admin_update_user_forbidden(client: TestClient):
    headers, _, _ = _create_isolated_user(client)
    response = client.patch(
        "/api/v1/users/1", headers=headers, json={"is_active": False}
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_admin_delete_user_forbidden(client: TestClient):
    headers, _, _ = _create_isolated_user(client)
    response = client.delete("/api/v1/users/1", headers=headers)
    assert response.status_code == status.HTTP_403_FORBIDDEN

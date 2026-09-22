from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models.address import Address
from app.models.payment_method import PaymentMethod
from app.models.user import User


def test_read_users_me(
    client: TestClient, normal_user_token_headers: dict, test_user: User
):
    # Act
    response = client.get("/api/v1/users/me", headers=normal_user_token_headers)

    # Assert
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == test_user.email
    assert data["id"] == test_user.id
    assert data["is_active"] is True


def test_update_user_me(
    client: TestClient, normal_user_token_headers: dict, db: Session, test_user: User
):
    # Arrange
    update_data = {"full_name": "Updated Name", "phone_number": "+380991234567"}

    # Act
    response = client.patch(
        "/api/v1/users/me", headers=normal_user_token_headers, json=update_data
    )

    # Assert
    assert response.status_code == 200
    data = response.json()
    assert data["full_name"] == "Updated Name"
    assert data["phone_number"] == "+380991234567"

    # Verify DB state
    db.refresh(test_user)
    assert test_user.full_name == "Updated Name"


def test_update_password_me(
    client: TestClient, normal_user_token_headers: dict, test_user_password: str
):
    update_data = {
        "old_password": test_user_password,
        "new_password": "new_password123",
    }

    response = client.patch(
        "/api/v1/users/me/password", headers=normal_user_token_headers, json=update_data
    )

    assert response.status_code == 204

    login_data = {
        "username": test_user_password,  # assuming email is used, adjust in real test
        "password": "new_secure_password123",
    }


def test_delete_user_me(
    client: TestClient, normal_user_token_headers: dict, db: Session, test_user: User
):
    response = client.delete("/api/v1/users/me", headers=normal_user_token_headers)

    assert response.status_code == 204

    db.refresh(test_user)
    assert test_user.is_active is False

    test_user.is_active = True
    db.add(test_user)
    db.commit()


def test_create_user_address(
    client: TestClient, normal_user_token_headers: dict, db: Session, test_user: User
):
    # Arrange
    address_data = {"address_line": "123 Main St", "floor": "4", "apartment": "42"}

    # Act
    response = client.post(
        "/api/v1/users/me/addresses",
        headers=normal_user_token_headers,
        json=address_data,
    )

    # Assert
    assert response.status_code == 201
    data = response.json()
    assert data["address_line"] == "123 Main St"
    assert data["id"] is not None


def test_get_user_addresses(
    client: TestClient, normal_user_token_headers: dict, db: Session, test_user: User
):
    address = Address(
        user_id=test_user.id, address_line="Test Avenue 1", floor="1", apartment="1"
    )
    db.add(address)
    db.commit()

    response = client.get(
        "/api/v1/users/me/addresses", headers=normal_user_token_headers
    )

    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1

    assert any(addr["address_line"] == "Test Avenue 1" for addr in data)


def test_update_user_address(
    client: TestClient, normal_user_token_headers: dict, db: Session, test_user: User
):
    # Arrange
    address = Address(
        user_id=test_user.id,
        address_line="Old Street",
    )
    db.add(address)
    db.commit()
    db.refresh(address)

    update_data = {"address_line": "New Street", "apartment": "100"}

    # Act
    response = client.patch(
        f"/api/v1/users/me/addresses/{address.id}",
        headers=normal_user_token_headers,
        json=update_data,
    )

    # Assert
    assert response.status_code == 200
    data = response.json()
    assert data["address_line"] == "New Street"
    assert data["apartment"] == "100"


def test_delete_user_address(
    client: TestClient, normal_user_token_headers: dict, db: Session, test_user: User
):
    # Arrange
    address = Address(
        user_id=test_user.id,
        address_line="To Be Deleted",
    )
    db.add(address)
    db.commit()
    db.refresh(address)

    # Act
    response = client.delete(
        f"/api/v1/users/me/addresses/{address.id}", headers=normal_user_token_headers
    )

    # Assert
    assert response.status_code == 204

    # Verify hard delete
    deleted_address = db.query(Address).filter(Address.id == address.id).first()
    assert deleted_address is None


def test_create_user_payment_method(
    client: TestClient, normal_user_token_headers: dict
):
    # Arrange
    payment_data = {
        "card_name": "Visa",
        "last_four_digits": "4242",
        "expiry_date": "12/26",
        "provider_token": "tok_12345",
    }

    # Act
    response = client.post(
        "/api/v1/users/me/payment-methods",
        headers=normal_user_token_headers,
        json=payment_data,
    )

    # Assert
    assert response.status_code == 201
    data = response.json()
    assert data["card_name"] == "Visa"
    assert data["last_four_digits"] == "4242"
    # Ensure token is not returned
    assert "provider_token" not in data


def test_delete_user_payment_method(
    client: TestClient, normal_user_token_headers: dict, db: Session, test_user: User
):
    # Arrange
    payment_method = PaymentMethod(
        user_id=test_user.id,
        card_name="MasterCard",
        last_four_digits="5555",
        expiry_date="11/25",
        provider_token="tok_67890",
    )
    db.add(payment_method)
    db.commit()
    db.refresh(payment_method)

    # Act
    response = client.delete(
        f"/api/v1/users/me/payment-methods/{payment_method.id}",
        headers=normal_user_token_headers,
    )

    # Assert
    assert response.status_code == 204

    deleted_pm = (
        db.query(PaymentMethod).filter(PaymentMethod.id == payment_method.id).first()
    )
    assert deleted_pm is None


def test_admin_get_users(
    client: TestClient, admin_token_headers: dict, test_user: User
):
    # Act
    response = client.get("/api/v1/users", headers=admin_token_headers)

    # Assert
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1


def test_normal_user_get_users_forbidden(
    client: TestClient, normal_user_token_headers: dict
):
    # Act
    response = client.get("/api/v1/users", headers=normal_user_token_headers)

    # Assert
    assert response.status_code == 403


def test_admin_get_user_by_id(
    client: TestClient, admin_token_headers: dict, test_user: User
):
    # Act
    response = client.get(f"/api/v1/users/{test_user.id}", headers=admin_token_headers)

    # Assert
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == test_user.id
    assert data["email"] == test_user.email


def test_admin_update_user(
    client: TestClient, admin_token_headers: dict, db: Session, test_user: User
):
    # Arrange
    update_data = {"is_active": False, "account_type": "business"}

    # Act
    response = client.patch(
        f"/api/v1/users/{test_user.id}", headers=admin_token_headers, json=update_data
    )

    # Assert
    assert response.status_code == 200
    data = response.json()
    assert data["is_active"] is False
    assert data["account_type"] == "business"


def test_admin_delete_user(client: TestClient, admin_token_headers: dict, db: Session):
    # Arrange
    new_user = User(
        full_name="User To Delete",
        email="delete_me@example.com",
        hashed_password="hashedpassword123",
        account_type="personal",
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Act
    response = client.delete(
        f"/api/v1/users/{new_user.id}", headers=admin_token_headers
    )

    # Assert
    assert response.status_code == 204

    # Verify hard delete
    deleted_user = db.query(User).filter(User.id == new_user.id).first()
    assert deleted_user is None

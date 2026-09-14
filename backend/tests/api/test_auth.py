import time

from fastapi import status


def test_register_user_success(client):
    response = client.post(
        "/api/v1/auth/register",
        json={
            "account_type": "personal",
            "full_name": "John Doe",
            "email": "john.doe@example.com",
            "phone_number": "+1234567890",
            "password": "securepassword123",
            "password_confirm": "securepassword123",
        },
    )

    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["email"] == "john.doe@example.com"
    assert data["full_name"] == "John Doe"
    assert data["account_type"] == "personal"
    assert "id" in data
    assert data["is_active"] is True
    assert "password" not in data
    assert "hashed_password" not in data


def test_register_user_password_mismatch(client):
    response = client.post(
        "/api/v1/auth/register",
        json={
            "account_type": "personal",
            "full_name": "Jane Doe",
            "email": "jane.doe@example.com",
            "password": "password123",
            "password_confirm": "differentpassword",
        },
    )

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_register_user_duplicate_email(client):
    client.post(
        "/api/v1/auth/register",
        json={
            "account_type": "personal",
            "full_name": "First User",
            "email": "duplicate@example.com",
            "password": "password",
            "password_confirm": "password",
        },
    )

    response = client.post(
        "/api/v1/auth/register",
        json={
            "account_type": "business",
            "full_name": "Second User",
            "email": "duplicate@example.com",
            "password": "password",
            "password_confirm": "password",
        },
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()["detail"] == "Email already registered"


def test_login_success(client):
    user_email = "login_test@example.com"
    user_password = "loginpassword123"

    client.post(
        "/api/v1/auth/register",
        json={
            "account_type": "personal",
            "full_name": "Login Test User",
            "email": user_email,
            "password": user_password,
            "password_confirm": user_password,
        },
    )

    response = client.post(
        "/api/v1/auth/login", data={"username": user_email, "password": user_password}
    )

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


def test_login_wrong_password(client):
    user_email = "wrong_pass@example.com"

    client.post(
        "/api/v1/auth/register",
        json={
            "account_type": "personal",
            "full_name": "Wrong Pass User",
            "email": user_email,
            "password": "correctpassword",
            "password_confirm": "correctpassword",
        },
    )

    response = client.post(
        "/api/v1/auth/login", data={"username": user_email, "password": "wrongpassword"}
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json()["detail"] == "Incorrect email or password"


def test_login_nonexistent_user(client):
    response = client.post(
        "/api/v1/auth/login",
        data={"username": "nobody@example.com", "password": "somepassword"},
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json()["detail"] == "Incorrect email or password"


def test_refresh_token_success(client):
    user_email = "refresh@example.com"
    user_password = "refreshpassword123"

    client.post(
        "/api/v1/auth/register",
        json={
            "account_type": "personal",
            "full_name": "Refresh User",
            "email": user_email,
            "password": user_password,
            "password_confirm": user_password,
        },
    )

    login_response = client.post(
        "/api/v1/auth/login", data={"username": user_email, "password": user_password}
    )

    refresh_token = login_response.json()["refresh_token"]
    old_access_token = login_response.json()["access_token"]

    time.sleep(1)

    response = client.post(
        "/api/v1/auth/refresh", json={"refresh_token": refresh_token}
    )

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["access_token"] != old_access_token


def test_refresh_token_invalid(client):
    response = client.post(
        "/api/v1/auth/refresh",
        json={"refresh_token": "some_random_invalid_token_string"},
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json()["detail"] == "Invalid or expired refresh token"


def test_logout_success_and_token_revocation(client):
    user_email = "logout@example.com"
    user_password = "logoutpassword123"

    client.post(
        "/api/v1/auth/register",
        json={
            "account_type": "personal",
            "full_name": "Logout User",
            "email": user_email,
            "password": user_password,
            "password_confirm": user_password,
        },
    )

    login_response = client.post(
        "/api/v1/auth/login", data={"username": user_email, "password": user_password}
    )

    refresh_token = login_response.json()["refresh_token"]

    logout_response = client.post(
        "/api/v1/auth/logout", json={"refresh_token": refresh_token}
    )

    assert logout_response.status_code == status.HTTP_204_NO_CONTENT

    refresh_response = client.post(
        "/api/v1/auth/refresh", json={"refresh_token": refresh_token}
    )

    assert refresh_response.status_code == status.HTTP_401_UNAUTHORIZED

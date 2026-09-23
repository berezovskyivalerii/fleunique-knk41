from datetime import datetime, timedelta, timezone
from decimal import Decimal

from fastapi import status

from app.models.promocode import Promocode

API = "/api/v1"


def percentage_payload(**overrides):
    payload = {
        "code": "SAVE10",
        "discount_percentage": 10,
        "discount_fixed": None,
        "is_active": True,
        "expires_at": None,
    }
    payload.update(overrides)
    return payload


def fixed_payload(**overrides):
    payload = {
        "code": "FIXED5",
        "discount_percentage": None,
        "discount_fixed": "5.00",
        "is_active": True,
        "expires_at": None,
    }
    payload.update(overrides)
    return payload


# ---------------------------------------------------------------------------
# POST /promocodes/
# ---------------------------------------------------------------------------


def test_create_promocode_requires_authentication(client):
    response = client.post(f"{API}/promocodes/", json=percentage_payload())
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_create_promocode_requires_admin(client, normal_user_token_headers):
    response = client.post(
        f"{API}/promocodes/",
        headers=normal_user_token_headers,
        json=percentage_payload(code="NOADMIN10"),
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_admin_can_create_percentage_promocode(client, admin_token_headers):
    response = client.post(
        f"{API}/promocodes/",
        headers=admin_token_headers,
        json=percentage_payload(code="percent10"),
    )

    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["code"] == "PERCENT10"
    assert data["discount_percentage"] == 10
    assert data["discount_fixed"] is None
    assert data["is_active"] is True


def test_admin_can_create_fixed_promocode(client, admin_token_headers):
    response = client.post(
        f"{API}/promocodes/",
        headers=admin_token_headers,
        json=fixed_payload(code="fixed-seven", discount_fixed="7.50"),
    )

    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["code"] == "FIXED-SEVEN"
    assert data["discount_percentage"] is None
    assert Decimal(data["discount_fixed"]) == Decimal("7.50")


def test_create_promocode_rejects_both_discount_types(client, admin_token_headers):
    response = client.post(
        f"{API}/promocodes/",
        headers=admin_token_headers,
        json=percentage_payload(
            code="BOTH-DISCOUNTS",
            discount_percentage=10,
            discount_fixed="5.00",
        ),
    )
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_create_promocode_rejects_missing_discount(client, admin_token_headers):
    response = client.post(
        f"{API}/promocodes/",
        headers=admin_token_headers,
        json=percentage_payload(
            code="NO-DISCOUNT",
            discount_percentage=None,
            discount_fixed=None,
        ),
    )
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_create_promocode_rejects_invalid_percentage(client, admin_token_headers):
    response = client.post(
        f"{API}/promocodes/",
        headers=admin_token_headers,
        json=percentage_payload(code="TOO-MUCH", discount_percentage=101),
    )
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_create_promocode_rejects_duplicate_code_case_insensitive(
    client, admin_token_headers
):
    first = client.post(
        f"{API}/promocodes/",
        headers=admin_token_headers,
        json=percentage_payload(code="UNIQUE20", discount_percentage=20),
    )
    second = client.post(
        f"{API}/promocodes/",
        headers=admin_token_headers,
        json=percentage_payload(code="unique20", discount_percentage=20),
    )

    assert first.status_code == status.HTTP_201_CREATED
    assert second.status_code == status.HTTP_400_BAD_REQUEST


# ---------------------------------------------------------------------------
# GET /promocodes/ and GET /promocodes/{id}
# ---------------------------------------------------------------------------


def test_promocode_list_requires_admin(client, normal_user_token_headers):
    response = client.get(f"{API}/promocodes/", headers=normal_user_token_headers)
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_admin_can_list_promocodes(client, admin_token_headers):
    response = client.get(f"{API}/promocodes/", headers=admin_token_headers)
    assert response.status_code == status.HTTP_200_OK
    assert isinstance(response.json(), list)


def test_admin_can_get_promocode_by_id(client, admin_token_headers):
    created = client.post(
        f"{API}/promocodes/",
        headers=admin_token_headers,
        json=percentage_payload(code="GETBYID15", discount_percentage=15),
    )
    promocode_id = created.json()["id"]

    response = client.get(
        f"{API}/promocodes/{promocode_id}", headers=admin_token_headers
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["id"] == promocode_id
    assert response.json()["code"] == "GETBYID15"


def test_get_missing_promocode_returns_404(client, admin_token_headers):
    response = client.get(
        f"{API}/promocodes/999999", headers=admin_token_headers
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND


# ---------------------------------------------------------------------------
# GET /promocodes/validate/{code}
# ---------------------------------------------------------------------------


def test_validate_active_promocode_is_public(client, db):
    promo = Promocode(
        code="PUBLIC25",
        discount_percentage=25,
        discount_fixed=None,
        is_active=True,
        expires_at=datetime.now(timezone.utc) + timedelta(days=1),
    )
    db.add(promo)
    db.commit()

    response = client.get(f"{API}/promocodes/validate/public25")

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["valid"] is True
    assert data["promocode"]["code"] == "PUBLIC25"


def test_validate_inactive_promocode_returns_400(client, db):
    promo = Promocode(
        code="INACTIVE-PROMO",
        discount_percentage=5,
        discount_fixed=None,
        is_active=False,
    )
    db.add(promo)
    db.commit()

    response = client.get(f"{API}/promocodes/validate/inactive-promo")
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()["detail"] == "Promocode is inactive."


def test_validate_expired_promocode_returns_400(client, db):
    promo = Promocode(
        code="EXPIRED-PROMO",
        discount_percentage=5,
        discount_fixed=None,
        is_active=True,
        expires_at=datetime.now(timezone.utc) - timedelta(days=1),
    )
    db.add(promo)
    db.commit()

    response = client.get(f"{API}/promocodes/validate/expired-promo")
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()["detail"] == "Promocode has expired."


def test_validate_missing_promocode_returns_404(client):
    response = client.get(f"{API}/promocodes/validate/not-existing-promo")
    assert response.status_code == status.HTTP_404_NOT_FOUND


# ---------------------------------------------------------------------------
# PATCH /promocodes/{id}
# ---------------------------------------------------------------------------


def test_update_promocode_requires_admin(client, normal_user_token_headers, db):
    promo = Promocode(
        code="UPDATE-NOADMIN",
        discount_percentage=10,
        discount_fixed=None,
        is_active=True,
    )
    db.add(promo)
    db.commit()
    db.refresh(promo)

    response = client.patch(
        f"{API}/promocodes/{promo.id}",
        headers=normal_user_token_headers,
        json={"is_active": False},
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_admin_can_partial_update_promocode(client, admin_token_headers):
    created = client.post(
        f"{API}/promocodes/",
        headers=admin_token_headers,
        json=percentage_payload(code="UPDATE-ME", discount_percentage=12),
    )
    promocode_id = created.json()["id"]

    response = client.patch(
        f"{API}/promocodes/{promocode_id}",
        headers=admin_token_headers,
        json={"is_active": False},
    )

    assert response.status_code == status.HTTP_200_OK
    assert response.json()["is_active"] is False
    assert response.json()["discount_percentage"] == 12


def test_admin_can_switch_percentage_to_fixed_discount(client, admin_token_headers):
    created = client.post(
        f"{API}/promocodes/",
        headers=admin_token_headers,
        json=percentage_payload(code="SWITCH-DISCOUNT", discount_percentage=30),
    )
    promocode_id = created.json()["id"]

    response = client.patch(
        f"{API}/promocodes/{promocode_id}",
        headers=admin_token_headers,
        json={"discount_fixed": "8.00"},
    )

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["discount_percentage"] is None
    assert Decimal(data["discount_fixed"]) == Decimal("8.00")


def test_update_promocode_rejects_duplicate_code(client, admin_token_headers):
    first = client.post(
        f"{API}/promocodes/",
        headers=admin_token_headers,
        json=percentage_payload(code="DUPLICATE-A"),
    )
    second = client.post(
        f"{API}/promocodes/",
        headers=admin_token_headers,
        json=percentage_payload(code="DUPLICATE-B"),
    )

    response = client.patch(
        f"{API}/promocodes/{second.json()['id']}",
        headers=admin_token_headers,
        json={"code": first.json()["code"].lower()},
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


# ---------------------------------------------------------------------------
# DELETE /promocodes/{id}
# ---------------------------------------------------------------------------


def test_delete_promocode_requires_admin(client, normal_user_token_headers, db):
    promo = Promocode(
        code="DELETE-NOADMIN",
        discount_percentage=10,
        discount_fixed=None,
        is_active=True,
    )
    db.add(promo)
    db.commit()
    db.refresh(promo)

    response = client.delete(
        f"{API}/promocodes/{promo.id}", headers=normal_user_token_headers
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_admin_can_delete_promocode(client, admin_token_headers):
    created = client.post(
        f"{API}/promocodes/",
        headers=admin_token_headers,
        json=fixed_payload(code="DELETE-ME"),
    )
    promocode_id = created.json()["id"]

    delete_response = client.delete(
        f"{API}/promocodes/{promocode_id}", headers=admin_token_headers
    )
    get_response = client.get(
        f"{API}/promocodes/{promocode_id}", headers=admin_token_headers
    )

    assert delete_response.status_code == status.HTTP_204_NO_CONTENT
    assert get_response.status_code == status.HTTP_404_NOT_FOUND

import pytest

from app.core.config import settings
from app.crud import user as crud_user
from app.models.user import User
from app.services.admin_seed import seed_admin
from app.services.auth import verify_password


@pytest.fixture(autouse=True)
def _admin_settings(monkeypatch):
    """Робимо дані адміна передбачуваними, а не зав'язаними на .env"""
    monkeypatch.setattr(settings, "ADMIN_EMAIL", "admin@test.local")
    monkeypatch.setattr(settings, "ADMIN_FULL_NAME", "Test Admin")
    monkeypatch.setattr(settings, "ADMIN_PHONE_NUMBER", "+380000000000")
    monkeypatch.setattr(settings, "ADMIN_PASSWORD", "supersecret123")


@pytest.fixture(autouse=True)
def _cleanup_admin(db_session):
    """Чистимо за собою, щоб тести не залежали один від одного"""
    yield
    db_session.query(User).filter(User.email == "admin@test.local").delete()
    db_session.commit()


def test_seed_admin_creates_admin_user(db_session):
    seed_admin(db_session)

    admin = crud_user.get_user_by_email(db_session, email=settings.ADMIN_EMAIL)

    assert admin is not None
    assert admin.is_admin is True
    assert admin.full_name == settings.ADMIN_FULL_NAME
    assert admin.phone_number == settings.ADMIN_PHONE_NUMBER


def test_seed_admin_hashes_password_correctly(db_session):
    seed_admin(db_session)

    admin = crud_user.get_user_by_email(db_session, email=settings.ADMIN_EMAIL)

    # пароль не зберігається у відкритому вигляді
    assert admin.hashed_password != settings.ADMIN_PASSWORD
    # ...но при этом реально соответствует исходному паролю
    assert verify_password(settings.ADMIN_PASSWORD, admin.hashed_password) is True


def test_seed_admin_is_idempotent(db_session):
    seed_admin(db_session)
    seed_admin(db_session)

    admins = (
        db_session.query(User)
        .filter(User.email == settings.ADMIN_EMAIL)
        .all()
    )

    assert len(admins) == 1

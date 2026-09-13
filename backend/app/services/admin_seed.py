from sqlalchemy.orm import Session

from app.core.config import settings
from app.crud import user as crud_user
from app.services.auth import get_password_hash


def seed_admin(db: Session) -> None:
    existing_admin = crud_user.get_user_by_email(db, email=settings.ADMIN_EMAIL)
    if existing_admin:
        print(f"Admin {settings.ADMIN_EMAIL} already exists, skipping")
        return

    crud_user.create_admin_user(
        db,
        full_name=settings.ADMIN_FULL_NAME,
        email=settings.ADMIN_EMAIL,
        phone_number=settings.ADMIN_PHONE_NUMBER,
        hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
    )
    print(f"Admin {settings.ADMIN_EMAIL} created")
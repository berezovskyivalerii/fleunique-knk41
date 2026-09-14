from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user: UserCreate, hashed_password: str) -> User:
    db_user = User(
        account_type=user.account_type,
        full_name=user.full_name,
        email=user.email,
        phone_number=user.phone_number,
        hashed_password=hashed_password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_admin_user(
    db: Session,
    full_name: str,
    email: str,
    phone_number: str | None,
    hashed_password: str,
) -> User:
    db_user = User(
        full_name=full_name,
        email=email,
        phone_number=phone_number,
        hashed_password=hashed_password,
        is_admin=True,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
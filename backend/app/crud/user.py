from sqlalchemy.orm import Session

from app.models.address import Address
from app.models.payment_method import PaymentMethod
from app.models.user import AccountType, User
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


def get_user(db: Session, user_id: int) -> User | None:
    return db.query(User).filter(User.id == user_id).first()


def get_users(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    is_active: bool | None = None,
    account_type: AccountType | None = None,
) -> list[User]:
    query = db.query(User)

    if is_active is not None:
        query = query.filter(User.is_active == is_active)
    if account_type is not None:
        query = query.filter(User.account_type == account_type)

    return query.offset(skip).limit(limit).all()


def update_user(db: Session, db_obj: User, update_data: dict) -> User:
    for field, value in update_data.items():
        setattr(db_obj, field, value)

    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)

    return db_obj


def delete_user(db: Session, db_obj: User) -> None:
    db.delete(db_obj)
    db.commit()


def get_address(db: Session, address_id: int, user_id: int) -> Address | None:
    return (
        db.query(Address)
        .filter(Address.id == address_id, Address.user_id == user_id)
        .first()
    )


def create_address(db: Session, address_data: dict, user_id: int) -> Address:
    db_obj = Address(**address_data, user_id=user_id)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def update_address(db: Session, db_obj: Address, update_data: dict) -> Address:
    for field, value in update_data.items():
        setattr(db_obj, field, value)

    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)

    return db_obj


def delete_address(db: Session, db_obj: Address) -> None:
    db.delete(db_obj)
    db.commit()


def get_payment_method(
    db: Session, payment_id: int, user_id: int
) -> PaymentMethod | None:
    return (
        db.query(PaymentMethod)
        .filter(PaymentMethod.id == payment_id, PaymentMethod.user_id == user_id)
        .first()
    )


def create_payment_method(
    db: Session, payment_data: dict, user_id: int
) -> PaymentMethod:
    db_obj = PaymentMethod(**payment_data, user_id=user_id)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def delete_payment_method(db: Session, db_obj: PaymentMethod) -> None:
    db.delete(db_obj)
    db.commit()

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.crud import user as crud_user
from app.models.address import Address
from app.models.payment_method import PaymentMethod
from app.models.user import AccountType, User
from app.schemas.payment_method import PaymentMethodCreate
from app.schemas.user import (
    AddressCreate,
    AddressUpdate,
    PasswordUpdate,
    UserUpdate,
    UserUpdateAdmin,
)
from app.services.auth import get_password_hash, verify_password


def update_current_user(db: Session, current_user: User, user_in: UserUpdate) -> User:
    update_data = user_in.model_dump(exclude_unset=True)
    return crud_user.update_user(db, db_obj=current_user, update_data=update_data)


def deactivate_user(db: Session, current_user: User) -> None:
    crud_user.update_user(db, db_obj=current_user, update_data={"is_active": False})


def update_user_password(
    db: Session, current_user: User, payload: PasswordUpdate
) -> None:
    if not verify_password(payload.old_password, current_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect old password"
        )

    new_hashed_password = get_password_hash(payload.new_password)
    crud_user.update_user(
        db, db_obj=current_user, update_data={"hashed_password": new_hashed_password}
    )


def add_user_address(
    db: Session, current_user: User, address_in: AddressCreate
) -> Address:
    return crud_user.create_address(
        db, address_data=address_in.model_dump(), user_id=current_user.id
    )


def update_user_address(
    db: Session, current_user: User, address_id: int, address_in: AddressUpdate
) -> Address:
    address = crud_user.get_address(db, address_id=address_id, user_id=current_user.id)
    if not address:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Address not found"
        )

    update_data = address_in.model_dump(exclude_unset=True)
    return crud_user.update_address(db, db_obj=address, update_data=update_data)


def remove_user_address(db: Session, current_user: User, address_id: int) -> None:
    address = crud_user.get_address(db, address_id=address_id, user_id=current_user.id)
    if not address:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Address not found"
        )
    crud_user.delete_address(db, db_obj=address)


def add_user_payment_method(
    db: Session, current_user: User, payment_in: PaymentMethodCreate
) -> PaymentMethod:
    return crud_user.create_payment_method(
        db, payment_data=payment_in.model_dump(), user_id=current_user.id
    )


def remove_user_payment_method(
    db: Session, current_user: User, payment_id: int
) -> None:
    payment_method = crud_user.get_payment_method(
        db, payment_id=payment_id, user_id=current_user.id
    )
    if not payment_method:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Payment method not found"
        )
    crud_user.delete_payment_method(db, db_obj=payment_method)


def admin_get_users(
    db: Session,
    skip: int,
    limit: int,
    is_active: bool | None,
    account_type: AccountType | None,
) -> list[User]:
    return crud_user.get_users(
        db, skip=skip, limit=limit, is_active=is_active, account_type=account_type
    )


def admin_get_user(db: Session, user_id: int) -> User:
    user = crud_user.get_user(db, user_id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    return user


def admin_update_user(db: Session, user_id: int, user_in: UserUpdateAdmin) -> User:
    user = crud_user.get_user(db, user_id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    update_data = user_in.model_dump(exclude_unset=True)
    return crud_user.update_user(db, db_obj=user, update_data=update_data)


def admin_delete_user(db: Session, user_id: int) -> None:
    user = crud_user.get_user(db, user_id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    crud_user.delete_user(db, db_obj=user)

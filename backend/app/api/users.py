from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db, require_admin_role
from app.models.user import AccountType, User
from app.schemas.payment_method import PaymentMethodCreate, PaymentMethodResponse
from app.schemas.user import (
    AddressCreate,
    AddressResponse,
    AddressUpdate,
    PasswordUpdate,
    UserResponse,
    UserUpdate,
    UserUpdateAdmin,
)
from app.services import user as user_service

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.patch("/me", response_model=UserResponse)
def update_user_me(
    user_in: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return user_service.update_current_user(
        db, current_user=current_user, user_in=user_in
    )


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_me(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    user_service.deactivate_user(db, current_user=current_user)
    return None


@router.patch("/me/password", status_code=status.HTTP_204_NO_CONTENT)
def update_password_me(
    payload: PasswordUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    user_service.update_user_password(db, current_user=current_user, payload=payload)
    return None


@router.get("/me/addresses", response_model=list[AddressResponse])
def get_user_addresses(current_user: User = Depends(get_current_user)):
    return current_user.addresses


@router.post(
    "/me/addresses", response_model=AddressResponse, status_code=status.HTTP_201_CREATED
)
def create_user_address(
    address_in: AddressCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return user_service.add_user_address(
        db, current_user=current_user, address_in=address_in
    )


@router.patch("/me/addresses/{address_id}", response_model=AddressResponse)
def update_user_address(
    address_id: int,
    address_in: AddressUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return user_service.update_user_address(
        db, current_user=current_user, address_id=address_id, address_in=address_in
    )


@router.delete("/me/addresses/{address_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_address(
    address_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    user_service.remove_user_address(
        db, current_user=current_user, address_id=address_id
    )
    return None


@router.get("/me/payment-methods", response_model=list[PaymentMethodResponse])
def get_user_payment_methods(current_user: User = Depends(get_current_user)):
    return current_user.payment_methods


@router.post(
    "/me/payment-methods",
    response_model=PaymentMethodResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_user_payment_method(
    payment_in: PaymentMethodCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return user_service.add_user_payment_method(
        db, current_user=current_user, payment_in=payment_in
    )


@router.delete(
    "/me/payment-methods/{payment_id}", status_code=status.HTTP_204_NO_CONTENT
)
def delete_user_payment_method(
    payment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    user_service.remove_user_payment_method(
        db, current_user=current_user, payment_id=payment_id
    )
    return None


@router.get("", response_model=list[UserResponse])
def get_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    is_active: bool | None = None,
    account_type: AccountType | None = None,
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin_role),
):
    return user_service.admin_get_users(
        db, skip=skip, limit=limit, is_active=is_active, account_type=account_type
    )


@router.get("/{user_id}", response_model=UserResponse)
def get_user_by_id(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin_role),
):
    return user_service.admin_get_user(db, user_id=user_id)


@router.patch("/{user_id}", response_model=UserResponse)
def update_user_by_admin(
    user_id: int,
    user_in: UserUpdateAdmin,
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin_role),
):
    return user_service.admin_update_user(db, user_id=user_id, user_in=user_in)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_by_admin(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin_role),
):
    user_service.admin_delete_user(db, user_id=user_id)
    return None

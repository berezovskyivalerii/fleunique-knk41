from datetime import datetime, timezone

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.crud import promocode as promocode_crud
from app.models.promocode import Promocode
from app.schemas.promocode import PromocodeCreate, PromocodeUpdate


def _is_expired(promocode: Promocode) -> bool:
    if promocode.expires_at is None:
        return False

    expires_at = promocode.expires_at
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)

    return expires_at <= datetime.now(timezone.utc)


def _get_promocode_or_404(db: Session, promocode_id: int) -> Promocode:
    promocode = promocode_crud.get_promocode_by_id(db, promocode_id)
    if not promocode:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Promocode not found.",
        )
    return promocode


def create_promocode_service(
    db: Session, promocode_in: PromocodeCreate
) -> Promocode:
    existing = promocode_crud.get_promocode_by_code(db, promocode_in.code)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Promocode with this code already exists.",
        )

    try:
        return promocode_crud.create_promocode(db, promocode_in)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Promocode with this code already exists.",
        )


def get_all_promocodes_service(
    db: Session, skip: int = 0, limit: int = 100
) -> list[Promocode]:
    return promocode_crud.get_all_promocodes(db, skip=skip, limit=limit)


def get_promocode_service(db: Session, promocode_id: int) -> Promocode:
    return _get_promocode_or_404(db, promocode_id)


def validate_promocode_service(db: Session, code: str) -> Promocode:
    promocode = promocode_crud.get_promocode_by_code(db, code)
    if not promocode:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Promocode not found.",
        )

    if not promocode.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Promocode is inactive.",
        )

    if _is_expired(promocode):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Promocode has expired.",
        )

    return promocode


def update_promocode_service(
    db: Session,
    promocode_id: int,
    promocode_in: PromocodeUpdate,
) -> Promocode:
    db_promocode = _get_promocode_or_404(db, promocode_id)

    if promocode_in.code is not None:
        existing = promocode_crud.get_promocode_by_code(db, promocode_in.code)
        if existing and existing.id != promocode_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Promocode with this code already exists.",
            )

    update_data = promocode_in.model_dump(exclude_unset=True)
    if (
        "discount_percentage" in update_data
        and update_data["discount_percentage"] is None
        and "discount_fixed" not in update_data
        and db_promocode.discount_fixed is None
    ):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="A promocode must have a discount value.",
        )

    if (
        "discount_fixed" in update_data
        and update_data["discount_fixed"] is None
        and "discount_percentage" not in update_data
        and db_promocode.discount_percentage is None
    ):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="A promocode must have a discount value.",
        )

    try:
        return promocode_crud.update_promocode(db, db_promocode, promocode_in)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid promocode data.",
        )


def delete_promocode_service(db: Session, promocode_id: int) -> None:
    db_promocode = _get_promocode_or_404(db, promocode_id)
    try:
        promocode_crud.delete_promocode(db, db_promocode)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Cannot delete promocode because it is still referenced.",
        )

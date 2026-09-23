from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.promocode import Promocode
from app.schemas.promocode import PromocodeCreate, PromocodeUpdate


def get_promocode_by_id(db: Session, promocode_id: int) -> Promocode | None:
    return db.query(Promocode).filter(Promocode.id == promocode_id).first()


def get_promocode_by_code(db: Session, code: str) -> Promocode | None:
    normalized_code = code.strip().lower()
    return (
        db.query(Promocode)
        .filter(func.lower(Promocode.code) == normalized_code)
        .first()
    )


def get_all_promocodes(db: Session, skip: int = 0, limit: int = 100) -> list[Promocode]:
    return (
        db.query(Promocode)
        .order_by(Promocode.created_at.desc(), Promocode.id.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_promocode(db: Session, promocode_in: PromocodeCreate) -> Promocode:
    db_promocode = Promocode(**promocode_in.model_dump())
    db.add(db_promocode)
    db.commit()
    db.refresh(db_promocode)
    return db_promocode


def update_promocode(
    db: Session,
    db_promocode: Promocode,
    promocode_in: PromocodeUpdate,
) -> Promocode:
    update_data = promocode_in.model_dump(exclude_unset=True)

    # Switching discount type should clear the other discount field.
    if update_data.get("discount_percentage") is not None:
        update_data["discount_fixed"] = None
    elif update_data.get("discount_fixed") is not None:
        update_data["discount_percentage"] = None

    for field, value in update_data.items():
        setattr(db_promocode, field, value)

    db.add(db_promocode)
    db.commit()
    db.refresh(db_promocode)
    return db_promocode


def delete_promocode(db: Session, db_promocode: Promocode) -> None:
    db.delete(db_promocode)
    db.commit()

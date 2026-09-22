from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.crud import product as product_crud
from app.schemas.product import ProductCreate, ProductUpdate


def create_product_service(db: Session, product_in: ProductCreate):
    try:
        return product_crud.create_product(db, product_in)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database integrity error occurred.",
        )


def get_all_products(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    category_id: int | None = None,
):
    return product_crud.get_all_products(
        db, skip=skip, limit=limit, category_id=category_id
    )


def get_product_by_id_service(db: Session, product_id: int):
    db_product = product_crud.get_product_by_id(db, product_id)
    if not db_product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Product not found"
        )
    return db_product


def update_product_service(db: Session, product_id: int, product_in: ProductUpdate):
    db_product = get_product_by_id_service(db, product_id)
    try:
        return product_crud.update_product(db, db_product, product_in)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database integrity error occurred.",
        )


def delete_product_service(db: Session, product_id: int) -> None:
    db_product = get_product_by_id_service(db, product_id)
    try:
        product_crud.delete_product(db, db_product)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Cannot delete product because it's still referenced elsewhere.",
        )
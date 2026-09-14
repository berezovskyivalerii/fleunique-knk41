from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.crud import category as category_crud
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate


def create_category_service(db: Session, category_in: CategoryCreate) -> Category:
    existing_category = category_crud.get_category_by_name(db, name=category_in.name)
    if existing_category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category with this name already exists.",
        )

    try:
        return category_crud.create_category(db, category_in)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database integrity error occurred.",
        )


def get_all_categories(db: Session, skip: int = 0, limit: int = 100):
    return category_crud.get_all_categories(db, skip=skip, limit=limit)


def update_category(db: Session, category_id: int, category_in: CategoryUpdate):
    db_category = category_crud.get_category_by_id(db, category_id=category_id)
    if not db_category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Category not found."
        )

    if category_in.name:
        existing_category = category_crud.get_category_by_name(
            db, name=category_in.name
        )
        if existing_category and existing_category.id != category_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Category with this name already exists.",
            )

    try:
        return category_crud.update_category(
            db, db_category=db_category, category_in=category_in
        )
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database integrity error occurred.",
        )


def get_category(db: Session, category_id: int):
    db_category = category_crud.get_category_by_id(db, category_id=category_id)
    if not db_category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Category not found."
        )
    return db_category


def delete_category(db: Session, category_id: int):
    db_category = category_crud.get_category_by_id(db, category_id=category_id)
    if not db_category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Category not found."
        )

    try:
        category_crud.delete_category(db, db_category=db_category)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Cannot delete category because it is still referenced by products.",
        )

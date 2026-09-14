from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import require_admin_role
from app.db.database import get_db
from app.schemas.category import CategoryCreate, CategoryResponse, CategoryUpdate
from app.services import category as category_service

router = APIRouter(prefix="/categories", tags=["categories"])


@router.post(
    "/",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_admin_role)],
)
def create_category_endpoint(category: CategoryCreate, db: Session = Depends(get_db)):
    return category_service.create_category_service(db=db, category_in=category)


@router.get("/", response_model=List[CategoryResponse], status_code=status.HTTP_200_OK)
def get_all_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return category_service.get_all_categories(db, skip=skip, limit=limit)


@router.patch(
    "/{category_id}",
    response_model=CategoryResponse,
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(require_admin_role)],
)
def update_category(
    category_id: int, category: CategoryUpdate, db: Session = Depends(get_db)
):
    return category_service.update_category(
        db, category_id=category_id, category_in=category
    )


@router.get(
    "/{category_id}", response_model=CategoryResponse, status_code=status.HTTP_200_OK
)
def get_category(category_id: int, db: Session = Depends(get_db)):
    return category_service.get_category(db, category_id=category_id)


@router.delete(
    "/{category_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_admin_role)],
)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    category_service.delete_category(db, category_id=category_id)

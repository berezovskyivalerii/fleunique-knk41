from typing import List, Optional

from fastapi import APIRouter, Depends, File, Form, UploadFile, status
from sqlalchemy.orm import Session

from app.api.deps import get_db, require_admin_role
from app.schemas.product import ProductImageResponse, ProductResponse, ProductCreate, ProductUpdate
from app.services import product as product_service

router = APIRouter(prefix="/products", tags=["products"])


@router.get("/", response_model=List[ProductResponse], status_code=status.HTTP_200_OK)
def get_all_products(skip: int = 0, limit: int = 100, category_id: Optional[int] = None, db: Session = Depends(get_db)):
    return product_service.get_all_products(db, skip=skip, limit=limit, category_id=category_id)


@router.get("/{product_id}", response_model=ProductResponse, status_code=status.HTTP_200_OK)
def get_product(product_id: int, db: Session = Depends(get_db)):
    return product_service.get_product_by_id_service(db, product_id)


@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_admin_role)])
def create_product_endpoint(product: ProductCreate, db: Session = Depends(get_db)):
    return product_service.create_product_service(db, product_in=product)


@router.patch("/{product_id}", response_model=ProductResponse, status_code=status.HTTP_200_OK, dependencies=[Depends(require_admin_role)])
def update_product_endpoint(product_id: int, product: ProductUpdate, db: Session = Depends(get_db)):
    return product_service.update_product_service(db, product_id, product_in=product)


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_admin_role)])
def delete_product_endpoint(product_id: int, db: Session = Depends(get_db)):
    product_service.delete_product_service(db, product_id)


# --- Product images ---------------------------------------------------------


@router.post(
    "/{product_id}/images",
    response_model=ProductImageResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_admin_role)],
)
def upload_product_image(
    product_id: int,
    file: UploadFile = File(...),
    is_main: bool = Form(False),
    db: Session = Depends(get_db),
):
    return product_service.upload_product_image_service(db, product_id, file=file, is_main=is_main)


@router.delete(
    "/{product_id}/images/{image_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_admin_role)],
)
def delete_product_image(product_id: int, image_id: int, db: Session = Depends(get_db)):
    product_service.delete_product_image_service(db, product_id, image_id)


@router.patch(
    "/{product_id}/images/{image_id}/set-main",
    response_model=ProductImageResponse,
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(require_admin_role)],
)
def set_main_product_image(product_id: int, image_id: int, db: Session = Depends(get_db)):
    return product_service.set_main_product_image_service(db, product_id, image_id)
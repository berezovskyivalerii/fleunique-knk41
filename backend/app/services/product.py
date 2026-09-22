import uuid
from pathlib import Path

from fastapi import HTTPException, UploadFile, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.crud import product as product_crud
from app.schemas.product import ProductCreate, ProductImageCreate, ProductUpdate

PRODUCT_IMAGES_DIR = Path("static/uploads/products")
ALLOWED_IMAGE_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}
MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB


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
    db: Session, skip: int = 0, limit: int = 100, category_id: int | None = None
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


# --- Product images ---------------------------------------------------------


def _resolve_extension(filename: str | None, content_type: str | None) -> str:
    if filename and "." in filename:
        return filename.rsplit(".", 1)[-1].lower()
    by_content_type = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
        "image/gif": "gif",
    }
    return by_content_type.get(content_type or "", "bin")


def upload_product_image_service(
    db: Session, product_id: int, file: UploadFile, is_main: bool = False
):
    get_product_by_id_service(db, product_id)

    if file.content_type not in ALLOWED_IMAGE_CONTENT_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported image type. Allowed: JPEG, PNG, WEBP, GIF.",
        )

    contents = file.file.read()
    if len(contents) > MAX_IMAGE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image is too large. Maximum size is 5 MB.",
        )
    if len(contents) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty.",
        )

    existing_images = product_crud.get_images_for_product(db, product_id)
    if not existing_images:
        is_main = True

    extension = _resolve_extension(file.filename, file.content_type)
    unique_filename = f"{uuid.uuid4().hex}.{extension}"

    PRODUCT_IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    destination = PRODUCT_IMAGES_DIR / unique_filename
    with open(destination, "wb") as out_file:
        out_file.write(contents)

    relative_url = f"/static/uploads/products/{unique_filename}"

    if is_main:
        product_crud.unset_main_image(db, product_id)

    image_in = ProductImageCreate(image_url=relative_url, is_main=is_main)
    try:
        return product_crud.create_product_image(db, product_id, image_in)
    except IntegrityError:
        db.rollback()
        destination.unlink(missing_ok=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database integrity error occurred.",
        )


def _get_product_image_or_404(db: Session, product_id: int, image_id: int):
    db_image = product_crud.get_product_image_by_id(db, image_id)
    if not db_image or db_image.product_id != product_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Product image not found"
        )
    return db_image


def delete_product_image_service(db: Session, product_id: int, image_id: int) -> None:
    db_image = _get_product_image_or_404(db, product_id, image_id)

    file_path_str = db_image.image_url.lstrip("/")
    physical_file_path = Path(file_path_str)

    physical_file_path.unlink(missing_ok=True)

    product_crud.delete_product_image(db, db_image)


def set_main_product_image_service(db: Session, product_id: int, image_id: int):
    db_image = _get_product_image_or_404(db, product_id, image_id)
    product_crud.unset_main_image(db, product_id)
    db.refresh(db_image)
    return product_crud.set_main_image(db, db_image)

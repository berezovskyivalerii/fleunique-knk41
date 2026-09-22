from sqlalchemy.orm import Session

from app.models.product import Product, ProductImage
from app.schemas.product import ProductCreate, ProductImageCreate, ProductUpdate


def get_product_by_id(db: Session, product_id: int) -> Product | None:
    return db.query(Product).filter(Product.id == product_id).first()


def get_all_products(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    category_id: int | None = None,
    active_only: bool = True,
) -> list[Product]:
    query = db.query(Product)
    if active_only:
        query = query.filter(Product.is_active == True)  # noqa: E712
    if category_id is not None:
        query = query.filter(Product.category_id == category_id)
    return query.offset(skip).limit(limit).all()


def create_product(db: Session, product: ProductCreate) -> Product:
    db_product = Product(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def update_product(db: Session, db_product: Product, product_in: ProductUpdate) -> Product:
    update_data = product_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_product, field, value)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def delete_product(db: Session, db_product: Product) -> None:
    db.delete(db_product)
    db.commit()


# --- Product images ---------------------------------------------------------


def get_product_image_by_id(db: Session, image_id: int) -> ProductImage | None:
    return db.query(ProductImage).filter(ProductImage.id == image_id).first()


def get_images_for_product(db: Session, product_id: int) -> list[ProductImage]:
    return db.query(ProductImage).filter(ProductImage.product_id == product_id).all()


def unset_main_image(db: Session, product_id: int) -> None:
    db.query(ProductImage).filter(
        ProductImage.product_id == product_id,
        ProductImage.is_main == True,  # noqa: E712
    ).update({"is_main": False})
    db.commit()


def create_product_image(
    db: Session, product_id: int, image_in: ProductImageCreate
) -> ProductImage:
    db_image = ProductImage(
        product_id=product_id,
        image_url=image_in.image_url,
        is_main=image_in.is_main,
    )
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return db_image


def delete_product_image(db: Session, db_image: ProductImage) -> None:
    db.delete(db_image)
    db.commit()


def set_main_image(db: Session, db_image: ProductImage) -> ProductImage:
    db_image.is_main = True
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return db_image
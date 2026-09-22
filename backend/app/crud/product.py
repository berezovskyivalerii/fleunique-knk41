from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


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


def update_product(
    db: Session, db_product: Product, product_in: ProductUpdate
) -> Product:
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
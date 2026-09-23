from decimal import Decimal

from sqlalchemy import func
from sqlalchemy.orm import Session, selectinload

from app.models.order import DeliveryType, Order, OrderItem, OrderStatus
from app.models.product import Product
from app.models.promocode import Promocode


def get_products_by_ids(db: Session, product_ids: list[int]) -> list[Product]:
    return db.query(Product).filter(Product.id.in_(product_ids)).all()


def get_promocode_by_code(db: Session, code: str) -> Promocode | None:
    return (
        db.query(Promocode)
        .filter(func.lower(Promocode.code) == code.strip().lower())
        .first()
    )


def create_order(
    db: Session,
    *,
    user_id: int,
    items: list[tuple[Product, int]],
    receiver_name: str,
    receiver_phone: str,
    delivery_type: DeliveryType,
    delivery_address: str | None,
    delivery_floor: str | None,
    delivery_apartment: str | None,
    promocode: Promocode | None,
    promocode_str: str | None,
    comment: str | None,
    subtotal: Decimal,
    delivery_cost: Decimal,
    discount_amount: Decimal,
    total_price: Decimal,
) -> Order:
    db_order = Order(
        user_id=user_id,
        status=OrderStatus.PENDING,
        receiver_name=receiver_name,
        receiver_phone=receiver_phone,
        delivery_type=delivery_type,
        delivery_address=delivery_address,
        delivery_floor=delivery_floor,
        delivery_apartment=delivery_apartment,
        promocode_id=promocode.id if promocode else None,
        promocode_str=promocode_str,
        comment=comment,
        subtotal=subtotal,
        delivery_cost=delivery_cost,
        discount_amount=discount_amount,
        total_price=total_price,
    )
    db.add(db_order)
    db.flush()

    for product, quantity in items:
        db.add(
            OrderItem(
                order_id=db_order.id,
                product_id=product.id,
                quantity=quantity,
                price_per_item=product.price,
            )
        )

    db.commit()
    return get_order_by_id(db, db_order.id)  # type: ignore[return-value]


def get_order_by_id(db: Session, order_id: int) -> Order | None:
    return (
        db.query(Order)
        .options(selectinload(Order.items))
        .filter(Order.id == order_id)
        .first()
    )


def get_user_orders(
    db: Session, user_id: int, skip: int = 0, limit: int = 100
) -> list[Order]:
    return (
        db.query(Order)
        .options(selectinload(Order.items))
        .filter(Order.user_id == user_id)
        .order_by(Order.created_at.desc(), Order.id.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_all_orders(db: Session, skip: int = 0, limit: int = 100) -> list[Order]:
    return (
        db.query(Order)
        .options(selectinload(Order.items))
        .order_by(Order.created_at.desc(), Order.id.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def update_order_status(db: Session, order: Order, new_status: OrderStatus) -> Order:
    order.status = new_status
    db.add(order)
    db.commit()
    return get_order_by_id(db, order.id)  # type: ignore[return-value]

from datetime import datetime, timezone
from decimal import ROUND_HALF_UP, Decimal

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, joinedload

from app.crud import order as order_crud
from app.models.order import DeliveryType, Order, OrderItem, OrderStatus
from app.models.product import Product
from app.models.promocode import Promocode
from app.models.user import User
from app.schemas.order import OrderCreate

DELIVERY_COST = Decimal("4.00")
MONEY_STEP = Decimal("0.01")


def _money(value: Decimal) -> Decimal:
    return value.quantize(MONEY_STEP, rounding=ROUND_HALF_UP)


def _get_valid_promocode(db: Session, code: str | None) -> Promocode | None:
    if not code:
        return None

    promocode = order_crud.get_promocode_by_code(db, code)
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

    if promocode.expires_at:
        expires_at = promocode.expires_at
        if expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)
        if expires_at <= datetime.now(timezone.utc):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Promocode has expired.",
            )

    return promocode


def _calculate_discount(promocode: Promocode | None, subtotal: Decimal) -> Decimal:
    if not promocode:
        return Decimal("0.00")

    if promocode.discount_percentage is not None:
        discount = subtotal * Decimal(promocode.discount_percentage) / Decimal("100")
    elif promocode.discount_fixed is not None:
        discount = Decimal(promocode.discount_fixed)
    else:
        discount = Decimal("0.00")

    # A promocode cannot make the product subtotal negative.
    return _money(min(discount, subtotal))


def create_order_service(
    db: Session, current_user: User, order_in: OrderCreate
) -> Order:
    quantities_by_product: dict[int, int] = {}
    for item in order_in.items:
        new_quantity = quantities_by_product.get(item.product_id, 0) + item.quantity
        if new_quantity > 100:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Quantity for product {item.product_id} cannot exceed 100.",
            )
        quantities_by_product[item.product_id] = new_quantity

    product_ids = list(quantities_by_product.keys())
    products = order_crud.get_products_by_ids(db, product_ids)
    products_by_id = {product.id: product for product in products}

    missing_product_ids = [
        product_id for product_id in product_ids if product_id not in products_by_id
    ]
    if missing_product_ids:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Products not found: {missing_product_ids}",
        )

    inactive_product_ids = [
        product_id
        for product_id in product_ids
        if not products_by_id[product_id].is_active
    ]
    if inactive_product_ids:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Inactive products cannot be ordered: {inactive_product_ids}",
        )

    prepared_items = []
    subtotal = Decimal("0.00")

    for product_id, quantity in quantities_by_product.items():
        product = products_by_id[product_id]
        prepared_items.append((product, quantity))
        subtotal += Decimal(product.price) * quantity

    subtotal = _money(subtotal)
    delivery_cost = (
        DELIVERY_COST
        if order_in.delivery_type == DeliveryType.DELIVERY
        else Decimal("0.00")
    )

    promocode = _get_valid_promocode(db, order_in.promocode)
    discount_amount = _calculate_discount(promocode, subtotal)
    total_price = _money(subtotal + delivery_cost - discount_amount)

    if order_in.delivery_type == DeliveryType.PICKUP:
        delivery_address = None
        delivery_floor = None
        delivery_apartment = None
    else:
        delivery_address = order_in.delivery_address
        delivery_floor = order_in.delivery_floor
        delivery_apartment = order_in.delivery_apartment

    try:
        return order_crud.create_order(
            db=db,
            user_id=current_user.id,
            items=prepared_items,
            receiver_name=order_in.receiver_name,
            receiver_phone=order_in.receiver_phone,
            delivery_type=order_in.delivery_type,
            delivery_address=delivery_address,
            delivery_floor=delivery_floor,
            delivery_apartment=delivery_apartment,
            promocode=promocode,
            promocode_str=promocode.code if promocode else None,
            comment=order_in.comment,
            subtotal=subtotal,
            delivery_cost=delivery_cost,
            discount_amount=discount_amount,
            total_price=total_price,
        )
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database integrity error occurred while creating the order.",
        )


def get_user_orders_service(
    db: Session, current_user: User, skip: int = 0, limit: int = 100
):
    query = (
        db.query(Order)
        .filter(Order.user_id == current_user.id)
        .options(
            joinedload(Order.items)
            .joinedload(OrderItem.product)
            .joinedload(Product.images)
        )
    )
    return query.order_by(Order.created_at.desc()).offset(skip).limit(limit).all()


def get_order_service(db: Session, current_user: User, order_id: int) -> Order:
    order = order_crud.get_order_by_id(db, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found.",
        )

    if order.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to view this order.",
        )

    return order


def get_all_orders_service(db: Session, skip: int = 0, limit: int = 100) -> list[Order]:
    return order_crud.get_all_orders(db, skip=skip, limit=limit)


def update_order_status_service(
    db: Session, order_id: int, new_status: OrderStatus
) -> Order:
    order = order_crud.get_order_by_id(db, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found.",
        )

    return order_crud.update_order_status(db, order=order, new_status=new_status)


def cancel_order_service(db: Session, current_user: User, order_id: int) -> Order:
    order = order_crud.get_order_by_id(db, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found.",
        )

    if order.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to cancel this order.",
        )

    if order.status not in (OrderStatus.PENDING, OrderStatus.PROCESSING):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Order with status '{order.status.value}' cannot be cancelled.",
        )

    return order_crud.update_order_status(
        db, order=order, new_status=OrderStatus.CANCELLED
    )

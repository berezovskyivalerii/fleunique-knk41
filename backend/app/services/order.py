from decimal import Decimal

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.crud import order as order_crud
from app.models.order import Order, OrderStatus
from app.models.user import User
from app.schemas.order import OrderCreate


def create_order_service(db: Session, current_user: User, order_in: OrderCreate) -> Order:
    quantities_by_product: dict[int, int] = {}
    for item in order_in.items:
        quantities_by_product[item.product_id] = (
            quantities_by_product.get(item.product_id, 0) + item.quantity
        )

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
    total_price = Decimal("0.00")

    for product_id, quantity in quantities_by_product.items():
        product = products_by_id[product_id]
        prepared_items.append((product, quantity))
        total_price += Decimal(product.price) * quantity

    try:
        return order_crud.create_order(
            db=db,
            user_id=current_user.id,
            items=prepared_items,
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
) -> list[Order]:
    return order_crud.get_user_orders(
        db, user_id=current_user.id, skip=skip, limit=limit
    )


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


def get_all_orders_service(
    db: Session, skip: int = 0, limit: int = 100
) -> list[Order]:
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

import enum
from datetime import datetime
from decimal import Decimal

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, Numeric, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class OrderStatus(str, enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class DeliveryType(str, enum.Enum):
    PICKUP = "pickup"
    DELIVERY = "delivery"


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    status: Mapped[OrderStatus] = mapped_column(
        Enum(OrderStatus), default=OrderStatus.PENDING
    )

    # Receiver Information
    receiver_name: Mapped[str | None] = mapped_column(String(255))
    receiver_phone: Mapped[str | None] = mapped_column(String(50))

    # Delivery Information
    delivery_type: Mapped[DeliveryType] = mapped_column(
        Enum(DeliveryType), default=DeliveryType.DELIVERY
    )
    delivery_address: Mapped[str | None] = mapped_column(String(255))
    delivery_floor: Mapped[str | None] = mapped_column(String(50))
    delivery_apartment: Mapped[str | None] = mapped_column(String(50))

    # Promocode data
    promocode_id: Mapped[int | None] = mapped_column(
        ForeignKey("promocodes.id", ondelete="SET NULL")
    )
    promocode_str: Mapped[str | None] = mapped_column(String(50))
    comment: Mapped[str | None] = mapped_column(Text)

    # Financial breakdown
    subtotal: Mapped[Decimal] = mapped_column(Numeric(10, 2), default=0.00)
    delivery_cost: Mapped[Decimal] = mapped_column(Numeric(10, 2), default=0.00)
    discount_amount: Mapped[Decimal] = mapped_column(Numeric(10, 2), default=0.00)
    total_price: Mapped[Decimal] = mapped_column(Numeric(10, 2), default=0.00)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), onupdate=func.now()
    )

    user: Mapped["User"] = relationship(back_populates="orders")
    items: Mapped[list["OrderItem"]] = relationship(
        back_populates="order", cascade="all, delete-orphan"
    )
    promocode_ref: Mapped["Promocode | None"] = relationship(back_populates="orders")


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id", ondelete="CASCADE"))
    product_id: Mapped[int | None] = mapped_column(
        ForeignKey("products.id", ondelete="SET NULL")
    )
    quantity: Mapped[int] = mapped_column(Integer, default=1)
    price_per_item: Mapped[Decimal] = mapped_column(Numeric(10, 2))

    order: Mapped["Order"] = relationship(back_populates="items")
    product: Mapped["Product"] = relationship(back_populates="order_items")

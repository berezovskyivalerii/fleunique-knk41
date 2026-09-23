from datetime import datetime
from decimal import Decimal
from typing import List, Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

from app.models.order import DeliveryType, OrderStatus
from app.schemas.product import ProductResponse


class OrderItemCreate(BaseModel):
    product_id: int = Field(..., gt=0)
    quantity: int = Field(..., gt=0, le=100)


class OrderCreate(BaseModel):
    items: List[OrderItemCreate] = Field(..., min_length=1)

    receiver_name: str = Field(..., min_length=1, max_length=255)
    receiver_phone: str = Field(..., min_length=1, max_length=50)

    delivery_type: DeliveryType
    delivery_address: str | None = Field(default=None, max_length=255)
    delivery_floor: str | None = Field(default=None, max_length=50)
    delivery_apartment: str | None = Field(default=None, max_length=50)

    promocode: str | None = Field(default=None, max_length=50)
    comment: str | None = Field(default=None, max_length=500)

    @field_validator(
        "receiver_name",
        "receiver_phone",
        "delivery_address",
        "delivery_floor",
        "delivery_apartment",
        "promocode",
        "comment",
        mode="before",
    )
    @classmethod
    def strip_strings(cls, value):
        if isinstance(value, str):
            value = value.strip()
            return value or None
        return value

    @model_validator(mode="after")
    def validate_delivery_data(self):
        if self.delivery_type == DeliveryType.DELIVERY and not self.delivery_address:
            raise ValueError("delivery_address is required for delivery orders")
        return self


class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    price_per_item: Decimal

    product: Optional[ProductResponse] = None

    model_config = ConfigDict(from_attributes=True)


class OrderResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    status: OrderStatus

    receiver_name: str | None
    receiver_phone: str | None

    delivery_type: DeliveryType
    delivery_address: str | None
    delivery_floor: str | None
    delivery_apartment: str | None

    promocode_id: int | None
    promocode_str: str | None
    comment: str | None

    subtotal: Decimal
    delivery_cost: Decimal
    discount_amount: Decimal
    total_price: Decimal

    created_at: datetime | None
    updated_at: datetime | None
    items: List[OrderItemResponse]


class OrderStatusUpdate(BaseModel):
    status: OrderStatus


OrderItemResponse.model_rebuild()
OrderResponse.model_rebuild()

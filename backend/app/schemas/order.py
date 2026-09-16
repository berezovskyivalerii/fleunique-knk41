from datetime import datetime
from decimal import Decimal
from typing import List

from pydantic import BaseModel, ConfigDict, Field

from app.models.order import OrderStatus


class OrderItemCreate(BaseModel):
    product_id: int = Field(..., gt=0)
    quantity: int = Field(..., gt=0, le=100)


class OrderCreate(BaseModel):
    items: List[OrderItemCreate] = Field(..., min_length=1)


class OrderItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    product_id: int | None
    quantity: int
    price_per_item: Decimal


class OrderResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    status: OrderStatus
    total_price: Decimal
    created_at: datetime | None
    updated_at: datetime | None
    items: List[OrderItemResponse]


class OrderStatusUpdate(BaseModel):
    status: OrderStatus

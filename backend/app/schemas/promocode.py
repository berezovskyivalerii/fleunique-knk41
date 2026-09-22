from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, Field, field_validator, model_validator


class PromocodeCreate(BaseModel):
    code: str = Field(..., min_length=1, max_length=50)
    discount_percentage: int | None = Field(default=None, ge=1, le=100)
    discount_fixed: Decimal | None = Field(default=None, gt=0, max_digits=10, decimal_places=2)
    is_active: bool = True
    expires_at: datetime | None = None

    @field_validator("code")
    @classmethod
    def normalize_code(cls, value: str) -> str:
        value = value.strip().upper()
        if not value:
            raise ValueError("Promocode code cannot be empty.")
        return value

    @model_validator(mode="after")
    def validate_discount(self):
        percentage_set = self.discount_percentage is not None
        fixed_set = self.discount_fixed is not None
        if percentage_set == fixed_set:
            raise ValueError(
                "Exactly one of discount_percentage or discount_fixed must be provided."
            )
        return self


class PromocodeUpdate(BaseModel):
    code: str | None = Field(default=None, min_length=1, max_length=50)
    discount_percentage: int | None = Field(default=None, ge=1, le=100)
    discount_fixed: Decimal | None = Field(default=None, gt=0, max_digits=10, decimal_places=2)
    is_active: bool | None = None
    expires_at: datetime | None = None

    @field_validator("code")
    @classmethod
    def normalize_code(cls, value: str | None) -> str | None:
        if value is None:
            return None
        value = value.strip().upper()
        if not value:
            raise ValueError("Promocode code cannot be empty.")
        return value

    @model_validator(mode="after")
    def validate_discount_fields(self):
        fields_set = self.model_fields_set
        percentage_set = "discount_percentage" in fields_set
        fixed_set = "discount_fixed" in fields_set

        if percentage_set and fixed_set:
            if self.discount_percentage is not None and self.discount_fixed is not None:
                raise ValueError(
                    "discount_percentage and discount_fixed cannot both be set."
                )
            if self.discount_percentage is None and self.discount_fixed is None:
                raise ValueError("A promocode must have a discount value.")

        return self


class PromocodeResponse(BaseModel):
    id: int
    code: str
    discount_percentage: int | None
    discount_fixed: Decimal | None
    is_active: bool
    expires_at: datetime | None
    created_at: datetime

    class Config:
        from_attributes = True


class PromocodeValidationResponse(BaseModel):
    valid: bool
    promocode: PromocodeResponse

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class PaymentMethodCreate(BaseModel):
    card_name: str
    last_four_digits: str = Field(min_length=4, max_length=4)
    expiry_date: str = Field(min_length=5, max_length=5)
    provider_token: str | None = None


class PaymentMethodResponse(BaseModel):
    id: int
    card_name: str
    last_four_digits: str
    expiry_date: str
    created_at: datetime

    # exclude provider_token from response for security reasons
    model_config = ConfigDict(from_attributes=True)

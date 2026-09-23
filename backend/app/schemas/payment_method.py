from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class PaymentMethodCreate(BaseModel):
    card_name: str
    last_four_digits: str = Field(pattern=r"^\d{4}$")
    expiry_date: str = Field(pattern=r"^(0[1-9]|1[0-2])\/\d{2}$")


class PaymentMethodResponse(BaseModel):
    id: int
    card_name: str
    last_four_digits: str
    expiry_date: str
    created_at: datetime

    # exclude provider_token from response for security reasons
    model_config = ConfigDict(from_attributes=True)

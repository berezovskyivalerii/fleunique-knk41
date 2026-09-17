from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr, model_validator

from app.models.user import AccountType


class UserBase(BaseModel):
    account_type: AccountType = AccountType.PERSONAL
    full_name: str
    email: EmailStr
    phone_number: Optional[str] = None


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    password_confirm: str
    account_type: AccountType = AccountType.PERSONAL
    phone_number: str | None = None

    @model_validator(mode="after")
    def check_passwords_match(self):
        if self.password != self.password_confirm:
            raise ValueError("Passwords do not match")
        return self


class UserResponse(BaseModel):
    id: int
    account_type: AccountType
    full_name: str
    email: EmailStr
    phone_number: str | None
    is_active: bool
    is_admin: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field, model_validator

from app.models.user import AccountType


class UserBase(BaseModel):
    account_type: AccountType = AccountType.PERSONAL
    full_name: str
    email: EmailStr
    phone_number: Optional[str] = None


class UserCreate(UserBase):
    password: str
    password_confirm: str

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


class UserUpdate(BaseModel):
    full_name: str | None = None
    phone_number: str | None = None
    account_type: AccountType | None = None


class PasswordUpdate(BaseModel):
    old_password: str
    new_password: str = Field(min_length=8, max_length=16)


class AddressBase(BaseModel):
    address_line: str
    floor: str | None = None
    apartment: str | None = None


class AddressCreate(AddressBase):
    pass


class AddressUpdate(BaseModel):
    address_line: str | None = None
    floor: str | None = None
    apartment: str | None = None


class AddressResponse(AddressBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserUpdateAdmin(BaseModel):
    full_name: str | None = None
    email: EmailStr | None = None
    phone_number: str | None = None
    account_type: AccountType | None = None
    is_active: bool | None = None
    is_admin: bool | None = None

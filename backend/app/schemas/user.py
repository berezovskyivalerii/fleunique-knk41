from typing import Optional

from pydantic import BaseModel, EmailStr, model_validator

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
    def check_passwords_match(self) -> "UserCreate":
        if self.password != self.password_confirm:
            raise ValueError("Password not matched")
        return self


class UserResponse(UserBase):
    id: int
    is_active: bool
    is_admin: bool

    class Config:
        from_attributes = True

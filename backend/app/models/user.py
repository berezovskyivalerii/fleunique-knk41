import enum
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Enum, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class AccountType(str, enum.Enum):
    PERSONAL = "personal"
    BUSINESS = "business"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    account_type: Mapped[AccountType] = mapped_column(
        Enum(AccountType), default=AccountType.PERSONAL
    )
    full_name: Mapped[str] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    phone_number: Mapped[str | None] = mapped_column(String(50))
    hashed_password: Mapped[str] = mapped_column(String(255))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_admin: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # Relationships
    refresh_tokens: Mapped[list["RefreshToken"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )
    orders: Mapped[list["Order"]] = relationship(back_populates="user")
    reviews: Mapped[list["Review"]] = relationship(back_populates="user")
    addresses: Mapped[list["Address"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )
    payment_methods: Mapped[list["PaymentMethod"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )

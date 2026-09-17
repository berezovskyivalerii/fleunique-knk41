from datetime import datetime
from decimal import Decimal

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    DateTime,
    Integer,
    Numeric,
    String,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class Promocode(Base):
    __tablename__ = "promocodes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    code: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    discount_percentage: Mapped[int | None] = mapped_column(Integer)
    discount_fixed: Mapped[Decimal | None] = mapped_column(Numeric(10, 2))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    expires_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    orders: Mapped[list["Order"]] = relationship(back_populates="promocode_ref")

    __table_args__ = (
        CheckConstraint(
            "(discount_percentage IS NOT NULL AND discount_fixed IS NULL) OR "
            "(discount_percentage IS NULL AND discount_fixed IS NOT NULL)",
            name="check_discount_mutually_exclusive",
        ),
        CheckConstraint(
            "discount_percentage > 0 AND discount_percentage <= 100",
            name="check_discount_percentage_range",
        ),
        CheckConstraint("discount_fixed > 0", name="check_discount_fixed_positive"),
    )

import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.database import (
    Base,
    engine,
)
from app.models.category import Category
from app.models.order import Order, OrderItem
from app.models.product import Product, ProductImage
from app.models.user import User


def reset():
    Base.metadata.drop_all(bind=engine)


if __name__ == "__main__":
    reset()

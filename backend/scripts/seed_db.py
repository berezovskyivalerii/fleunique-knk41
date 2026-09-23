import os
import sys
from datetime import datetime
from decimal import Decimal

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.category import Category
from app.models.order import Order, OrderItem
from app.models.product import Product, ProductImage
from app.models.user import User
from app.services.auth import get_password_hash


def seed():
    db: Session = SessionLocal()
    try:
        test_email = "valerii@example.com"
        user = db.query(User).filter(User.email == test_email).first()
        if not user:
            user = User(
                email=test_email,
                hashed_password=get_password_hash("password123"),
                full_name="Valerii Berezovskyi",
                phone_number="+380 98 117 03 46",
                is_active=True,
                is_admin=True,
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        category = (
            db.query(Category).filter(Category.name == "Signature Bouquets").first()
        )
        if not category:
            category = Category(
                name="Signature Bouquets", description="Unique floral arrangements"
            )
            db.add(category)
            db.commit()
            db.refresh(category)

        products_data = [
            {
                "name": "Athena, Aphrodite",
                "price": 64.00,
                "desc": "Hydrangea, Calla Lily, Chrysanthemum, Rose, Lisianthus, Snapdragon, Dahlia\nRanunculus, Hydrangea, Phalaenopsis Orchid, Lily, Rose,...",
            },
            {
                "name": "Zeus",
                "price": 36.00,
                "desc": "Lily, Phalaenopsis Orchid, Hydrangea, Lisianthus, Anthurium, Calla Lily, Lavender, Carnation, Eucalyptus",
            },
            {
                "name": "Artemis",
                "price": 24.00,
                "desc": "Dahlia, Chrysanthemum, Globe Amaranth, Spray Rose, Chocolate Cosmos, Tweedia, Chamomile, Lily",
            },
            {
                "name": "Hestia, Hermes",
                "price": 56.00,
                "desc": "Peony, Carnation, Ranunculus, Lisianthus, Spray Rose, Snapdragon\nRanunculus, Hydrangea, Tulip, Rose, Gerbera Daisy, Delp...",
            },
        ]

        db_products = []
        for p_data in products_data:
            prod = db.query(Product).filter(Product.name == p_data["name"]).first()
            if not prod:
                prod = Product(
                    name=p_data["name"],
                    price=Decimal(str(p_data["price"])),
                    description=p_data["desc"],
                    category_id=category.id,
                    is_active=True,
                )
                db.add(prod)
                db.commit()
                db.refresh(prod)

                prod_image = ProductImage(
                    product_id=prod.id,
                    image_url=f"/static/uploads/products/{p_data['name'].lower().replace(' ', '_').replace(',', '')}.png",
                    is_main=True,
                )
                db.add(prod_image)

            db_products.append(prod)

        db.commit()
        for prod in db_products:
            db.refresh(prod)

        orders_data = [
            {
                "prod_idx": 0,
                "status": "pending",
                "date": "2026-09-08 12:00:00",
                "price": 64.00,
            },
            {
                "prod_idx": 1,
                "status": "processing",
                "date": "2026-09-07 12:00:00",
                "price": 36.00,
            },
            {
                "prod_idx": 2,
                "status": "cancelled",
                "date": "2026-09-05 12:00:00",
                "price": 24.00,
            },
            {
                "prod_idx": 3,
                "status": "completed",
                "date": "2026-09-01 12:00:00",
                "price": 56.00,
            },
        ]

        db_products = []
        for p_data in products_data:
            prod = db.query(Product).filter(Product.name == p_data["name"]).first()
            if not prod:
                prod = Product(
                    name=p_data["name"],
                    price=Decimal(str(p_data["price"])),
                    description=p_data["desc"],
                    category_id=category.id,
                    is_active=True,
                )
                db.add(prod)
                db.commit()
                db.refresh(prod)

            image_url = f"/static/uploads/products/{p_data['name'].lower().replace(' ', '_').replace(',', '')}.png"

            existing_image = (
                db.query(ProductImage)
                .filter(ProductImage.product_id == prod.id)
                .first()
            )

            if not existing_image:
                prod_image = ProductImage(
                    product_id=prod.id,
                    image_url=image_url,
                    is_main=True,
                )
                db.add(prod_image)
                db.commit()

            db_products.append(prod)

        db.commit()
        for prod in db_products:
            db.refresh(prod)

        print("Database successfully seeded!")

    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed()

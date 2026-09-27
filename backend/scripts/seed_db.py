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
        # 1. Создание пользователя
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

        # 2. Создание категории
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

        # 3. Данные продуктов
        products_data = [
            {
                "name": "Zeus",
                "price": 32.00,
                "desc": "Lily, Phalaenopsis Orchid, Hydrangea, Lisianthus, Anthurium, Calla Lily, Lavender, Carnation, Eucalyptus",
            },
            {
                "name": "Apollo",
                "price": 38.00,
                "desc": "Peony, Carnation, Ranunculus, Lisianthus, Spray Rose, Snapdragon\nRanunculus, Hydrangea, Tulip, Rose, Gerbera Daisy, Delp...",
            },
            {
                "name": "Aphrodite",
                "price": 32.00,
                "desc": "Ranunculus, Hydrangea, Phalaenopsis Orchid, Lily, Rose, Lisianthus, Stock, Alstroemeria, Chamomile, Eucalyptus",
            },
            {
                "name": "Poseidon",
                "price": 38.00,
                "desc": "Bird Of Paradise, Anthurium, Chrysanthemum, Delphinium, Dahlia, Eucalyptus",
            },
            {
                "name": "Dionysus",
                "price": 32.00,
                "desc": "Phalaenopsis Orchid, Lily, Anthurium, Carnation, Snapdragon, Gypsophila, Waxflower",
            },
            {
                "name": "Hera",
                "price": 24.00,
                "desc": "Calla Lily, Clematis, Tulip, Asparagus Fern",
            },
            {
                "name": "Athena",
                "price": 28.00,
                "desc": "Hydrangea, Calla Lily, Chrysanthemum, Rose, Lisianthus, Snapdragon, Dahlia",
            },
            {
                "name": "Hestia",
                "price": 28.00,
                "desc": "Peony, Carnation, Ranunculus, Lisianthus, Spray Rose, Snapdragon",
            },
            {
                "name": "Hermes",
                "price": 24.00,
                "desc": "Ranunculus, Hydrangea, Tulip, Rose, Gerbera Daisy, Delphinium, Snapdragon, Lisianthus, Chamomile, Carnation",
            },
            {
                "name": "Artemis",
                "price": 20.00,
                "desc": "Dahlia, Chrysanthemum, Globe Amaranth, Spray Rose, Chocolate Cosmos, Tweedia, Chamomile, Lily",
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

        # 4. Данные заказов
        orders_data = [
            {
                "prod_idx": 0,
                "status": "pending",
                "date": "2026-09-08 12:00:00",
                "price": 64.00,
                "qty": 2,
            },
            {
                "prod_idx": 1,
                "status": "processing",
                "date": "2026-09-07 12:00:00",
                "price": 38.00,
                "qty": 1,
            },
            {
                "prod_idx": 2,
                "status": "cancelled",
                "date": "2026-09-05 12:00:00",
                "price": 32.00,
                "qty": 1,
            },
            {
                "prod_idx": 3,
                "status": "completed",
                "date": "2026-09-01 12:00:00",
                "price": 76.00,
                "qty": 2,
            },
        ]

        # Логика создания заказов и привязки товаров (OrderItem)
        for o_data in orders_data:
            order_date = datetime.strptime(o_data["date"], "%Y-%m-%d %H:%M:%S")

            # Проверяем, есть ли уже заказ на эту дату (чтобы не дублировать при повторном запуске)
            existing_order = (
                db.query(Order).filter(Order.created_at == order_date).first()
            )
            if not existing_order:
                # Создаем главную запись заказа
                new_order = Order(
                    user_id=user.id,
                    status=o_data["status"],
                    subtotal=Decimal(str(o_data["price"])),
                    total_price=Decimal(str(o_data["price"])),
                    delivery_type="delivery",
                    delivery_address="Oberhausen, Germany",
                    created_at=order_date,
                )
                db.add(new_order)
                db.commit()
                db.refresh(new_order)

                # Создаем связь заказа с конкретным товаром
                product = db_products[o_data["prod_idx"]]
                order_item = OrderItem(
                    order_id=new_order.id,
                    product_id=product.id,
                    quantity=o_data.get("qty", 1),
                    price_per_item=product.price,
                )
                db.add(order_item)
                db.commit()

        print("Database successfully seeded!")

    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed()

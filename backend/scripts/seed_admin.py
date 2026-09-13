from app.db.database import SessionLocal
from app.services.admin_seed import seed_admin

if __name__ == "__main__":
    db = SessionLocal()
    try:
        seed_admin(db)
    finally:
        db.close()
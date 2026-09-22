from fastapi import APIRouter

from app.api import auth, category, health, order, product

api_router = APIRouter()

api_router.include_router(health.router, tags=["health"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(category.router, tags=["categories"])
api_router.include_router(order.router, tags=["orders"])
api_router.include_router(product.router, tags=["products"])

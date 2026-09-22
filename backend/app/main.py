from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.api.router import api_router

app = FastAPI(title="Fleunique API")

STATIC_DIR = Path("static")
PRODUCT_IMAGES_DIR = STATIC_DIR / "uploads" / "products"
PRODUCT_IMAGES_DIR.mkdir(parents=True, exist_ok=True)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

app.include_router(api_router, prefix="/api/v1")
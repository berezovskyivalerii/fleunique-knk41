PYTHON = python3
PIP = pip
ALEMBIC = alembic
UVICORN = uvicorn
PYTEST = pytest

.PHONY: help install run migrate clean

help:
	@echo "Available commands:"
	@echo "  make install         - Install dependencies"
	@echo "  make run             - Start the FastAPI development server"
	@echo "  make migrate         - Apply all pending database migrations"
	@echo "  make clean           - Remove cache files"

install:
	$(PIP) install -r requirements.txt

run:
	$(UVICORN) app.main:app --reload

migrate:
	$(ALEMBIC) upgrade head

clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type d -name ".pytest_cache" -exec rm -rf {} +

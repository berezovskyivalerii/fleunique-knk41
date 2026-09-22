import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.db.database import get_db
from app.main import app
from app.models.base import Base
from app.models.user import User
from app.services.auth import get_password_hash

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="module")
def db():
    Base.metadata.create_all(bind=engine)
    db_session = TestingSessionLocal()
    try:
        yield db_session
    finally:
        db_session.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="module")
def client(db):
    def override_get_db():
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as c:
        yield c


@pytest.fixture(scope="module")
def test_user_password():
    return "secure_test_password123"


@pytest.fixture(scope="module")
def test_user(db, test_user_password):
    user = User(
        full_name="John Doe",
        email="user@example.com",
        hashed_password=get_password_hash(test_user_password),
        account_type="personal",
        is_active=True,
        is_admin=False,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@pytest.fixture(scope="module")
def test_admin(db, test_user_password):
    admin = User(
        full_name="Admin Boss",
        email="admin@example.com",
        hashed_password=get_password_hash(test_user_password),
        account_type="business",
        is_active=True,
        is_admin=True,
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin


@pytest.fixture(scope="module")
def normal_user_token_headers(
    client: TestClient, test_user: User, test_user_password: str
):
    login_data = {
        "username": test_user.email,
        "password": test_user_password,
    }
    response = client.post("/api/v1/auth/login", data=login_data)
    tokens = response.json()
    a_token = tokens["access_token"]
    return {"Authorization": f"Bearer {a_token}"}


@pytest.fixture(scope="module")
def admin_token_headers(client: TestClient, test_admin: User, test_user_password: str):
    login_data = {
        "username": test_admin.email,
        "password": test_user_password,
    }
    response = client.post("/api/v1/auth/login", data=login_data)
    tokens = response.json()
    a_token = tokens["access_token"]
    return {"Authorization": f"Bearer {a_token}"}

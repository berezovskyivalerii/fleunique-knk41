import secrets
from datetime import datetime, timedelta, timezone

import bcrypt
from fastapi import HTTPException, status
from jose import jwt
from sqlalchemy.orm import Session

from app.core.config import settings
from app.crud import token as crud_token
from app.crud import user as crud_user
from app.schemas.user import UserCreate


def register_user(db: Session, user_in: UserCreate):
    existing_user = crud_user.get_user_by_email(db, email=user_in.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered"
        )

    hashed_password = get_password_hash(user_in.password)

    return crud_user.create_user(db, user=user_in, hashed_password=hashed_password)


def authenticate_user(db: Session, email: str, password: str):
    user = crud_user.get_user_by_email(db, email=email)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user


def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def process_login(db: Session, user_id: int):
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user_id)}, expires_delta=access_token_expires
    )

    refresh_token = secrets.token_urlsafe(32)

    refresh_expires_delta = timedelta(days=7)
    expires_at = datetime.now(timezone.utc).replace(tzinfo=None) + refresh_expires_delta

    crud_token.create_refresh_token(
        db=db, user_id=user_id, token=refresh_token, expires_at=expires_at
    )

    return access_token, refresh_token


def refresh_access_token(db: Session, refresh_token: str):
    db_token = crud_token.get_refresh_token(db, token=refresh_token)
    if not db_token or db_token.expires_at < datetime.now(timezone.utc).replace(
        tzinfo=None
    ):  # type: ignore
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    new_access_token = create_access_token(
        data={"sub": str(db_token.user_id)},
        expires_delta=access_token_expires,
    )

    return new_access_token


def logout_user(db: Session, refresh_token: str):
    crud_token.delete_refresh_token(db, token=refresh_token)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    password_bytes = plain_password.encode("utf-8")
    hash_bytes = hashed_password.encode("utf-8")
    return bcrypt.checkpw(password_bytes, hash_bytes)


def get_password_hash(password: str) -> str:
    password_bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password_bytes, salt)
    return hashed_password.decode("utf-8")

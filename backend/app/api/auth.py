from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.token import Token, TokenRefreshRequest, TokenResponse
from app.schemas.user import UserCreate, UserResponse
from app.services import auth as auth_service

router = APIRouter()


@router.post(
    "/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED
)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    return auth_service.register_user(db, user_in=user_in)


@router.post("/login", response_model=Token)
def login(
    db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
):
    user = auth_service.authenticate_user(
        db, email=form_data.username, password=form_data.password
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:  # type: ignore
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user"
        )

    access_token, refresh_token = auth_service.process_login(db=db, user_id=user.id)  # type: ignore

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }


@router.post("/refresh", response_model=TokenResponse)
def refresh_token(request: TokenRefreshRequest, db: Session = Depends(get_db)):
    new_access_token = auth_service.refresh_access_token(
        db, refresh_token=request.refresh_token
    )
    return {"access_token": new_access_token, "token_type": "bearer"}


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(request: TokenRefreshRequest, db: Session = Depends(get_db)):
    auth_service.logout_user(db, refresh_token=request.refresh_token)

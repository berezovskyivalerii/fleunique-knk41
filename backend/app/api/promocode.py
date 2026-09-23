from typing import List

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.api.deps import require_admin_role
from app.db.database import get_db
from app.schemas.promocode import (
    PromocodeCreate,
    PromocodeResponse,
    PromocodeUpdate,
    PromocodeValidationResponse,
)
from app.services import promocode as promocode_service

router = APIRouter(prefix="/promocodes", tags=["promocodes"])


@router.get(
    "/validate/{code}",
    response_model=PromocodeValidationResponse,
    status_code=status.HTTP_200_OK,
)
def validate_promocode_endpoint(
    code: str,
    db: Session = Depends(get_db),
):
    promocode = promocode_service.validate_promocode_service(db, code)
    return {"valid": True, "promocode": promocode}


@router.get(
    "/",
    response_model=List[PromocodeResponse],
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(require_admin_role)],
)
def get_all_promocodes_endpoint(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return promocode_service.get_all_promocodes_service(db, skip=skip, limit=limit)


@router.get(
    "/{promocode_id}",
    response_model=PromocodeResponse,
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(require_admin_role)],
)
def get_promocode_endpoint(
    promocode_id: int,
    db: Session = Depends(get_db),
):
    return promocode_service.get_promocode_service(db, promocode_id)


@router.post(
    "/",
    response_model=PromocodeResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_admin_role)],
)
def create_promocode_endpoint(
    promocode: PromocodeCreate,
    db: Session = Depends(get_db),
):
    return promocode_service.create_promocode_service(db, promocode)


@router.patch(
    "/{promocode_id}",
    response_model=PromocodeResponse,
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(require_admin_role)],
)
def update_promocode_endpoint(
    promocode_id: int,
    promocode: PromocodeUpdate,
    db: Session = Depends(get_db),
):
    return promocode_service.update_promocode_service(db, promocode_id, promocode)


@router.delete(
    "/{promocode_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_admin_role)],
)
def delete_promocode_endpoint(
    promocode_id: int,
    db: Session = Depends(get_db),
):
    promocode_service.delete_promocode_service(db, promocode_id)

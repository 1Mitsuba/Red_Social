from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from app.dependencies import get_current_active_user
from app.models.user import User
from app.schemas.user import UserUpdate, UserResponse
from app.services.user import get_user_profile, update_user_profile

router = APIRouter()

@router.get("/profile", response_model=UserResponse)
async def read_user_profile(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Obtener el perfil del usuario actual.
    """
    profile = await get_user_profile(current_user.id)
    if not profile:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")
    return profile

@router.put("/profile", response_model=UserResponse)
async def update_profile(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Actualizar el perfil del usuario actual.
    """
    updated_profile = await update_user_profile(current_user.id, user_update)
    if not updated_profile:
        raise HTTPException(status_code=400, detail="No se pudo actualizar el perfil")
    return updated_profile

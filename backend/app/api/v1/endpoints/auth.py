from typing import Any, Dict
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.core.security import create_access_token
from app.services.auth import authenticate_user, register_new_user
from app.schemas.user import UserCreate, UserResponse
from app.schemas.token import Token

router = APIRouter()

@router.post("/login", response_model=Token)
async def login_access_token(form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    """
    Obtener token de acceso JWT para autenticación.
    """
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {
        "access_token": create_access_token(user.id),
        "token_type": "bearer"
    }

@router.post("/register", response_model=UserResponse)
async def register_user(user_in: UserCreate) -> Any:
    """
    Registrar un nuevo usuario.
    """
    user = await register_new_user(user_in)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No se pudo registrar el usuario. El correo podría ya estar en uso."
        )
    return user

@router.post("/reset-password", response_model=Dict[str, Any])
async def reset_password(email: str) -> Any:
    """
    Enviar correo para restablecer contraseña.
    """
    from app.services.supabase import get_supabase_client
    supabase = get_supabase_client()
    
    try:
        response = supabase.auth.reset_password_for_email(email)
        if response.error:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=response.error.message
            )
        return {"message": "Se ha enviado un correo para restablecer la contraseña"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al enviar el correo: {str(e)}"
        )

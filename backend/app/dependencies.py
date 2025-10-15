from fastapi import Depends, FastAPI, HTTPException
from typing import Generator, Optional
from app.services.supabase import get_supabase_client
from app.core.security import get_current_user
from app.models.user import User

async def get_db() -> Generator:
    """
    Obtener conexión a base de datos.
    En este caso, usaremos el cliente Supabase directamente.
    """
    supabase = get_supabase_client()
    try:
        yield supabase
    finally:
        # No hay que cerrar conexiones explícitamente con Supabase
        pass

# Dependencia para obtener el usuario actual (requerido)
def get_current_active_user(
    current_user: User = Depends(get_current_user),
) -> User:
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Usuario inactivo")
    return current_user

# Dependencia para obtener el usuario actual (opcional)
def get_optional_current_user(
    token: Optional[str] = Depends(oauth2_scheme),
) -> Optional[User]:
    if not token:
        return None
    try:
        return get_current_user(token=token)
    except HTTPException:
        return None

from fastapi import Depends
from typing import Optional, Dict, Any
from supabase import create_client, Client
from app.core.config import settings

_supabase_client: Optional[Client] = None

def get_supabase_client() -> Client:
    """
    Singleton para obtener el cliente de Supabase.
    """
    global _supabase_client
    if _supabase_client is None:
        _supabase_client = create_client(
            supabase_url=settings.SUPABASE_URL,
            supabase_key=settings.SUPABASE_KEY
        )
    return _supabase_client

def handle_supabase_error(error: Any) -> Dict[str, Any]:
    """
    Manejar errores comunes de Supabase y formatear respuesta de error
    """
    if hasattr(error, 'message'):
        message = error.message
    else:
        message = str(error)
        
    error_code = getattr(error, 'code', 'unknown_error')
        
    return {
        "code": error_code,
        "message": message,
        "details": str(error)
    }

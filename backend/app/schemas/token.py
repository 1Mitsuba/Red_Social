from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class TokenPayload(BaseModel):
    """
    Payload del token JWT
    """
    sub: str = None  # ID del usuario
    exp: int = None  # Tiempo de expiración

class Token(BaseModel):
    """
    Esquema de respuesta para token de acceso
    """
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    """
    Datos extraídos del token
    """
    user_id: Optional[str] = None

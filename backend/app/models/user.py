from typing import Optional, Dict, Any, List
from pydantic import BaseModel

class User(BaseModel):
    """
    Modelo de usuario
    """
    id: str
    email: str
    is_active: bool = True
    nombre: Optional[str] = None
    carrera: Optional[str] = None
    ano_estudio: Optional[int] = None
    grupo: Optional[str] = None
    avatar_url: Optional[str] = None
    
    class Config:
        orm_mode = True

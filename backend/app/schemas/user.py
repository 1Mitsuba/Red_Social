from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    """
    Campos base para usuarios
    """
    email: EmailStr
    nombre: str = Field(..., min_length=1, max_length=100)
    carrera: str = Field(..., min_length=1, max_length=100)
    ano_estudio: int = Field(..., ge=1, le=10)
    grupo: Optional[str] = Field(None, max_length=20)

class UserCreate(UserBase):
    """
    Campos para crear un usuario
    """
    password: str = Field(..., min_length=8)
    
    @validator('password')
    def password_strength(cls, v):
        # Validar que la contraseña tenga al menos:
        # - 8 caracteres
        # - Una letra mayúscula
        # - Una letra minúscula
        # - Un número
        if len(v) < 8:
            raise ValueError('La contraseña debe tener al menos 8 caracteres')
        if not any(c.isupper() for c in v):
            raise ValueError('La contraseña debe tener al menos una letra mayúscula')
        if not any(c.islower() for c in v):
            raise ValueError('La contraseña debe tener al menos una letra minúscula')
        if not any(c.isdigit() for c in v):
            raise ValueError('La contraseña debe tener al menos un número')
        return v

class UserUpdate(BaseModel):
    """
    Campos para actualizar un usuario
    """
    nombre: Optional[str] = Field(None, min_length=1, max_length=100)
    carrera: Optional[str] = Field(None, min_length=1, max_length=100)
    ano_estudio: Optional[int] = Field(None, ge=1, le=10)
    grupo: Optional[str] = Field(None, max_length=20)
    avatar_url: Optional[str] = None

class UserResponse(BaseModel):
    """
    Respuesta de usuario
    """
    id: str
    email: EmailStr
    nombre: str
    carrera: str
    ano_estudio: int
    grupo: Optional[str] = None
    avatar_url: Optional[str] = None
    is_active: bool
    created_at: datetime
    
    class Config:
        orm_mode = True

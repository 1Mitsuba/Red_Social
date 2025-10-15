from pydantic import BaseModel, Field, validator
from typing import Optional, List, Dict, Any
from datetime import datetime, time
from enum import Enum

class RouteStatus(str, Enum):
    """
    Estados de una ruta de carpooling
    """
    ACTIVE = "activa"
    COMPLETED = "completada"
    CANCELLED = "cancelada"

class PassengerStatus(str, Enum):
    """
    Estados de un pasajero en una ruta
    """
    PENDING = "pendiente"
    ACCEPTED = "aceptado"
    REJECTED = "rechazado"

class DayOfWeek(str, Enum):
    """
    Días de la semana
    """
    MONDAY = "lun"
    TUESDAY = "mar"
    WEDNESDAY = "mie"
    THURSDAY = "jue"
    FRIDAY = "vie"
    SATURDAY = "sab"
    SUNDAY = "dom"

class RouteBase(BaseModel):
    """
    Modelo base para rutas de carpooling
    """
    origen: str = Field(..., min_length=3, max_length=100)
    destino: str = Field(..., min_length=3, max_length=100)
    hora_salida: time
    dias: List[DayOfWeek]
    capacidad: int = Field(..., ge=1, le=10)
    descripcion: Optional[str] = Field(None, max_length=500)
    origen_lat: Optional[float] = None
    origen_lng: Optional[float] = None
    destino_lat: Optional[float] = None
    destino_lng: Optional[float] = None

class RouteCreate(RouteBase):
    """
    Datos para crear una ruta
    """
    paradas_intermedias: Optional[List[Dict[str, Any]]] = None

class RouteUpdate(BaseModel):
    """
    Datos para actualizar una ruta
    """
    origen: Optional[str] = Field(None, min_length=3, max_length=100)
    destino: Optional[str] = Field(None, min_length=3, max_length=100)
    hora_salida: Optional[time] = None
    dias: Optional[List[DayOfWeek]] = None
    capacidad: Optional[int] = Field(None, ge=1, le=10)
    descripcion: Optional[str] = Field(None, max_length=500)
    estado: Optional[RouteStatus] = None
    origen_lat: Optional[float] = None
    origen_lng: Optional[float] = None
    destino_lat: Optional[float] = None
    destino_lng: Optional[float] = None
    paradas_intermedias: Optional[List[Dict[str, Any]]] = None

class PassengerBase(BaseModel):
    """
    Modelo base para pasajeros
    """
    user_id: str
    estado: PassengerStatus = PassengerStatus.PENDING

class PassengerResponse(PassengerBase):
    """
    Respuesta de pasajero
    """
    id: str
    route_id: str
    nombre: str
    avatar_url: Optional[str] = None
    created_at: datetime
    
    class Config:
        orm_mode = True

class RouteResponse(RouteBase):
    """
    Respuesta de ruta
    """
    id: str
    driver_id: str
    driver_name: str
    driver_avatar: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    estado: RouteStatus
    asientos_disponibles: int
    pasajeros: List[PassengerResponse]
    paradas_intermedias: List[Dict[str, Any]]
    is_driver: bool
    is_passenger: bool
    passenger_status: Optional[PassengerStatus] = None
    
    class Config:
        orm_mode = True

class RouteFilterParams(BaseModel):
    """
    Parámetros de filtrado para rutas
    """
    origin: Optional[str] = None
    destination: Optional[str] = None
    day: Optional[str] = None
    time_from: Optional[str] = None
    time_to: Optional[str] = None
    
    @validator('time_from', 'time_to')
    def validate_time_format(cls, v):
        if v and not v.match(r'^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'):
            raise ValueError('El formato de hora debe ser HH:MM')
        return v

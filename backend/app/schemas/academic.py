from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime, time

class SubjectBase(BaseModel):
    """
    Modelo base para materias
    """
    nombre: str
    codigo: str
    grupo: str
    aula: Optional[str] = None
    
class SubjectResponse(SubjectBase):
    """
    Respuesta de materia
    """
    id: str
    id_docente: str
    nombre_docente: str
    correo_docente: str
    horario: List[Dict[str, Any]]
    
    class Config:
        orm_mode = True

class ScheduleItem(BaseModel):
    """
    Elemento de horario
    """
    id: str
    dia: str
    hora_inicio: time
    hora_fin: time
    materia: str
    codigo_materia: str
    grupo: str
    aula: Optional[str] = None
    docente: str
    
class ScheduleResponse(BaseModel):
    """
    Respuesta de horario completo
    """
    lunes: List[ScheduleItem]
    martes: List[ScheduleItem]
    miercoles: List[ScheduleItem]
    jueves: List[ScheduleItem]
    viernes: List[ScheduleItem]
    sabado: List[ScheduleItem]
    
    class Config:
        orm_mode = True
        
class GradeBase(BaseModel):
    """
    Modelo base para calificación
    """
    valor: float = Field(..., ge=0.0, le=10.0)
    descripcion: str
    fecha: datetime
    
class GradeResponse(GradeBase):
    """
    Respuesta de calificación
    """
    id: str
    id_materia: str
    nombre_materia: str
    codigo_materia: str
    
    class Config:
        orm_mode = True
        
class TeacherResponse(BaseModel):
    """
    Respuesta de docente
    """
    id: str
    nombre: str
    correo: str
    especialidad: str
    materias: List[Dict[str, Any]]
    
    class Config:
        orm_mode = True

from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, Query, status
from app.dependencies import get_current_active_user
from app.models.user import User
from app.schemas.academic import SubjectResponse, ScheduleResponse, GradeResponse, TeacherResponse
from app.services.academic import get_student_subjects, get_student_schedule, get_student_grades, get_student_teachers

router = APIRouter()

@router.get("/subjects", response_model=List[SubjectResponse])
async def read_subjects(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Obtener todas las materias del estudiante.
    """
    subjects = await get_student_subjects(current_user.id)
    return subjects

@router.get("/schedule", response_model=ScheduleResponse)
async def read_schedule(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Obtener el horario semanal del estudiante.
    """
    schedule = await get_student_schedule(current_user.id)
    return schedule

@router.get("/grades", response_model=List[GradeResponse])
async def read_grades(
    subject_id: str = Query(None, description="Filtrar por materia"),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Obtener las calificaciones del estudiante.
    Opcionalmente se puede filtrar por materia.
    """
    grades = await get_student_grades(current_user.id, subject_id)
    return grades

@router.get("/teachers", response_model=List[TeacherResponse])
async def read_teachers(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Obtener información de los profesores de las materias del estudiante.
    """
    teachers = await get_student_teachers(current_user.id)
    return teachers

@router.get("/export-schedule")
async def export_schedule(
    format: str = Query(..., description="Formato de exportación (pdf, excel)"),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Exportar el horario en formato PDF o Excel.
    """
    # Aquí se implementaría la lógica para generar el archivo en el formato solicitado
    pass

@router.get("/export-grades")
async def export_grades(
    format: str = Query(..., description="Formato de exportación (pdf, excel)"),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Exportar las calificaciones en formato PDF o Excel.
    """
    # Aquí se implementaría la lógica para generar el archivo en el formato solicitado
    pass

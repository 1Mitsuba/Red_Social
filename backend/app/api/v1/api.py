from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, academic, social, carpooling

api_router = APIRouter()

# Incluir los diferentes endpoints
api_router.include_router(auth.router, prefix="/auth", tags=["Autenticación"])
api_router.include_router(users.router, prefix="/users", tags=["Usuarios"])
api_router.include_router(academic.router, prefix="/academic", tags=["Académico"])
api_router.include_router(social.router, prefix="/social", tags=["Social"])
api_router.include_router(carpooling.router, prefix="/carpooling", tags=["Carpooling"])

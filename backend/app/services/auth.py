from typing import Optional, Dict, Any
from app.services.supabase import get_supabase_client, handle_supabase_error
from app.schemas.user import UserCreate, UserResponse
from app.core.security import verify_password, get_password_hash

async def authenticate_user(email: str, password: str) -> Optional[Dict[str, Any]]:
    """
    Autenticar un usuario con email y contraseña.
    """
    try:
        supabase = get_supabase_client()
        response = supabase.auth.sign_in_with_password({"email": email, "password": password})
        
        if response.error:
            return None
        
        return response.user
    except Exception as e:
        print(f"Error de autenticación: {str(e)}")
        return None

async def register_new_user(user_data: UserCreate) -> Optional[Dict[str, Any]]:
    """
    Registrar un nuevo usuario.
    """
    try:
        supabase = get_supabase_client()
        
        # Verificar si el correo ya está en uso
        existing_user = supabase.table('perfiles').select('*').eq('correo', user_data.email).execute()
        if existing_user.data:
            return None
            
        # Registrar usuario en auth
        signup_response = supabase.auth.sign_up({
            "email": user_data.email,
            "password": user_data.password,
            "options": {
                "data": {
                    "nombre": user_data.nombre,
                    "carrera": user_data.carrera,
                    "ano_estudio": user_data.ano_estudio,
                    "grupo": user_data.grupo
                }
            }
        })
        
        if signup_response.error:
            return None
            
        # Crear perfil en la tabla de perfiles
        user = signup_response.user
        profile_data = {
            "id_usuario": user.id,
            "nombre": user_data.nombre,
            "correo": user_data.email,
            "carrera": user_data.carrera,
            "ano_estudio": user_data.ano_estudio,
            "grupo": user_data.grupo
        }
        
        profile_response = supabase.table('perfiles').insert(profile_data).execute()
        
        if profile_response.error:
            # Si hay error al crear el perfil, intentar eliminar el usuario de auth
            # (esto en un sistema real requeriría más manejo de errores)
            return None
            
        # Combinar datos para la respuesta
        user_response = {
            "id": user.id,
            "email": user_data.email,
            "nombre": user_data.nombre,
            "carrera": user_data.carrera,
            "ano_estudio": user_data.ano_estudio,
            "grupo": user_data.grupo,
            "is_active": True,
            "created_at": user.created_at
        }
            
        return user_response
        
    except Exception as e:
        print(f"Error de registro: {str(e)}")
        return None

import pytest
from app.services.auth import authenticate_user, register_new_user
from unittest.mock import MagicMock
from app.schemas.user import UserCreate

def test_authenticate_user_success(mock_supabase):
    # Configurar el mock para simular una autenticación exitosa
    mock_response = MagicMock()
    mock_response.error = None
    mock_response.user = {
        "id": "user123",
        "email": "test@example.com",
        "user_metadata": {
            "nombre": "Test User"
        }
    }
    mock_supabase.auth.sign_in_with_password.return_value = mock_response
    
    # Ejecutar la función
    result = authenticate_user("test@example.com", "password123")
    
    # Verificar resultados
    assert result is not None
    assert result.id == "user123"
    assert result.email == "test@example.com"
    mock_supabase.auth.sign_in_with_password.assert_called_once_with(
        {"email": "test@example.com", "password": "password123"}
    )

def test_authenticate_user_failure(mock_supabase):
    # Configurar el mock para simular una autenticación fallida
    mock_response = MagicMock()
    mock_response.error = {"message": "Invalid credentials"}
    mock_response.user = None
    mock_supabase.auth.sign_in_with_password.return_value = mock_response
    
    # Ejecutar la función
    result = authenticate_user("test@example.com", "wrong_password")
    
    # Verificar resultados
    assert result is None
    mock_supabase.auth.sign_in_with_password.assert_called_once_with(
        {"email": "test@example.com", "password": "wrong_password"}
    )

def test_register_new_user_success(mock_supabase):
    # Datos de prueba
    user_data = UserCreate(
        email="new@example.com",
        password="Password123",
        nombre="New User",
        carrera="Informática",
        ano_estudio=3,
        grupo="A"
    )
    
    # Configurar mocks
    # Mock para verificar si el correo ya existe
    mock_select = MagicMock()
    mock_eq = MagicMock()
    mock_execute = MagicMock()
    mock_execute.data = []  # No hay usuarios con ese correo
    mock_eq.execute.return_value = mock_execute
    mock_select.eq.return_value = mock_eq
    mock_supabase.table.return_value.select.return_value = mock_select
    
    # Mock para el registro
    mock_signup_response = MagicMock()
    mock_signup_response.error = None
    mock_signup_response.user = MagicMock()
    mock_signup_response.user.id = "new_user_id"
    mock_signup_response.user.created_at = "2023-01-01T00:00:00"
    mock_supabase.auth.sign_up.return_value = mock_signup_response
    
    # Mock para la inserción en la tabla perfiles
    mock_insert_response = MagicMock()
    mock_insert_response.error = None
    mock_insert_response.data = [{"id": "profile_id"}]
    mock_supabase.table.return_value.insert.return_value.execute.return_value = mock_insert_response
    
    # Ejecutar la función
    result = register_new_user(user_data)
    
    # Verificar resultados
    assert result is not None
    assert result["id"] == "new_user_id"
    assert result["email"] == "new@example.com"
    assert result["nombre"] == "New User"
    mock_supabase.auth.sign_up.assert_called_once()
    mock_supabase.table.return_value.insert.assert_called_once()

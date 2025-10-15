import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.supabase import get_supabase_client
from unittest.mock import patch, MagicMock

@pytest.fixture
def client():
    """
    Cliente de prueba para la API
    """
    return TestClient(app)

@pytest.fixture
def mock_supabase():
    """
    Mock para el cliente de Supabase
    """
    with patch("app.services.supabase.get_supabase_client") as mock:
        supabase_mock = MagicMock()
        mock.return_value = supabase_mock
        yield supabase_mock

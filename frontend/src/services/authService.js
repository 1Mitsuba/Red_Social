import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

// Servicio de autenticación simple que usa nuestro backend directamente
export const authService = {
  // Iniciar sesión con correo y contraseña
  signIn: async (email, password) => {
    try {
      // Configuración del header para Content-Type
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.post(
        `${API_URL}/auth/login`, 
        { email, password },
        config
      );
      
      if (response.data.access_token) {
        localStorage.setItem('user-token', response.data.access_token);
        if (response.data.user) {
          localStorage.setItem('user-data', JSON.stringify(response.data.user));
        }
      }
      
      return { data: response.data };
    } catch (error) {
      console.error('Error en el servicio de autenticación (signIn):', error);
      
      // Manejar diferentes tipos de errores
      let errorMessage;
      if (error.response) {
        // El servidor respondió con un status code fuera del rango 2xx
        errorMessage = error.response.data?.detail || 
                      error.response.data?.message || 
                      `Error ${error.response.status}: Por favor verifica tus credenciales.`;
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta
        errorMessage = 'No se pudo conectar con el servidor. Por favor intenta más tarde.';
      } else {
        // Error al configurar la petición
        errorMessage = 'Error al procesar la solicitud.';
      }
      
      return { error: errorMessage };
    }
  },

  // Registrar un nuevo usuario
  signUp: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return { data: response.data };
    } catch (error) {
      console.error('Error al registrar:', error.response || error);
      const errorMessage = error.response?.data?.detail || 'Error al registrar usuario';
      return { error: errorMessage };
    }
  },

  // Cerrar sesión
  signOut: async () => {
    try {
      localStorage.removeItem('user-token');
      localStorage.removeItem('user-data');
      return { success: true };
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      return { error: 'Error al cerrar sesión' };
    }
  },

  // Recuperar contraseña
  resetPassword: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, 
        { email },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return { data: response.data };
    } catch (error) {
      console.error('Error al solicitar reset de contraseña:', error.response || error);
      const errorMessage = error.response?.data?.detail || 'Error al solicitar cambio de contraseña';
      return { error: errorMessage };
    }
  },

  // Obtener sesión actual
  getCurrentSession: () => {
    try {
      const token = localStorage.getItem('user-token');
      const userData = localStorage.getItem('user-data');
      
      if (token && userData) {
        return { 
          data: { 
            token,
            user: JSON.parse(userData)
          }
        };
      }
      
      return { data: null };
    } catch (error) {
      console.error('Error al obtener sesión:', error);
      return { error: 'Error al obtener la sesión actual' };
    }
  }
};

export default authService;

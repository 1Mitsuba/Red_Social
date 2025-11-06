import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

// Contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para acceder al contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar autenticación al cargar
  useEffect(() => {
    const userData = localStorage.getItem('user-data');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Error parsing user data:', e);
        localStorage.removeItem('user-data');
      }
    }
    setLoading(false);
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await authService.signIn(email, password);
      
      if (error) {
        const errorMessage = typeof error === 'string' ? error : error.message || 'Error al iniciar sesión';
        setError(errorMessage);
        return { error: errorMessage };
      }
      
      setUser(data.user);
      return { user: data.user };
    } catch (error) {
      const errorMessage = 'Error al iniciar sesión. Por favor intenta de nuevo.';
      console.error('Error al iniciar sesión:', error);
      setError(errorMessage);
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Función para inicio de sesión rápido con usuarios predefinidos
  const quickLogin = (userType) => {
    const predefinedUsers = {
      estudiante: { 
        id: 'est-123', 
        nombre: 'María Rodríguez',
        apellido: 'Rodríguez',
        correo: 'maria@univalle.edu',
        ci_est: '12345678',
        carrera: 'Ingeniería de Sistemas',
        semestre: 6,
        rol: 'estudiante'
      },
      docente: {
        id: 'doc-456',
        nombre: 'Carlos Mendoza',
        apellido: 'Mendoza',
        correo: 'carlos.mendoza@univalle.edu',
        ci_doc: '87654321',
        especialidad_doc: 'Desarrollo Web',
        rol: 'docente'
      },
      administrador: {
        id: 'adm-789',
        nombre: 'Laura Espinoza',
        apellido: 'Espinoza',
        correo: 'admin@univalle.edu',
        rol: 'administrador'
      }
    };
    
    const selectedUser = predefinedUsers[userType];
    if (selectedUser) {
      return login(selectedUser);
    } else {
      setError('Tipo de usuario no válido');
      return { error: 'Tipo de usuario no válido' };
    }
  };

  // Función para registrar usuario (simulada)
  const signUp = (userData) => {
    try {
      console.log('Registrando usuario:', userData);
      // Simulamos registro exitoso
      const newUser = { 
        ...userData, 
        id: 'user-' + Math.random().toString(36).substr(2, 9) 
      };
      setUser(newUser);
      localStorage.setItem('user-data', JSON.stringify(newUser));
      return { user: newUser };
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setError('Error al registrar usuario');
      return { error: 'Error al registrar usuario' };
    }
  };

  // Función para cerrar sesión
  const signOut = () => {
    console.log('Cerrando sesión');
    setUser(null);
    localStorage.removeItem('user-data');
  };

  // Función para restablecer contraseña (simulada)
  const resetPassword = (email) => {
    console.log('Restableciendo contraseña para:', email);
    return { data: { message: 'Correo de restablecimiento enviado' } };
  };

  // Alias para compatibilidad con código existente
  const logout = signOut;
  const signIn = login;

  // Verificar si hay usuario guardado en localStorage al iniciar
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user-data');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error al recuperar datos del usuario:', error);
      }
    }
    else {
      // Si no hay usuario guardado, permitir modo demo con query string ?demo=1
      try {
        const params = new URLSearchParams(window.location.search);
        if (params.get('demo') === '1') {
          // set demo user
          setUser(predefinedUsers.estudiante);
          localStorage.setItem('user-data', JSON.stringify(predefinedUsers.estudiante));
        }
      } catch (e) {
        // ignore in non-browser environments
      }
    }
  }, []);

  // Valor que se proporciona al contexto
  const value = {
    user,
    loading,
    error,
    login,
    quickLogin,
    logout,
    signIn,
    signUp,
    signOut,
    resetPassword,
    isAuthenticated: !!user,
    isLoading: loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

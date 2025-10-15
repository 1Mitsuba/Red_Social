import { supabase, handleSupabaseError } from './supabase';
import * as SecureStore from '../utils/secureStore';

// Servicio de autenticación que utiliza Supabase
export const authService = {
  // Iniciar sesión con correo y contraseña
  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        return { error: handleSupabaseError(error) };
      }
      
      if (data?.session) {
        await SecureStore.setItem('user-token', data.session.access_token);
      }
      
      return { data };
    } catch (error) {
      console.error('Error en el servicio de autenticación (signIn):', error);
      return { error: { message: 'Error al iniciar sesión', details: error.message } };
    }
  },

  // Registrar un nuevo usuario
  signUp: async (email, password, userData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });
      
      if (error) {
        return { error: handleSupabaseError(error) };
      }
      
      // Si el registro es exitoso, crear el perfil en la tabla de perfiles
      if (data?.user) {
        const { error: profileError } = await supabase
          .from('perfiles')
          .insert([
            { 
              id_usuario: data.user.id,
              nombre: userData.nombre,
              correo: email,
              carrera: userData.carrera,
              ano_estudio: userData.ano_estudio,
              grupo: userData.grupo
            }
          ]);
          
        if (profileError) {
          console.error('Error al crear perfil:', profileError);
          return { 
            data, 
            warning: 'Usuario creado pero hubo un problema al configurar el perfil.' 
          };
        }
      }
      
      return { data };
    } catch (error) {
      console.error('Error en el servicio de autenticación (signUp):', error);
      return { error: { message: 'Error al registrar usuario', details: error.message } };
    }
  },

  // Cerrar sesión
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return { error: handleSupabaseError(error) };
      }
      
      await SecureStore.deleteItem('user-token');
      return { success: true };
    } catch (error) {
      console.error('Error en el servicio de autenticación (signOut):', error);
      return { error: { message: 'Error al cerrar sesión', details: error.message } };
    }
  },

  // Recuperar contraseña
  resetPassword: async (email) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) {
        return { error: handleSupabaseError(error) };
      }
      
      return { data, success: true };
    } catch (error) {
      console.error('Error en el servicio de autenticación (resetPassword):', error);
      return { error: { message: 'Error al enviar el correo de recuperación', details: error.message } };
    }
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: async () => {
    try {
      const token = await SecureStore.getItem('user-token');
      
      if (!token) {
        return { authenticated: false };
      }
      
      const { data, error } = await supabase.auth.getUser(token);
      
      if (error || !data?.user) {
        await SecureStore.deleteItem('user-token');
        return { authenticated: false, error: error ? handleSupabaseError(error) : null };
      }
      
      return { authenticated: true, user: data.user };
    } catch (error) {
      console.error('Error en el servicio de autenticación (isAuthenticated):', error);
      return { authenticated: false, error: { message: 'Error al verificar autenticación', details: error.message } };
    }
  },

  // Actualizar datos del usuario
  updateUser: async (userData) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: userData,
      });
      
      if (error) {
        return { error: handleSupabaseError(error) };
      }
      
      return { data, success: true };
    } catch (error) {
      console.error('Error en el servicio de autenticación (updateUser):', error);
      return { error: { message: 'Error al actualizar datos de usuario', details: error.message } };
    }
  },
};

export default authService;

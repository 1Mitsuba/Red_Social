import axios from 'axios';
import * as SecureStore from '../utils/secureStore';

// Crear una instancia de axios con la URL base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token de autenticación a las peticiones
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItem('user-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error al obtener el token de autenticación:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores comunes en las respuestas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Si el error es 401 (no autorizado) y no hemos intentado actualizar el token antes
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Aquí podríamos implementar lógica para refrescar el token si lo necesitamos
        // Por ahora, simplemente redirigimos a la pantalla de login
        await SecureStore.deleteItem('user-token');
        window.location.href = '/login';
        return Promise.reject(error);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Exportar funciones específicas para cada tipo de petición
export const apiService = {
  // Endpoints de autenticación (estos usarán directamente Supabase, pero los incluimos por completitud)
  auth: {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (userData) => api.post('/auth/register', userData),
    resetPassword: (email) => api.post('/auth/reset-password', { email }),
  },
  
  // Endpoints académicos
  academic: {
    getSubjects: () => api.get('/academic/subjects'),
    getSchedule: () => api.get('/academic/schedule'),
    getGrades: () => api.get('/academic/grades'),
    getGradeHistory: () => api.get('/academic/grade-history'),
    getTeachers: () => api.get('/academic/teachers'),
    exportSchedule: (format) => api.get(`/academic/export-schedule?format=${format}`),
    exportGrades: (format) => api.get(`/academic/export-grades?format=${format}`),
  },
  
  // Endpoints sociales
  social: {
    getPosts: (page = 1, limit = 10) => api.get(`/social/posts?page=${page}&limit=${limit}`),
    getPost: (postId) => api.get(`/social/posts/${postId}`),
    createPost: (postData) => api.post('/social/posts', postData),
    updatePost: (postId, postData) => api.put(`/social/posts/${postId}`, postData),
    deletePost: (postId) => api.delete(`/social/posts/${postId}`),
    likePost: (postId) => api.post(`/social/posts/${postId}/like`),
    unlikePost: (postId) => api.delete(`/social/posts/${postId}/like`),
    getComments: (postId, page = 1, limit = 10) => api.get(`/social/posts/${postId}/comments?page=${page}&limit=${limit}`),
    createComment: (postId, content) => api.post(`/social/posts/${postId}/comments`, { content }),
    deleteComment: (commentId) => api.delete(`/social/comments/${commentId}`),
    getMessages: (userId) => api.get(`/social/messages/${userId}`),
    sendMessage: (userId, content) => api.post(`/social/messages/${userId}`, { content }),
    getConversations: () => api.get('/social/conversations'),
  },
  
  // Endpoints de carpooling
  carpooling: {
    getRoutes: (filters = {}) => api.get('/carpooling/routes', { params: filters }),
    getRoute: (routeId) => api.get(`/carpooling/routes/${routeId}`),
    createRoute: (routeData) => api.post('/carpooling/routes', routeData),
    updateRoute: (routeId, routeData) => api.put(`/carpooling/routes/${routeId}`, routeData),
    deleteRoute: (routeId) => api.delete(`/carpooling/routes/${routeId}`),
    joinRoute: (routeId) => api.post(`/carpooling/routes/${routeId}/join`),
    leaveRoute: (routeId) => api.delete(`/carpooling/routes/${routeId}/leave`),
    acceptPassenger: (routeId, userId) => api.put(`/carpooling/routes/${routeId}/passengers/${userId}/accept`),
    rejectPassenger: (routeId, userId) => api.put(`/carpooling/routes/${routeId}/passengers/${userId}/reject`),
    getMyRoutes: () => api.get('/carpooling/my-routes'),
    getMyRides: () => api.get('/carpooling/my-rides'),
  },
  
  // Endpoints de perfil de usuario
  user: {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (profileData) => api.put('/users/profile', profileData),
    uploadAvatar: (formData) => api.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  },
};

export default api;

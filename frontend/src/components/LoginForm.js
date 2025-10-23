import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Card, Button, Heading } from './UIComponents';
import '../styles/LoginFormNew.css';
import '../styles/themes.css';

const LoginForm = () => {
  const { theme, isDarkMode } = useTheme();
  const { login, quickLogin } = useAuth();
  const [activeTab, setActiveTab] = useState('login'); // 'login' o 'signup'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    confirmPassword: '',
    rol: 'estudiante'
  });
  const [error, setError] = useState(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  
  // Mostrar indicador de scroll cuando estamos en la pestaña de registro
  useEffect(() => {
    if (activeTab === 'signup') {
      setShowScrollIndicator(true);
      const timer = setTimeout(() => {
        setShowScrollIndicator(false);
      }, 4000); // Ocultar después de 4 segundos
      
      return () => clearTimeout(timer);
    } else {
      setShowScrollIndicator(false);
    }
  }, [activeTab]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }
    login({
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      nombre: formData.email.split('@')[0],
      correo: formData.email,
      rol: 'estudiante'
    });
  };
  
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    login({
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      nombre: formData.nombre,
      apellido: formData.apellido,
      correo: formData.email,
      rol: formData.rol
    });
  };

  return (
    <div className="login-container">
      {showScrollIndicator && <div className="scroll-indicator">Desliza para ver más</div>}
      
      <div className="login-card">
        <div className="login-logo-container">
          <img 
            src="https://storage.googleapis.com/copilot-img-chat/6fc0e9ae-dbf9-432d-9b5f-b5e9fc07c605.png" 
            alt="Universidad del Valle Bolivia" 
            className="login-logo"
          />
          <h1 className="login-title">Red Univalle</h1>
          <p className="login-subtitle">
            Plataforma para estudiantes, docentes y personal de la universidad
          </p>
        </div>
        
        <div className="login-tab-container">
          <div 
            onClick={() => setActiveTab('login')}
            className={`login-tab ${activeTab === 'login' ? 'active' : ''}`}
          >
            Iniciar Sesión
          </div>
          <div 
            onClick={() => setActiveTab('signup')}
            className={`login-tab ${activeTab === 'signup' ? 'active' : ''}`}
          >
            Registrarse
            {activeTab === 'signup' && <span className="tab-badge">10</span>}
          </div>
        </div>
          
          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit}>
              <div className="login-form-group">
                <label htmlFor="email" className="login-label">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@univalle.edu"
                  className="login-input"
                />
              </div>
              
              <div className="login-form-group">
                <label htmlFor="password" className="login-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="login-input"
                />
              </div>
              
              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}
              
              <button
                className="login-button"
                type="submit"
              >
                Iniciar Sesión
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="signup-form">
              <div className="login-form-group">
                <label htmlFor="nombre" className="login-label">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="login-input"
                />
              </div>
              
              <div className="login-form-group">
                <label htmlFor="apellido" className="login-label">
                  Apellido
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Tu apellido"
                  className="login-input"
                />
              </div>
              
              <div className="login-form-group">
                <label htmlFor="email-signup" className="login-label">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email-signup"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@univalle.edu"
                  className="login-input"
                />
              </div>
              
              <div className="login-form-group">
                <label htmlFor="password-signup" className="login-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password-signup"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="login-input"
                />
              </div>
              
              <div className="login-form-group">
                <label htmlFor="confirm-password" className="login-label">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="login-input"
                />
              </div>
              
              <div className="login-form-group">
                <label htmlFor="rol" className="login-label">
                  Rol
                </label>
                <select
                  id="rol"
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  className="login-input"
                >
                  <option value="estudiante">Estudiante</option>
                  <option value="docente">Docente</option>
                </select>
              </div>
              
              <div className="login-form-group">
                <label htmlFor="ci" className="login-label">
                  Cédula de Identidad
                </label>
                <input
                  type="text"
                  id="ci"
                  name="ci"
                  placeholder="12345678"
                  className="login-input"
                />
              </div>
              
              <div className="login-form-group">
                <label htmlFor="telefono" className="login-label">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  placeholder="70123456"
                  className="login-input"
                />
              </div>
              
              <div className="login-form-group">
                <label htmlFor="direccion" className="login-label">
                  Dirección
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  placeholder="Av. Principal #123"
                  className="login-input"
                />
              </div>
              
              <div className="login-form-group">
                <label htmlFor="carrera" className="login-label">
                  Carrera
                </label>
                <input
                  type="text"
                  id="carrera"
                  name="carrera"
                  placeholder="Ingeniería de Sistemas"
                  className="login-input"
                />
              </div>
              
              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}
              
              <button
                className="login-button"
                type="submit"
              >
                Registrarse
              </button>
            </form>
          )}
        
        <div className="login-demo-section">
          <h3 className="login-demo-title">
            Acceso Rápido para Demostración
          </h3>
          <div>
            <button
              className="login-demo-button"
              onClick={() => quickLogin('estudiante')}
            >
              <span className="login-demo-icon">👨‍🎓</span> Ingresar como Estudiante
            </button>
            <button
              className="login-demo-button"
              onClick={() => quickLogin('docente')}
            >
              <span className="login-demo-icon">👨‍🏫</span> Ingresar como Docente
            </button>
            <button
              className="login-demo-button"
              onClick={() => quickLogin('administrador')}
            >
              <span className="login-demo-icon">👨‍💼</span> Ingresar como Administrador
            </button>
          </div>
        </div>
        
        <div className="login-footer">
          Red Social Univalle - Universidad del Valle Bolivia<br />
          © 2025 Todos los derechos reservados
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

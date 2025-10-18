import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Card, Button, Heading } from './UIComponents';

const LoginForm = () => {
  const { theme } = useTheme();
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
    <div style={{ 
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.md
    }}>
      <Card style={{ 
        maxWidth: '460px',
        width: '100%',
        padding: theme.spacing.xl,
        boxShadow: theme.shadows.large
      }}>
        <div style={{ 
          marginBottom: theme.spacing.lg,
          textAlign: 'center'
        }}>
          <img 
            src="https://storage.googleapis.com/copilot-img-chat/6fc0e9ae-dbf9-432d-9b5f-b5e9fc07c605.png" 
            alt="Universidad del Valle Bolivia" 
            style={{ height: '60px', marginBottom: theme.spacing.md }}
          />
          <Heading level={1} style={{ color: theme.colors.primary, textAlign: 'center', marginBottom: theme.spacing.xs }}>
            Red Univalle
          </Heading>
          <p style={{ color: theme.colors.textLight, marginBottom: theme.spacing.lg }}>
            Plataforma para estudiantes, docentes y personal de la universidad
          </p>
        </div>
        
        <div style={{ marginBottom: theme.spacing.lg }}>
          <div style={{ 
            display: 'flex', 
            borderBottom: `1px solid ${theme.colors.border}`,
            marginBottom: theme.spacing.md
          }}>
            <div 
              onClick={() => setActiveTab('login')}
              style={{
                padding: theme.spacing.sm,
                flex: 1,
                textAlign: 'center',
                borderBottom: activeTab === 'login' 
                  ? `2px solid ${theme.colors.primary}`
                  : '2px solid transparent',
                color: activeTab === 'login' ? theme.colors.primary : theme.colors.text,
                fontWeight: activeTab === 'login' ? 'bold' : 'normal',
                cursor: 'pointer'
              }}
            >
              Iniciar Sesión
            </div>
            <div 
              onClick={() => setActiveTab('signup')}
              style={{
                padding: theme.spacing.sm,
                flex: 1,
                textAlign: 'center',
                borderBottom: activeTab === 'signup' 
                  ? `2px solid ${theme.colors.primary}`
                  : '2px solid transparent',
                color: activeTab === 'signup' ? theme.colors.primary : theme.colors.text,
                fontWeight: activeTab === 'signup' ? 'bold' : 'normal',
                cursor: 'pointer'
              }}
            >
              Registrarse
            </div>
          </div>
          
          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: theme.spacing.md }}>
                <label 
                  htmlFor="email"
                  style={{ 
                    display: 'block', 
                    marginBottom: theme.spacing.xs,
                    fontWeight: '500'
                  }}
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@univalle.edu"
                  style={{
                    width: '100%',
                    padding: theme.spacing.sm,
                    borderRadius: theme.borderRadius.small,
                    border: `1px solid ${theme.colors.border}`,
                    backgroundColor: theme.colors.background
                  }}
                />
              </div>
              
              <div style={{ marginBottom: theme.spacing.md }}>
                <label 
                  htmlFor="password"
                  style={{ 
                    display: 'block', 
                    marginBottom: theme.spacing.xs,
                    fontWeight: '500'
                  }}
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: theme.spacing.sm,
                    borderRadius: theme.borderRadius.small,
                    border: `1px solid ${theme.colors.border}`,
                    backgroundColor: theme.colors.background
                  }}
                />
              </div>
              
              {error && (
                <div style={{ 
                  color: theme.colors.notification,
                  marginBottom: theme.spacing.md,
                  padding: theme.spacing.sm,
                  backgroundColor: `${theme.colors.notification}15`,
                  borderRadius: theme.borderRadius.small
                }}>
                  {error}
                </div>
              )}
              
              <div style={{ marginBottom: theme.spacing.lg }}>
                <Button
                  variant="primary"
                  fullWidth
                  style={{ marginBottom: theme.spacing.sm }}
                  onClick={handleLoginSubmit}
                >
                  Iniciar Sesión
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <div style={{ marginBottom: theme.spacing.md }}>
                <label 
                  htmlFor="nombre"
                  style={{ 
                    display: 'block', 
                    marginBottom: theme.spacing.xs,
                    fontWeight: '500'
                  }}
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  style={{
                    width: '100%',
                    padding: theme.spacing.sm,
                    borderRadius: theme.borderRadius.small,
                    border: `1px solid ${theme.colors.border}`,
                    backgroundColor: theme.colors.background
                  }}
                />
              </div>
              
              <div style={{ marginBottom: theme.spacing.md }}>
                <label 
                  htmlFor="apellido"
                  style={{ 
                    display: 'block', 
                    marginBottom: theme.spacing.xs,
                    fontWeight: '500'
                  }}
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Tu apellido"
                  style={{
                    width: '100%',
                    padding: theme.spacing.sm,
                    borderRadius: theme.borderRadius.small,
                    border: `1px solid ${theme.colors.border}`,
                    backgroundColor: theme.colors.background
                  }}
                />
              </div>
              
              <div style={{ marginBottom: theme.spacing.md }}>
                <label 
                  htmlFor="email-signup"
                  style={{ 
                    display: 'block', 
                    marginBottom: theme.spacing.xs,
                    fontWeight: '500'
                  }}
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email-signup"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@univalle.edu"
                  style={{
                    width: '100%',
                    padding: theme.spacing.sm,
                    borderRadius: theme.borderRadius.small,
                    border: `1px solid ${theme.colors.border}`,
                    backgroundColor: theme.colors.background
                  }}
                />
              </div>
              
              <div style={{ marginBottom: theme.spacing.md }}>
                <label 
                  htmlFor="password-signup"
                  style={{ 
                    display: 'block', 
                    marginBottom: theme.spacing.xs,
                    fontWeight: '500'
                  }}
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password-signup"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: theme.spacing.sm,
                    borderRadius: theme.borderRadius.small,
                    border: `1px solid ${theme.colors.border}`,
                    backgroundColor: theme.colors.background
                  }}
                />
              </div>
              
              <div style={{ marginBottom: theme.spacing.md }}>
                <label 
                  htmlFor="confirm-password"
                  style={{ 
                    display: 'block', 
                    marginBottom: theme.spacing.xs,
                    fontWeight: '500'
                  }}
                >
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: theme.spacing.sm,
                    borderRadius: theme.borderRadius.small,
                    border: `1px solid ${theme.colors.border}`,
                    backgroundColor: theme.colors.background
                  }}
                />
              </div>
              
              <div style={{ marginBottom: theme.spacing.md }}>
                <label 
                  htmlFor="rol"
                  style={{ 
                    display: 'block', 
                    marginBottom: theme.spacing.xs,
                    fontWeight: '500'
                  }}
                >
                  Rol
                </label>
                <select
                  id="rol"
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: theme.spacing.sm,
                    borderRadius: theme.borderRadius.small,
                    border: `1px solid ${theme.colors.border}`,
                    backgroundColor: theme.colors.background
                  }}
                >
                  <option value="estudiante">Estudiante</option>
                  <option value="docente">Docente</option>
                </select>
              </div>
              
              {error && (
                <div style={{ 
                  color: theme.colors.notification,
                  marginBottom: theme.spacing.md,
                  padding: theme.spacing.sm,
                  backgroundColor: `${theme.colors.notification}15`,
                  borderRadius: theme.borderRadius.small
                }}>
                  {error}
                </div>
              )}
              
              <div style={{ marginBottom: theme.spacing.md }}>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleRegisterSubmit}
                >
                  Registrarse
                </Button>
              </div>
            </form>
          )}
        </div>
        
        <div style={{ 
          borderTop: `1px solid ${theme.colors.border}`, 
          paddingTop: theme.spacing.md,
          marginBottom: theme.spacing.md
        }}>
          <h3 style={{ 
            textAlign: 'center', 
            color: theme.colors.primary,
            marginBottom: theme.spacing.md 
          }}>
            Acceso Rápido para Demostración
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing.sm
          }}>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => quickLogin('estudiante')}
            >
              👨‍🎓 Ingresar como Estudiante
            </Button>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => quickLogin('docente')}
            >
              👨‍🏫 Ingresar como Docente
            </Button>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => quickLogin('administrador')}
            >
              👨‍💼 Ingresar como Administrador
            </Button>
          </div>
        </div>
        
        <div style={{ 
          textAlign: 'center',
          color: theme.colors.textLight,
          fontSize: '0.8rem'
        }}>
          <p>Red Social Univalle - Universidad del Valle Bolivia</p>
          <p>© 2025 Todos los derechos reservados</p>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
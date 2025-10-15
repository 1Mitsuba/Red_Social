import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';

// Componentes simulados para la estructura básica
const Header = () => {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const { user, logout } = useAuth();
  
  return (
    <header style={{ 
      backgroundColor: theme.colors.card,
      padding: '16px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h1 style={{ color: theme.colors.primary, margin: 0 }}>Red Social Universitaria</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {user && (
          <>
            <span style={{ marginRight: '15px', color: theme.colors.text }}>
              Hola, {user.nombre || 'Usuario'}
            </span>
            <button 
              onClick={logout}
              style={{
                padding: '8px 16px',
                backgroundColor: theme.colors.secondary,
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                marginRight: '10px',
                cursor: 'pointer'
              }}
            >
              Cerrar Sesión
            </button>
          </>
        )}
        <button 
          onClick={toggleTheme}
          style={{
            padding: '8px 16px',
            backgroundColor: theme.colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </button>
      </div>
    </header>
  );
};

// Componente de Navegación con selección de módulos
const Navigation = ({ activeTab, setActiveTab }) => {
  const { theme } = useTheme();
  
  const NavButton = ({ id, label, icon }) => {
    const isActive = activeTab === id;
    
    return (
      <button
        onClick={() => setActiveTab(id)}
        style={{
          backgroundColor: isActive ? theme.colors.primary : 'transparent',
          color: isActive ? 'white' : theme.colors.text,
          border: 'none',
          borderRadius: theme.borderRadius.medium,
          padding: '12px 20px',
          margin: '0 5px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: isActive ? 'bold' : 'normal',
          transition: 'all 0.3s ease'
        }}
      >
          <span style={{ marginRight: '8px', fontSize: '18px' }}>{icon}</span>
          {label}
        </button>
    );
  };
  
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px'
    }}>
      <NavButton id="academic" label="Académico" icon="📚" />
      <NavButton id="social" label="Social" icon="👥" />
      <NavButton id="carpooling" label="Carpooling" icon="🚗" />
    </nav>
  );
};

// Componente de Módulo Social
const SocialModule = () => {
  const { theme } = useTheme();
  const [posts, setPosts] = useState([
    { id: 1, user: 'Laura Gómez', content: 'Hoy presentamos nuestro proyecto final de Inteligencia Artificial', likes: 24 },
    { id: 2, user: 'Carlos Ramírez', content: '¿Alguien tiene los apuntes de Cálculo III?', likes: 12 },
    { id: 3, user: 'Sofía Martínez', content: 'La conferencia de Ciencia de Datos estuvo increíble', likes: 35 }
  ]);
  
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: theme.colors.text, marginBottom: '20px' }}>Publicaciones Recientes</h2>
      
      {/* Crear nueva publicación */}
      <div style={{ 
        backgroundColor: theme.colors.card,
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <textarea 
          placeholder="¿Qué estás pensando?"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: `1px solid ${theme.colors.border}`,
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            marginBottom: '10px',
            minHeight: '100px'
          }}
        />
        <button style={{
          padding: '8px 16px',
          backgroundColor: theme.colors.primary,
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          float: 'right'
        }}>
          Publicar
        </button>
        <div style={{ clear: 'both' }}></div>
      </div>
      
      {/* Lista de publicaciones */}
      {posts.map(post => (
        <div key={post.id} style={{ 
          backgroundColor: theme.colors.card,
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '15px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: theme.colors.primary, marginBottom: '5px' }}>{post.user}</h3>
          <p style={{ color: theme.colors.text, marginBottom: '10px' }}>{post.content}</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button style={{
              background: 'none',
              border: 'none',
              color: theme.colors.primary,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}>
              ❤️ {post.likes}
            </button>
            <button style={{
              background: 'none',
              border: 'none',
              color: theme.colors.text,
              cursor: 'pointer',
              marginLeft: '15px'
            }}>
              Comentar
            </button>
            <button style={{
              background: 'none',
              border: 'none',
              color: theme.colors.text,
              cursor: 'pointer',
              marginLeft: '15px'
            }}>
              Compartir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Componente Login
const LoginForm = () => {
  const { theme } = useTheme();
  const { login } = useAuth();
  
  // Función simplificada para login directo
  const handleDirectLogin = () => {
    login({ 
      id: 'user-123',
      nombre: 'Usuario de Prueba',
      email: 'usuario@ejemplo.com',
      rol: 'estudiante'
    });
  };
  
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 60px)',
      backgroundColor: theme.colors.background
    }}>
      <div style={{ 
        width: '100%',
        maxWidth: '400px',
        backgroundColor: theme.colors.card,
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: theme.colors.primary, marginBottom: '20px', textAlign: 'center' }}>
          Red Social Universitaria
        </h1>
        
        <h3 style={{ color: theme.colors.text, marginBottom: '30px', textAlign: 'center' }}>
          Plataforma para estudiantes universitarios
        </h3>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <p style={{ color: theme.colors.text, marginBottom: '15px' }}>
            Bienvenido al prototipo de la red social universitaria. Para continuar:
          </p>
        </div>
        
        <button 
          onClick={handleDirectLogin}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: theme.colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            transition: 'background-color 0.3s ease'
          }}
        >
          Ingresar como Usuario de Prueba
        </button>
        
        <div style={{ 
          marginTop: '30px', 
          padding: '15px',
          borderTop: `1px solid ${theme.colors.border}`,
          textAlign: 'center'
        }}>
          <p style={{ 
            color: theme.colors.text, 
            fontSize: '14px'
          }}>
            Este es un prototipo de interfaz. En la versión final, aquí habrá opciones de registro e inicio de sesión completas.
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente para el módulo Académico
const AcademicModule = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('horario');
  
  // Datos de ejemplo para materias
  const materias = [
    { id: 1, codigo: 'INF-310', nombre: 'Desarrollo Web Avanzado', docente: 'Dr. Carlos Mendoza', grupo: 'A', horarios: [
      { dia: 'Lunes', inicio: '08:00', fin: '10:00', aula: 'Lab 3' },
      { dia: 'Miércoles', inicio: '08:00', fin: '10:00', aula: 'Lab 3' }
    ]},
    { id: 2, codigo: 'INF-315', nombre: 'Inteligencia Artificial', docente: 'Dra. Laura Espinoza', grupo: 'B', horarios: [
      { dia: 'Martes', inicio: '14:00', fin: '16:00', aula: '304' },
      { dia: 'Jueves', inicio: '14:00', fin: '16:00', aula: '304' }
    ]},
    { id: 3, codigo: 'INF-320', nombre: 'Desarrollo Móvil', docente: 'Ing. Roberto Salinas', grupo: 'A', horarios: [
      { dia: 'Lunes', inicio: '10:00', fin: '12:00', aula: 'Lab 5' },
      { dia: 'Viernes', inicio: '14:00', fin: '16:00', aula: 'Lab 5' }
    ]},
    { id: 4, codigo: 'MAT-250', nombre: 'Estadística para Informática', docente: 'Lic. Patricia Rojas', grupo: 'C', horarios: [
      { dia: 'Martes', inicio: '10:00', fin: '12:00', aula: '201' },
      { dia: 'Jueves', inicio: '10:00', fin: '12:00', aula: '201' }
    ]}
  ];
  
  // Datos de ejemplo para calificaciones
  const calificaciones = [
    { materia: 'INF-310', nombre: 'Desarrollo Web Avanzado', parcial1: 85, parcial2: 90, final: 88, promedio: 87.7 },
    { materia: 'INF-315', nombre: 'Inteligencia Artificial', parcial1: 78, parcial2: 85, final: 92, promedio: 85.0 },
    { materia: 'INF-320', nombre: 'Desarrollo Móvil', parcial1: 90, parcial2: 88, final: 95, promedio: 91.0 },
    { materia: 'MAT-250', nombre: 'Estadística para Informática', parcial1: 75, parcial2: 80, final: 82, promedio: 79.0 }
  ];
  
  // Función para generar horario semanal
  const renderHorarioSemanal = () => {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const horas = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
    
    // Organizar las clases por día y hora
    const horarioPorDia = {};
    dias.forEach(dia => {
      horarioPorDia[dia] = {};
    });
    
    materias.forEach(materia => {
      materia.horarios.forEach(horario => {
        if (!horarioPorDia[horario.dia][horario.inicio]) {
          horarioPorDia[horario.dia][horario.inicio] = [];
        }
        horarioPorDia[horario.dia][horario.inicio].push({
          materia: materia.nombre,
          codigo: materia.codigo,
          aula: horario.aula,
          inicio: horario.inicio,
          fin: horario.fin,
          docente: materia.docente
        });
      });
    });
    
    return (
      <div style={{ padding: '20px' }}>
        <h2 style={{ color: theme.colors.primary, marginBottom: '20px', textAlign: 'center' }}>Horario Semanal</h2>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            marginBottom: '20px',
            backgroundColor: theme.colors.card,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderRadius: theme.borderRadius.medium
          }}>
            <thead>
              <tr>
                <th style={{ 
                  padding: '15px', 
                  backgroundColor: theme.colors.primary, 
                  color: 'white',
                  border: `1px solid ${theme.colors.border}`
                }}>Hora</th>
                {dias.map(dia => (
                  <th key={dia} style={{ 
                    padding: '15px', 
                    backgroundColor: theme.colors.primary, 
                    color: 'white',
                    border: `1px solid ${theme.colors.border}`
                  }}>{dia}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {horas.map((hora, index) => (
                <tr key={hora}>
                  <td style={{ 
                    padding: '15px', 
                    backgroundColor: theme.colors.accent, 
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    border: `1px solid ${theme.colors.border}`
                  }}>{hora} - {index < horas.length - 1 ? horas[index + 1] : '20:00'}</td>
                  {dias.map(dia => {
                    const clase = horarioPorDia[dia][hora] ? horarioPorDia[dia][hora][0] : null;
                    return (
                      <td key={`${dia}-${hora}`} style={{ 
                        padding: '10px', 
                        backgroundColor: clase ? `${theme.colors.primary}20` : theme.colors.card,
                        border: `1px solid ${theme.colors.border}`,
                        position: 'relative'
                      }}>
                        {clase ? (
                          <div style={{
                            padding: '10px',
                            borderLeft: `4px solid ${theme.colors.primary}`,
                            backgroundColor: theme.colors.card,
                            borderRadius: theme.borderRadius.small,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                          }}>
                            <div style={{ fontWeight: 'bold', color: theme.colors.primary }}>{clase.materia}</div>
                            <div style={{ fontSize: '0.9rem', color: theme.colors.textLight }}>{clase.codigo}</div>
                            <div style={{ fontSize: '0.9rem' }}>Aula: {clase.aula}</div>
                            <div style={{ fontSize: '0.8rem', color: theme.colors.textLight }}>{clase.docente}</div>
                          </div>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          <button style={{
            padding: '10px 20px',
            backgroundColor: theme.colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: theme.borderRadius.medium,
            marginRight: '10px',
            cursor: 'pointer'
          }}>
            Exportar como PDF
          </button>
          <button style={{
            padding: '10px 20px',
            backgroundColor: theme.colors.info,
            color: 'white',
            border: 'none',
            borderRadius: theme.borderRadius.medium,
            cursor: 'pointer'
          }}>
            Exportar como Excel
          </button>
        </div>
      </div>
    );
  };
  
  // Función para mostrar las calificaciones
  const renderCalificaciones = () => {
    return (
      <div style={{ padding: '20px' }}>
        <h2 style={{ color: theme.colors.primary, marginBottom: '20px', textAlign: 'center' }}>Calificaciones</h2>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            marginBottom: '20px',
            backgroundColor: theme.colors.card,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderRadius: theme.borderRadius.medium
          }}>
            <thead>
              <tr>
                <th style={{ 
                  padding: '15px', 
                  backgroundColor: theme.colors.primary, 
                  color: 'white',
                  border: `1px solid ${theme.colors.border}`
                }}>Código</th>
                <th style={{ 
                  padding: '15px', 
                  backgroundColor: theme.colors.primary, 
                  color: 'white',
                  border: `1px solid ${theme.colors.border}`
                }}>Materia</th>
                <th style={{ 
                  padding: '15px', 
                  backgroundColor: theme.colors.primary, 
                  color: 'white',
                  border: `1px solid ${theme.colors.border}`
                }}>Parcial 1</th>
                <th style={{ 
                  padding: '15px', 
                  backgroundColor: theme.colors.primary, 
                  color: 'white',
                  border: `1px solid ${theme.colors.border}`
                }}>Parcial 2</th>
                <th style={{ 
                  padding: '15px', 
                  backgroundColor: theme.colors.primary, 
                  color: 'white',
                  border: `1px solid ${theme.colors.border}`
                }}>Examen Final</th>
                <th style={{ 
                  padding: '15px', 
                  backgroundColor: theme.colors.primary, 
                  color: 'white',
                  border: `1px solid ${theme.colors.border}`
                }}>Promedio</th>
                <th style={{ 
                  padding: '15px', 
                  backgroundColor: theme.colors.primary, 
                  color: 'white',
                  border: `1px solid ${theme.colors.border}`
                }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {calificaciones.map((calificacion, index) => (
                <tr key={calificacion.materia}>
                  <td style={{ 
                    padding: '15px', 
                    border: `1px solid ${theme.colors.border}`,
                    textAlign: 'center'
                  }}>{calificacion.materia}</td>
                  <td style={{ 
                    padding: '15px', 
                    border: `1px solid ${theme.colors.border}`
                  }}>{calificacion.nombre}</td>
                  <td style={{ 
                    padding: '15px', 
                    border: `1px solid ${theme.colors.border}`,
                    textAlign: 'center',
                    color: calificacion.parcial1 >= 60 ? theme.colors.success : theme.colors.notification
                  }}>{calificacion.parcial1}</td>
                  <td style={{ 
                    padding: '15px', 
                    border: `1px solid ${theme.colors.border}`,
                    textAlign: 'center',
                    color: calificacion.parcial2 >= 60 ? theme.colors.success : theme.colors.notification
                  }}>{calificacion.parcial2}</td>
                  <td style={{ 
                    padding: '15px', 
                    border: `1px solid ${theme.colors.border}`,
                    textAlign: 'center',
                    color: calificacion.final >= 60 ? theme.colors.success : theme.colors.notification
                  }}>{calificacion.final}</td>
                  <td style={{ 
                    padding: '15px', 
                    border: `1px solid ${theme.colors.border}`,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: calificacion.promedio >= 60 ? theme.colors.success : theme.colors.notification
                  }}>{calificacion.promedio}</td>
                  <td style={{ 
                    padding: '15px', 
                    border: `1px solid ${theme.colors.border}`,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: calificacion.promedio >= 60 ? theme.colors.success : theme.colors.notification
                  }}>{calificacion.promedio >= 60 ? 'APROBADO' : 'REPROBADO'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          <button style={{
            padding: '10px 20px',
            backgroundColor: theme.colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: theme.borderRadius.medium,
            marginRight: '10px',
            cursor: 'pointer'
          }}>
            Exportar Reporte
          </button>
          <button style={{
            padding: '10px 20px',
            backgroundColor: theme.colors.info,
            color: 'white',
            border: 'none',
            borderRadius: theme.borderRadius.medium,
            cursor: 'pointer'
          }}>
            Ver Gráfico de Rendimiento
          </button>
        </div>
        
        <div style={{
          backgroundColor: theme.colors.card,
          borderRadius: theme.borderRadius.medium,
          padding: '20px',
          marginTop: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: theme.colors.primary, marginBottom: '15px' }}>Promedio General</h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: theme.colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}>
              85.7
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Función para mostrar información de materias
  const renderMaterias = () => {
    return (
      <div style={{ padding: '20px' }}>
        <h2 style={{ color: theme.colors.primary, marginBottom: '20px', textAlign: 'center' }}>Mis Materias</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          {materias.map(materia => (
            <div key={materia.id} style={{
              backgroundColor: theme.colors.card,
              borderRadius: theme.borderRadius.medium,
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: `1px solid ${theme.colors.border}`
            }}>
              <div style={{
                backgroundColor: theme.colors.primary,
                color: 'white',
                padding: '10px 15px',
                borderRadius: theme.borderRadius.small,
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{ margin: 0 }}>{materia.codigo}</h3>
                <span>Grupo {materia.grupo}</span>
              </div>
              <h3 style={{ color: theme.colors.text, marginBottom: '10px' }}>{materia.nombre}</h3>
              <p style={{ color: theme.colors.textLight, marginBottom: '15px' }}>Docente: {materia.docente}</p>
              
              <h4 style={{ color: theme.colors.primary, marginBottom: '10px', borderBottom: `1px solid ${theme.colors.border}`, paddingBottom: '5px' }}>Horarios</h4>
              {materia.horarios.map((horario, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '5px',
                  padding: '5px',
                  backgroundColor: `${theme.colors.primary}10`,
                  borderRadius: theme.borderRadius.small
                }}>
                  <span>{horario.dia}</span>
                  <span>{horario.inicio} - {horario.fin}</span>
                  <span>Aula: {horario.aula}</span>
                </div>
              ))}
              
              <button style={{
                backgroundColor: theme.colors.info,
                color: 'white',
                border: 'none',
                borderRadius: theme.borderRadius.small,
                padding: '8px 15px',
                marginTop: '15px',
                cursor: 'pointer',
                width: '100%'
              }}>
                Ver detalles de la materia
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div>
      <div style={{
        backgroundColor: theme.colors.card,
        padding: '15px',
        borderRadius: theme.borderRadius.medium,
        margin: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '10px'
        }}>
          <button
            onClick={() => setActiveSection('horario')}
            style={{
              backgroundColor: activeSection === 'horario' ? theme.colors.primary : theme.colors.card,
              color: activeSection === 'horario' ? 'white' : theme.colors.text,
              border: 'none',
              padding: '10px 20px',
              margin: '0 10px',
              borderRadius: theme.borderRadius.small,
              cursor: 'pointer',
              fontWeight: activeSection === 'horario' ? 'bold' : 'normal'
            }}
          >
            Horario Semanal
          </button>
          <button
            onClick={() => setActiveSection('calificaciones')}
            style={{
              backgroundColor: activeSection === 'calificaciones' ? theme.colors.primary : theme.colors.card,
              color: activeSection === 'calificaciones' ? 'white' : theme.colors.text,
              border: 'none',
              padding: '10px 20px',
              margin: '0 10px',
              borderRadius: theme.borderRadius.small,
              cursor: 'pointer',
              fontWeight: activeSection === 'calificaciones' ? 'bold' : 'normal'
            }}
          >
            Calificaciones
          </button>
          <button
            onClick={() => setActiveSection('materias')}
            style={{
              backgroundColor: activeSection === 'materias' ? theme.colors.primary : theme.colors.card,
              color: activeSection === 'materias' ? 'white' : theme.colors.text,
              border: 'none',
              padding: '10px 20px',
              margin: '0 10px',
              borderRadius: theme.borderRadius.small,
              cursor: 'pointer',
              fontWeight: activeSection === 'materias' ? 'bold' : 'normal'
            }}
          >
            Mis Materias
          </button>
        </div>
      </div>
      
      {activeSection === 'horario' && renderHorarioSemanal()}
      {activeSection === 'calificaciones' && renderCalificaciones()}
      {activeSection === 'materias' && renderMaterias()}
    </div>
  );
};

// Componente para el módulo de Carpooling
const CarpoolingModule = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('rutas');
  
  // Datos de ejemplo para rutas de carpooling
  const rutas = [
    { 
      id: 1, 
      conductor: 'María López', 
      origen: 'Zona Sur', 
      destino: 'Campus Universidad', 
      horario: '07:30', 
      dias: ['Lunes', 'Miércoles', 'Viernes'],
      capacidad: 4,
      ocupados: 2,
      paradas: [
        { nombre: 'Plaza San Miguel', hora: '07:15' },
        { nombre: 'Avenida Las Américas', hora: '07:25' }
      ] 
    },
    { 
      id: 2, 
      conductor: 'Carlos Gutiérrez', 
      origen: 'Zona Norte', 
      destino: 'Campus Universidad', 
      horario: '08:00', 
      dias: ['Lunes', 'Martes', 'Jueves'],
      capacidad: 3,
      ocupados: 3,
      paradas: [
        { nombre: 'Plaza Principal', hora: '07:40' },
        { nombre: 'Parque Central', hora: '07:50' }
      ] 
    },
    { 
      id: 3, 
      conductor: 'Ana Martínez', 
      origen: 'Zona Este', 
      destino: 'Campus Universidad', 
      horario: '07:45', 
      dias: ['Martes', 'Jueves', 'Viernes'],
      capacidad: 4,
      ocupados: 1,
      paradas: [
        { nombre: 'Centro Comercial Este', hora: '07:30' },
        { nombre: 'Terminal de Buses', hora: '07:40' }
      ] 
    }
  ];
  
  // Función para mostrar listado de rutas disponibles
  const renderRutas = () => {
    return (
      <div style={{ padding: '20px' }}>
        <h2 style={{ color: theme.colors.primary, marginBottom: '20px', textAlign: 'center' }}>Rutas de Carpooling Disponibles</h2>
        
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '20px'
        }}>
          <button style={{
            backgroundColor: theme.colors.primary,
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: theme.borderRadius.small,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ marginRight: '5px' }}>+</span> Nueva Ruta
          </button>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {rutas.map(ruta => (
            <div key={ruta.id} style={{
              backgroundColor: theme.colors.card,
              borderRadius: theme.borderRadius.medium,
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <h3 style={{ color: theme.colors.primary, margin: 0 }}>{ruta.origen} → {ruta.destino}</h3>
                <span style={{ 
                  backgroundColor: ruta.ocupados < ruta.capacidad ? theme.colors.success : theme.colors.notification,
                  color: 'white',
                  padding: '3px 10px',
                  borderRadius: theme.borderRadius.small,
                  fontSize: '0.8rem'
                }}>
                  {ruta.ocupados < ruta.capacidad ? 'Disponible' : 'Completo'}
                </span>
              </div>
              
              <div style={{
                backgroundColor: `${theme.colors.primary}10`,
                padding: '15px',
                borderRadius: theme.borderRadius.small,
                marginBottom: '15px'
              }}>
                <div style={{ display: 'flex', marginBottom: '10px' }}>
                  <div style={{ 
                    width: '30px', 
                    height: '30px', 
                    borderRadius: '50%', 
                    backgroundColor: theme.colors.primary,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '10px',
                    fontWeight: 'bold'
                  }}>
                    {ruta.conductor.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{ruta.conductor}</div>
                    <div style={{ fontSize: '0.8rem', color: theme.colors.textLight }}>Conductor</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <div>
                    <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Horario:</span>
                    <span>{ruta.horario}</span>
                  </div>
                  <div>
                    <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Asientos:</span>
                    <span>{ruta.ocupados}/{ruta.capacidad}</span>
                  </div>
                </div>
                
                <div style={{ marginBottom: '5px' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Días:</span>
                  <span>{ruta.dias.join(', ')}</span>
                </div>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <h4 style={{ 
                  color: theme.colors.primary, 
                  borderBottom: `1px solid ${theme.colors.border}`,
                  paddingBottom: '5px',
                  marginBottom: '10px'
                }}>Paradas</h4>
                
                {ruta.paradas.map((parada, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '5px',
                    padding: '5px',
                    backgroundColor: index % 2 === 0 ? `${theme.colors.primary}10` : 'transparent',
                    borderRadius: theme.borderRadius.small
                  }}>
                    <span>{parada.nombre}</span>
                    <span>{parada.hora}</span>
                  </div>
                ))}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button style={{
                  backgroundColor: theme.colors.info,
                  color: 'white',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: theme.borderRadius.small,
                  cursor: 'pointer'
                }}>
                  Ver en mapa
                </button>
                
                <button style={{
                  backgroundColor: theme.colors.info,
                  color: 'white',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: theme.borderRadius.small,
                  cursor: 'pointer'
                }}>
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Función para mostrar mapa de rutas
  const renderMapa = () => {
    return (
      <div style={{ padding: '20px' }}>
        <h2 style={{ color: theme.colors.primary, marginBottom: '20px', textAlign: 'center' }}>Mapa de Rutas</h2>
        
        <div style={{
          backgroundColor: theme.colors.card,
          borderRadius: theme.borderRadius.medium,
          padding: '10px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <input 
            type="text"
            placeholder="Buscar por ubicación o nombre de ruta"
            style={{
              padding: '10px 15px',
              borderRadius: theme.borderRadius.small,
              border: `1px solid ${theme.colors.border}`,
              width: '100%',
              maxWidth: '500px'
            }}
          />
          <button style={{
            backgroundColor: theme.colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: theme.borderRadius.small,
            padding: '10px 15px',
            marginLeft: '10px',
            cursor: 'pointer'
          }}>
            Buscar
          </button>
        </div>
        
        <div style={{
          backgroundColor: '#e9e9e9', // Color del mapa base
          height: '500px',
          borderRadius: theme.borderRadius.medium,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: theme.borderRadius.small,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 10
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Leyenda</div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
              <div style={{ 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%', 
                backgroundColor: theme.colors.primary, 
                marginRight: '5px' 
              }}></div>
              <span>Punto de origen</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
              <div style={{ 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%', 
                backgroundColor: theme.colors.info, 
                marginRight: '5px' 
              }}></div>
              <span>Parada</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%', 
                backgroundColor: theme.colors.success, 
                marginRight: '5px' 
              }}></div>
              <span>Destino (Universidad)</span>
            </div>
          </div>
          
          {/* Aquí iría un componente de mapa real (como Google Maps o Mapbox) */}
          <div style={{ textAlign: 'center', color: '#666' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🗺️</div>
            <div>Aquí se mostraría el mapa con las rutas disponibles</div>
            <div style={{ marginTop: '10px', fontSize: '0.9rem' }}>(Se implementará con Google Maps o Mapbox)</div>
          </div>
        </div>
      </div>
    );
  };
  
  // La sección "Mis Rutas" se maneja en la aplicación móvil
  const renderMisRutas = () => {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2 style={{ color: theme.colors.primary, marginBottom: '20px' }}>Mis Rutas</h2>
        <p style={{ fontSize: '16px', marginBottom: '30px' }}>Esta funcionalidad está disponible exclusivamente en la aplicación móvil</p>
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '30px'
        }}>
          <span style={{ fontSize: '64px', marginBottom: '20px' }}>📱</span>
          <p>Descarga la app para gestionar tus rutas como conductor o pasajero</p>
        </div>
      </div>
    );
  };

  const renderComoPasajero = () => {
    return (
      <div>
        <h3 style={{ color: theme.colors.text, marginBottom: '15px' }}>Como Pasajero</h3>

        <div style={{
          backgroundColor: theme.colors.card,
            borderRadius: theme.borderRadius.medium,
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '15px'
            }}>
              <h3 style={{ color: theme.colors.primary, margin: 0 }}>Zona Este → Campus Universidad</h3>
              <span style={{ 
                backgroundColor: theme.colors.success,
                color: 'white',
                padding: '3px 10px',
                borderRadius: theme.borderRadius.small,
                fontSize: '0.8rem'
              }}>
                Confirmado
              </span>
            </div>
            
            <div style={{
              backgroundColor: `${theme.colors.primary}10`,
              padding: '15px',
              borderRadius: theme.borderRadius.small,
              marginBottom: '15px'
            }}>
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ 
                  width: '30px', 
                  height: '30px', 
                  borderRadius: '50%', 
                  backgroundColor: theme.colors.primary,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  fontWeight: 'bold'
                }}>A</div>
                <div>
                  <div style={{ fontWeight: 'bold' }}>Ana Martínez</div>
                  <div style={{ fontSize: '0.8rem', color: theme.colors.textLight }}>Conductor</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <div>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Horario:</span>
                  <span>07:45</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Días:</span>
                  <span>Martes, Jueves, Viernes</span>
                </div>
              </div>
              
              <div>
                <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Te recogerá en:</span>
                <span>Centro Comercial Este (07:30)</span>
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <button style={{
                backgroundColor: theme.colors.notification,
                color: 'white',
                border: 'none',
                padding: '8px 15px',
                borderRadius: theme.borderRadius.small,
                cursor: 'pointer'
              }}>
                Cancelar participación
              </button>
            </div>
          </div>
      </div>
    );
  };
  
  return (
    <div>
      <div style={{
        backgroundColor: theme.colors.card,
        padding: '15px',
        borderRadius: theme.borderRadius.medium,
        margin: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '10px'
        }}>
          <button
            onClick={() => setActiveSection('rutas')}
            style={{
              backgroundColor: activeSection === 'rutas' ? theme.colors.primary : theme.colors.card,
              color: activeSection === 'rutas' ? 'white' : theme.colors.text,
              border: 'none',
              padding: '10px 20px',
              margin: '0 10px',
              borderRadius: theme.borderRadius.small,
              cursor: 'pointer',
              fontWeight: activeSection === 'rutas' ? 'bold' : 'normal'
            }}
          >
            Rutas Disponibles
          </button>
          <button
            onClick={() => setActiveSection('mapa')}
            style={{
              backgroundColor: activeSection === 'mapa' ? theme.colors.primary : theme.colors.card,
              color: activeSection === 'mapa' ? 'white' : theme.colors.text,
              border: 'none',
              padding: '10px 20px',
              margin: '0 10px',
              borderRadius: theme.borderRadius.small,
              cursor: 'pointer',
              fontWeight: activeSection === 'mapa' ? 'bold' : 'normal'
            }}
          >
            Ver Mapa
          </button>

        </div>
      </div>
      
      {activeSection === 'rutas' && renderRutas()}
      {activeSection === 'mapa' && renderMapa()}
    </div>
  );
};

// Componente principal de la aplicación
const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};
// Contenido de la aplicación con acceso a los contextos
const AppContent = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('social');
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: theme.colors.background,
      color: theme.colors.text
    }}>
      <Header />
      
      {user ? (
        <>
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {activeTab === 'social' && <SocialModule />}
          {activeTab === 'academic' && <AcademicModule />}
          {activeTab === 'carpooling' && <CarpoolingModule />}
        </>
      ) : (
        <LoginForm />
      )}
      
      <footer style={{ 
        backgroundColor: theme.colors.card,
        padding: '16px',
        textAlign: 'center',
        color: theme.colors.text,
        borderTop: `1px solid ${theme.colors.border}`,
        marginTop: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
          <img 
            src="https://storage.googleapis.com/copilot-img-chat/6fc0e9ae-dbf9-432d-9b5f-b5e9fc07c605.png" 
            alt="Universidad del Valle Bolivia" 
            style={{ height: '40px', marginRight: '10px' }}
          />
          <span style={{ fontWeight: 'bold' }}>Universidad del Valle Bolivia</span>
        </div>
        <div>Red Social Universitaria © 2025 - Todos los derechos reservados</div>
      </footer>
    </div>
  );
};

export default App;

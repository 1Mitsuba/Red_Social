import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import '../styles/SettingsModule.css';

const SettingsModule = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  
  // Estados para las secciones de configuración
  const [activeTab, setActiveTab] = useState('cuenta');
  
  // Datos simulados del usuario
  const userData = user || {
    nombre: 'Usuario',
    apellido: 'Ejemplo',
    correo: 'usuario@example.com',
    rol: 'estudiante',
    carrera: 'Ingeniería en Sistemas',
    semestre: 5
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <div className="settings-logo">RSU</div>
        <h2 className="settings-title">Configuración</h2>
      </div>
      
      <div className="settings-content">
        <div className="settings-sidebar">
          <div 
            className={`settings-nav-item ${activeTab === 'cuenta' ? 'active' : ''}`}
            onClick={() => setActiveTab('cuenta')}
          >
            <span className="settings-nav-item-icon">🔑</span>
            Cuenta
          </div>
          <div 
            className={`settings-nav-item ${activeTab === 'apariencia' ? 'active' : ''}`}
            onClick={() => setActiveTab('apariencia')}
          >
            <span className="settings-nav-item-icon">🎨</span>
            Apariencia
          </div>
          <div 
            className={`settings-nav-item ${activeTab === 'notificaciones' ? 'active' : ''}`}
            onClick={() => setActiveTab('notificaciones')}
          >
            <span className="settings-nav-item-icon">🔔</span>
            Notificaciones
          </div>
          <div 
            className={`settings-nav-item ${activeTab === 'privacidad' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacidad')}
          >
            <span className="settings-nav-item-icon">🔒</span>
            Privacidad
          </div>
          <div 
            className="settings-nav-item"
            onClick={logout}
            style={{ marginTop: '30px', color: '#ff6b6b' }}
          >
            <span className="settings-nav-item-icon">🚪</span>
            Cerrar Sesión
          </div>
        </div>
        
        <div className="settings-main">
          {activeTab === 'apariencia' && (
            <div className="settings-section">
              <h3 className="settings-section-title">Apariencia</h3>
              
              <div>
                <h4 style={{color: 'rgba(255, 255, 255, 0.8)', marginBottom: '15px'}}>Tema</h4>
                
                <div className="theme-options">
                  <div className={`theme-option light-theme ${!theme.isDarkMode ? 'active' : ''}`} onClick={() => !theme.isDarkMode || toggleTheme()}>
                    <div className="theme-preview">
                      <div style={{
                        width: '80%',
                        height: '70%',
                        background: '#ffffff',
                        borderRadius: '4px',
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        <div style={{height: '20%', background: '#f0f0f0', borderBottom: '1px solid #e0e0e0'}}></div>
                        <div style={{padding: '5px', display: 'flex', flexDirection: 'column', gap: '3px'}}>
                          <div style={{height: '8px', width: '70%', background: '#e0e0e0', borderRadius: '2px'}}></div>
                          <div style={{height: '8px', width: '50%', background: '#e0e0e0', borderRadius: '2px'}}></div>
                        </div>
                      </div>
                    </div>
                    <p>Tema Claro</p>
                    {!theme.isDarkMode && <div className="theme-check">✓</div>}
                  </div>
                  
                  <div className={`theme-option dark-theme ${theme.isDarkMode ? 'active' : ''}`} onClick={() => theme.isDarkMode || toggleTheme()}>
                    <div className="theme-preview">
                      <div style={{
                        width: '80%',
                        height: '70%',
                        background: '#2d2d35',
                        borderRadius: '4px',
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        <div style={{height: '20%', background: '#1e1e24', borderBottom: '1px solid #3a3a43'}}></div>
                        <div style={{padding: '5px', display: 'flex', flexDirection: 'column', gap: '3px'}}>
                          <div style={{height: '8px', width: '70%', background: '#3a3a43', borderRadius: '2px'}}></div>
                          <div style={{height: '8px', width: '50%', background: '#3a3a43', borderRadius: '2px'}}></div>
                        </div>
                      </div>
                    </div>
                    <p>Tema Oscuro</p>
                    {theme.isDarkMode && <div className="theme-check">✓</div>}
                  </div>
                  
                  <div className="theme-option colorful-theme">
                    <div className="theme-preview">
                      <div style={{
                        width: '80%',
                        height: '70%',
                        background: 'linear-gradient(135deg, #2d2d35 0%, #2d3e76 100%)',
                        borderRadius: '4px',
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        <div style={{height: '20%', background: 'linear-gradient(135deg, #1e1e24 0%, #9c2766 100%)', borderBottom: '1px solid #9c2766'}}></div>
                        <div style={{padding: '5px', display: 'flex', flexDirection: 'column', gap: '3px'}}>
                          <div style={{height: '8px', width: '70%', background: 'rgba(255,255,255,0.2)', borderRadius: '2px'}}></div>
                          <div style={{height: '8px', width: '50%', background: 'rgba(255,255,255,0.2)', borderRadius: '2px'}}></div>
                        </div>
                      </div>
                    </div>
                    <p>Colorido (Próximamente)</p>
                  </div>
                </div>
                
                <div style={{marginTop: '30px'}}>
                  <h4 style={{color: 'rgba(255, 255, 255, 0.8)', marginBottom: '15px'}}>Tamaño de texto</h4>
                  <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                    <span style={{fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)'}}>A</span>
                    <input 
                      type="range" 
                      min="1" 
                      max="5" 
                      defaultValue="3" 
                      style={{flex: 1, accentColor: '#9c2766'}}
                    />
                    <span style={{fontSize: '18px', color: 'rgba(255, 255, 255, 0.6)'}}>A</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'cuenta' && (
            <div className="settings-section">
              <h3 className="settings-section-title">Seguridad de la Cuenta</h3>
              
              <div className="password-change">
                <h4 style={{color: 'rgba(255, 255, 255, 0.8)', marginBottom: '15px'}}>Cambiar Contraseña</h4>
                
                <div className="form-group">
                  <label htmlFor="current-password">Contraseña Actual</label>
                  <input type="password" id="current-password" className="form-control" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="new-password">Nueva Contraseña</label>
                  <input type="password" id="new-password" className="form-control" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirm-password">Confirmar Nueva Contraseña</label>
                  <input type="password" id="confirm-password" className="form-control" />
                </div>
                
                <button 
                  className="save-changes-btn"
                >
                  Actualizar Contraseña
                </button>
              </div>
            </div>
          )}
          
          {(activeTab === 'notificaciones' || activeTab === 'privacidad') && (
            <div className="settings-section">
              <h3 className="settings-section-title">{activeTab === 'notificaciones' ? 'Configuración de Notificaciones' : 'Configuración de Privacidad'}</h3>
              
              <div>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <div>
                      <div style={{fontSize: '15px', color: 'white', marginBottom: '4px'}}>
                        {activeTab === 'notificaciones' ? 
                          `Notificaciones de ${['mensajes', 'publicaciones', 'comentarios', 'eventos'][i-1]}` : 
                          `${['Perfil público', 'Mostrar estado', 'Permitir mensajes', 'Actividad visible'][i-1]}`}
                      </div>
                      <div style={{fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)'}}>
                        {activeTab === 'notificaciones' ? 
                          `Recibir notificaciones cuando recibas nuevos ${['mensajes', 'publicaciones', 'comentarios', 'eventos'][i-1]}` : 
                          `Controla quién puede ver tu ${['perfil', 'estado en línea', 'enviarte mensajes', 'actividad reciente'][i-1]}`}
                      </div>
                    </div>
                    <label style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: '50px',
                      height: '28px'
                    }}>
                      <input type="checkbox" defaultChecked={i % 2 === 0} style={{opacity: 0, width: 0, height: 0}} />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: i % 2 === 0 ? '#9c2766' : 'rgba(255, 255, 255, 0.3)',
                        borderRadius: '34px',
                        transition: '.4s'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '""',
                          height: '20px',
                          width: '20px',
                          left: i % 2 === 0 ? '26px' : '4px',
                          bottom: '4px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          transition: '.4s'
                        }}></span>
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModule;
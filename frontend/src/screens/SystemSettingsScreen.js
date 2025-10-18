import React, { useState } from 'react';
import Card from '../components/Card';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import SettingsModule from '../components/SettingsModule';
import ProfileSettingsModule from '../components/ProfileSettingsModule';
import UserProfileModule from '../components/UserProfileModule';
import '../styles/SystemSettings.css';

/**
 * Pantalla de configuración del sistema
 */
const SystemSettingsScreen = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [activeModule, setActiveModule] = useState('settings'); // 'settings' o 'profile'

  // Botón para cambiar entre configuración y perfil
  const toggleModule = () => {
    setActiveModule(activeModule === 'settings' ? 'profile' : 'settings');
  };

  // Decidir qué renderizar: la configuración o el perfil
  const renderActiveModule = () => {
    switch (activeModule) {
      case 'settings':
        return <ProfileSettingsModule />;
      case 'profile':
        return <UserProfileModule />;
      default:
        return <ProfileSettingsModule />;
    }
  };
  
  // Usar módulos con diseño moderno
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        marginBottom: '10px'
      }}>
        <button 
          onClick={toggleModule}
          style={{
            backgroundColor: '#E75A7C',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '8px 15px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {activeModule === 'settings' ? 'Ver Perfil' : 'Ver Configuración'}
        </button>
      </div>
      
      {renderActiveModule()}
    </div>
  );
  
  return (
    <div className="system-settings-container">
      <div className="settings-header">
        <h1>Configuración del Sistema</h1>
      </div>
      
      <div className="settings-tabs">
        <div 
          className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          General
        </div>
        <div 
          className={`settings-tab ${activeTab === 'modulos' ? 'active' : ''}`}
          onClick={() => setActiveTab('modulos')}
        >
          Módulos
        </div>
        <div 
          className={`settings-tab ${activeTab === 'apariencia' ? 'active' : ''}`}
          onClick={() => setActiveTab('apariencia')}
        >
          Apariencia
        </div>
      </div>
      
      <div className="settings-content">
        <Card className="settings-section">
          <h2>Apariencia</h2>
          <div className="settings-group">
            <div className="setting-item">
              <span>Color principal:</span>
              <div className="color-options">
                <div className="color-option active" style={{backgroundColor: '#8B1E41'}}></div>
                <div className="color-option" style={{backgroundColor: '#1E628B'}}></div>
                <div className="color-option" style={{backgroundColor: '#1E8B38'}}></div>
                <div className="color-option" style={{backgroundColor: '#8B8B1E'}}></div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="settings-section">
          <h2>Configuración General</h2>
          <div className="settings-group">
            <div className="setting-item">
              <span>Nombre de la Institución:</span>
              <FormInput 
                value="Universidad del Valle"
                onChange={() => {}}
              />
            </div>
            
            <div className="setting-item">
              <span>URL del Logo:</span>
              <FormInput 
                value="https://example.com/logo.png"
                onChange={() => {}}
              />
            </div>
            
            <div className="setting-item">
              <span>Correo de Soporte:</span>
              <FormInput 
                value="soporte@univalle.edu"
                onChange={() => {}}
              />
            </div>
            
            <div className="setting-item">
              <span>Año Académico Actual:</span>
              <FormInput 
                value="2023"
                onChange={() => {}}
              />
            </div>
          </div>
          
          <div className="setting-actions">
            <Button>Guardar Cambios</Button>
          </div>
        </Card>
        
        <Card className="settings-section">
          <h2>Módulos del Sistema</h2>
          <div className="module-settings">
            <div className="module-item">
              <div className="module-header">
                <h3>Módulo Académico</h3>
                <label className="switch">
                  <input type="checkbox" checked={true} onChange={() => {}} />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="module-features">
                <div className="feature-item">
                  <span>Inscripción de Materias</span>
                  <label className="switch">
                    <input type="checkbox" checked={true} onChange={() => {}} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="feature-item">
                  <span>Calificaciones</span>
                  <label className="switch">
                    <input type="checkbox" checked={true} onChange={() => {}} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="feature-item">
                  <span>Horarios</span>
                  <label className="switch">
                    <input type="checkbox" checked={true} onChange={() => {}} />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="module-item">
              <div className="module-header">
                <h3>Módulo Social</h3>
                <label className="switch">
                  <input type="checkbox" checked={true} onChange={() => {}} />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="module-features">
                <div className="feature-item">
                  <span>Publicaciones</span>
                  <label className="switch">
                    <input type="checkbox" checked={true} onChange={() => {}} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="feature-item">
                  <span>Eventos</span>
                  <label className="switch">
                    <input type="checkbox" checked={true} onChange={() => {}} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="feature-item">
                  <span>Comentarios</span>
                  <label className="switch">
                    <input type="checkbox" checked={true} onChange={() => {}} />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="module-item">
              <div className="module-header">
                <h3>Módulo Carpooling</h3>
                <label className="switch">
                  <input type="checkbox" checked={true} onChange={() => {}} />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="module-features">
                <div className="feature-item">
                  <span>Creación de Rutas</span>
                  <label className="switch">
                    <input type="checkbox" checked={true} onChange={() => {}} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="feature-item">
                  <span>Reserva de Asientos</span>
                  <label className="switch">
                    <input type="checkbox" checked={true} onChange={() => {}} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="feature-item">
                  <span>Calificación de Conductores</span>
                  <label className="switch">
                    <input type="checkbox" checked={true} onChange={() => {}} />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="setting-actions">
            <Button>Guardar Configuración de Módulos</Button>
          </div>
        </Card>
        
        <Card className="settings-section">
          <h2>Seguridad</h2>
          <div className="settings-group">
            <div className="setting-item">
              <span>Tiempo de Caducidad de Sesión (minutos):</span>
              <FormInput 
                type="number"
                value="30"
                onChange={() => {}}
              />
            </div>
            
            <div className="setting-item">
              <span>Intentos Máximos de Inicio de Sesión:</span>
              <FormInput 
                type="number"
                value="5"
                onChange={() => {}}
              />
            </div>
            
            <div className="setting-item">
              <span>Forzar Cambio de Contraseña (días):</span>
              <FormInput 
                type="number"
                value="90"
                onChange={() => {}}
              />
            </div>
            
            <div className="setting-item">
              <span>Autenticación en Dos Pasos:</span>
              <label className="switch">
                <input type="checkbox" checked={true} onChange={() => {}} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          
          <div className="setting-actions">
            <Button>Guardar Configuración de Seguridad</Button>
          </div>
        </Card>
        
        <Card className="settings-section">
          <h2>Base de Datos</h2>
          <div className="database-actions">
            <Button>Respaldar Base de Datos</Button>
            <Button variant="outline">Restaurar Base de Datos</Button>
            <Button variant="secondary">Optimizar Base de Datos</Button>
            <Button variant="danger">Limpiar Datos Temporales</Button>
          </div>
          
          <div className="database-stats">
            <h3>Estadísticas</h3>
            <div className="stats-container">
              <div className="stat-item">
                <span>Tamaño Total:</span>
                <strong>245.8 MB</strong>
              </div>
              <div className="stat-item">
                <span>Número de Tablas:</span>
                <strong>21</strong>
              </div>
              <div className="stat-item">
                <span>Último Respaldo:</span>
                <strong>2023-07-15 08:30:24</strong>
              </div>
              <div className="stat-item">
                <span>Versión PostgreSQL:</span>
                <strong>15.3</strong>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="settings-section">
          <h2>Notificaciones</h2>
          <div className="notification-settings">
            <div className="setting-item">
              <span>Notificaciones por Correo:</span>
              <label className="switch">
                <input type="checkbox" checked={true} onChange={() => {}} />
                <span className="slider round"></span>
              </label>
            </div>
            
            <div className="setting-item">
              <span>Notificaciones Push:</span>
              <label className="switch">
                <input type="checkbox" checked={true} onChange={() => {}} />
                <span className="slider round"></span>
              </label>
            </div>
            
            <h3>Configuración de Tipos de Notificaciones</h3>
            <div className="notification-types">
              <div className="notification-type-item">
                <span>Académicas</span>
                <label className="switch">
                  <input type="checkbox" checked={true} onChange={() => {}} />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="notification-type-item">
                <span>Sociales</span>
                <label className="switch">
                  <input type="checkbox" checked={true} onChange={() => {}} />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="notification-type-item">
                <span>Carpooling</span>
                <label className="switch">
                  <input type="checkbox" checked={true} onChange={() => {}} />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="notification-type-item">
                <span>Sistema</span>
                <label className="switch">
                  <input type="checkbox" checked={true} onChange={() => {}} />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="setting-actions">
            <Button>Guardar Configuración de Notificaciones</Button>
            <Button variant="outline">Enviar Notificación de Prueba</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SystemSettingsScreen;
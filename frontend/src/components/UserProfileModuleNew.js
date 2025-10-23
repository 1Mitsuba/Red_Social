import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import '../styles/UserProfileModuleNew.css';

const UserProfileModuleNew = ({ onClose }) => {
  const { theme, isDarkMode } = useTheme();
  const { user } = useAuth();
  const profileRef = useRef(null);
  const menuRef = useRef(null);
  
  // Estado para los datos del usuario
  const [userData, setUserData] = useState({
    nombre: user?.nombre || 'Usuario de Prueba',
    apellido: user?.apellido || '',
    correo: user?.correo || 'usuario@ejemplo.com',
    rol: user?.rol || 'estudiante',
    carrera: user?.carrera || 'Informática',
    semestre: user?.semestre || '5',
  });

  // Estado para las secciones del perfil y menú desplegable
  const [activeTab, setActiveTab] = useState('publicaciones');
  const [menuVisible, setMenuVisible] = useState(false);
  
  // Efecto para cerrar el modal con la tecla ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) { // Código de tecla ESC
        onClose();
      }
    };
    
    // Maneja clics fuera del menú para cerrarlo
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);
    
    // Aplicar estilos CSS variables basados en el tema
    document.documentElement.style.setProperty('--header-bg', 
      'linear-gradient(135deg, #8B1E41, #AD3F62)'); // Mantenemos el color institucional en ambos temas
    
    // No es necesario redefinir estas propiedades, usaremos las variables globales definidas en ThemeController
    /*document.documentElement.style.setProperty('--profile-bg-color', 
      isDarkMode ? theme.colors.card : '#FFFFFF');
    document.documentElement.style.setProperty('--content-bg', 
      isDarkMode ? theme.colors.background : '#f5f5f7');
    document.documentElement.style.setProperty('--profile-text-color', 
      isDarkMode ? '#FFFFFF' : theme.colors.text);*/
      
    // Solo mantenemos estilos específicos del perfil
    document.documentElement.style.setProperty('--profile-border-color', 
      isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)');
    document.documentElement.style.setProperty('--profile-bg-card', 
      isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF');
    document.documentElement.style.setProperty('--post-bg', 
      isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#fff');
    document.documentElement.style.setProperty('--pill-bg', 
      isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#f0f0f0');
    document.documentElement.style.setProperty('--pill-text', 
      isDarkMode ? 'rgba(255, 255, 255, 0.7)' : '#666');
    document.documentElement.style.setProperty('--empty-state-color', 
      isDarkMode ? '#999' : '#888');
      
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, theme, isDarkMode]);
  
  // Iniciales del usuario
  const getUserInitials = () => {
    return (userData.nombre?.charAt(0) + (userData.apellido?.charAt(0) || '')).toUpperCase() || 'US';
  };

  return (
    <div className="user-profile-container-new">
      {/* Sección superior con gradiente de color institucional */}
      <div className="profile-header-new">
        <div className="camera-icon">
          📷
        </div>
        
        <div className="search-bar-new">
          <div className="search-dot"></div>
          <input type="text" placeholder="Buscar..." />
        </div>
        
        <div className="user-avatar-new">
          {getUserInitials()}
        </div>
      </div>
      
      {/* Sección inferior */}
      <div className="profile-content-new">
        <div className="user-info-section">
          <h2 className="user-name">{`${userData.nombre} ${userData.apellido}`}</h2>
          <p className="user-email">{userData.correo}</p>
          <p className="user-role">{userData.rol} • {userData.carrera} • {userData.semestre}° semestre</p>
        </div>
        
      {/* Categorías */}
      <div className="profile-categories-new">
        <div 
          className={`category-pill ${activeTab === 'publicaciones' ? 'active' : ''}`}
          onClick={() => setActiveTab('publicaciones')}
        >
          Publicaciones
        </div>
        <div 
          className={`category-pill ${activeTab === 'amigos' ? 'active' : ''}`}
          onClick={() => setActiveTab('amigos')}
        >
          Amigos
        </div>
        <div 
          className={`category-pill ${activeTab === 'fotos' ? 'active' : ''}`}
          onClick={() => setActiveTab('fotos')}
        >
          Fotos
        </div>
        <div 
          className={`category-pill ${activeTab === 'actividad' ? 'active' : ''}`}
          onClick={() => setActiveTab('actividad')}
        >
          Actividad
        </div>
      </div>        {/* Contenido según la pestaña seleccionada */}
        <div className="tab-content">
          {activeTab === 'publicaciones' && (
            <div className="publicaciones-content">
              <div className="post-item">
                <div className="post-header">
                  <div className="post-avatar">{getUserInitials()}</div>
                  <div className="post-info">
                    <div className="post-author">{`${userData.nombre} ${userData.apellido}`}</div>
                    <div className="post-time">Hace 2 horas</div>
                  </div>
                </div>
                <div className="post-content">
                  Ejemplo de publicación en la red social universitaria. ¡Compartiendo conocimientos con mis compañeros!
                </div>
                <div className="post-actions">
                  <button className="post-action-btn">👍 Like</button>
                  <button className="post-action-btn">💬 Comentar</button>
                  <button className="post-action-btn">↗️ Compartir</button>
                </div>
              </div>
              
              <div className="post-item">
                <div className="post-header">
                  <div className="post-avatar">{getUserInitials()}</div>
                  <div className="post-info">
                    <div className="post-author">{`${userData.nombre} ${userData.apellido}`}</div>
                    <div className="post-time">Hace 5 horas</div>
                  </div>
                </div>
                <div className="post-content">
                  ¡Acabo de encontrar un excelente recurso para preparar el examen de Bases de Datos! ¿Alguien más está estudiando para el parcial? #estudiando #informatica
                </div>
                <div className="post-actions">
                  <button className="post-action-btn">👍 Like</button>
                  <button className="post-action-btn">💬 Comentar</button>
                  <button className="post-action-btn">↗️ Compartir</button>
                </div>
              </div>
              
              <div className="post-item">
                <div className="post-header">
                  <div className="post-avatar">{getUserInitials()}</div>
                  <div className="post-info">
                    <div className="post-author">{`${userData.nombre} ${userData.apellido}`}</div>
                    <div className="post-time">Hace 1 día</div>
                  </div>
                </div>
                <div className="post-content">
                  Buscando compañeros para el proyecto final de Ingeniería de Software. Necesitamos 2 personas más que sepan React y Node.js. Interesados escriban en comentarios.
                </div>
                <div className="post-actions">
                  <button className="post-action-btn">👍 Like</button>
                  <button className="post-action-btn">💬 Comentar</button>
                  <button className="post-action-btn">↗️ Compartir</button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'amigos' && (
            <div className="amigos-content">
              <p className="empty-state">No hay amigos para mostrar</p>
            </div>
          )}
          
          {activeTab === 'fotos' && (
            <div className="fotos-content">
              <p className="empty-state">No hay fotos para mostrar</p>
            </div>
          )}
          
          {activeTab === 'actividad' && (
            <div className="actividad-content">
              <p className="empty-state">No hay actividad reciente</p>
            </div>
          )}
        </div>
        
        {/* Barra de navegación inferior */}
        <div className="bottom-nav-new">
          <div className="menu-container" ref={menuRef}>
            <div className="menu-icon" onClick={() => setMenuVisible(!menuVisible)}>≡</div>
            
            {/* Menú desplegable */}
            {menuVisible && (
              <div className="dropdown-menu">
                <div className="menu-item" onClick={() => {
                  setMenuVisible(false);
                  console.log('Configuración seleccionada');
                }}>
                  <div className="menu-item-icon">⚙️</div>
                  <div className="menu-item-text">Configuración</div>
                </div>
                <div className="menu-item" onClick={() => {
                  setMenuVisible(false);
                  console.log('Editar perfil seleccionado');
                }}>
                  <div className="menu-item-icon">👤</div>
                  <div className="menu-item-text">Editar perfil</div>
                </div>
                <div className="menu-item" onClick={() => {
                  setMenuVisible(false);
                  console.log('Privacidad seleccionada');
                }}>
                  <div className="menu-item-icon">🔒</div>
                  <div className="menu-item-text">Privacidad</div>
                </div>
                <div className="menu-item" onClick={() => {
                  setMenuVisible(false);
                  console.log('Ayuda seleccionada');
                }}>
                  <div className="menu-item-icon">❓</div>
                  <div className="menu-item-text">Ayuda</div>
                </div>
              </div>
            )}
          </div>
          
          {/* Botón de acción flotante */}
          <div className="action-button-new" onClick={() => alert('Crear nueva publicación')}>
            +
          </div>
          
          {/* Botón OK */}
          <div className="ok-button" onClick={onClose}>
            Ok
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModuleNew;

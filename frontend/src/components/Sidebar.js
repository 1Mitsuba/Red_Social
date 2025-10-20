import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import UserProfileModuleNew from './UserProfileModuleNew';
import './SidebarOverride.css';

const Sidebar = ({ onModuleChange, activeModule: externalActiveModule }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  // Usar el activeModule pasado como prop, o 'social' si no se proporciona
  const [activeModule, setActiveModule] = useState(externalActiveModule || 'social');
  // Estado para controlar si se muestra el perfil
  const [showProfile, setShowProfile] = useState(false);
  
  // Iconos de navegación para los módulos principales - solo iconos sin texto
  const navIcons = [
    { id: 'social', icon: '💬', tooltip: 'Social' },
    { id: 'academic', icon: '🎓', tooltip: 'Académico' },
    { id: 'carpooling', icon: '🚗', tooltip: 'Carpooling' },
    { id: 'messages', icon: '✉️', tooltip: 'Mensajes' },
    { id: 'notifications', icon: '🔔', tooltip: 'Notificaciones' },
    { id: 'settings', icon: '⚙️', tooltip: 'Ajustes' },
  ];

  const handleModuleChange = (moduleId) => {
    setActiveModule(moduleId);
    if (onModuleChange) {
      onModuleChange(moduleId);
    }
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <>
      <div className="sidebar">
        <div 
          className="sidebar-logo" 
          style={{ backgroundColor: 'rgb(139, 30, 65)' }}
          onClick={toggleProfile}
          title="Ver perfil"
        >
          RSU
        </div>
        <div className="sidebar-nav">
          {navIcons.map((item) => (
            <div 
              key={item.id} 
              className={`nav-icon ${activeModule === item.id ? 'active' : ''}`}
              onClick={() => handleModuleChange(item.id)}
              title={item.tooltip}
            >
              {item.icon}
              <div className="nav-tooltip">{item.tooltip}</div>
            </div>
          ))}
        </div>
        <div className="sidebar-footer">
          <img 
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.nombre || 'Usuario'}&background=cf2e68`} 
            alt={user?.nombre || "Perfil"} 
            className="profile-img"
            onClick={toggleProfile}
            title="Ver perfil"
          />
        </div>
      </div>

      {/* Overlay y componente de perfil como modal centrado */}
      {showProfile && (
        <div className="profile-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) toggleProfile();
        }}>
          <UserProfileModuleNew onClose={toggleProfile} />
        </div>
      )}
    </>
  );
};

export default Sidebar;
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ onModuleChange }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [activeModule, setActiveModule] = useState('social');
  
  // Iconos de navegación para los módulos principales
  const navIcons = [
    { id: 'social', name: 'Social', icon: '💬', tooltip: 'Red Social' },
    { id: 'academic', name: 'Académico', icon: '📚', tooltip: 'Gestión Académica' },
    { id: 'carpooling', name: 'Carpooling', icon: '🚗', tooltip: 'Compartir Viajes' },
    { id: 'messages', name: 'Mensajes', icon: '✉️', tooltip: 'Mensajería' },
    { id: 'notifications', name: 'Notificaciones', icon: '🔔', tooltip: 'Notificaciones' },
    { id: 'settings', name: 'Ajustes', icon: '⚙️', tooltip: 'Configuración' },
  ];

  const handleModuleChange = (moduleId) => {
    setActiveModule(moduleId);
    if (onModuleChange) {
      onModuleChange(moduleId);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo" style={{ backgroundColor: theme.colors.primary }}>
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
            <span>{item.icon}</span>
            <div className="nav-tooltip">{item.name}</div>
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <div 
          className="user-avatar" 
          style={{ backgroundColor: theme.colors.secondary }}
          title={user ? user.nombre : 'Usuario'}
        >
          {user && user.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
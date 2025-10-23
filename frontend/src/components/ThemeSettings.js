import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Componente de configuración de tema
 * Permite cambiar entre modo claro y oscuro
 */
const ThemeSettings = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  
  // Manejar el cambio al tema claro
  const handleLightThemeClick = () => {
    if (isDarkMode) {
      toggleTheme();
    }
  };
  
  // Manejar el cambio al tema oscuro
  const handleDarkThemeClick = () => {
    if (!isDarkMode) {
      toggleTheme();
    }
  };

  return (
    <div className="theme-settings-container">
      <div className="theme-settings-header">
        <h2 className="theme-settings-title">Configuración</h2>
      </div>
      
      <div className="theme-settings-content">
        <h3 className="theme-section-title">Apariencia</h3>
        
        <div className="theme-section">
          <label className="theme-label">Tema</label>
          
          <div className="theme-options-container">
            {/* Opción de tema claro */}
            <div 
              className={`theme-option ${!isDarkMode ? 'active' : ''}`}
              onClick={handleLightThemeClick}
            >
              <div className="theme-preview light-preview">
                <div className="theme-preview-header"></div>
                <div className="theme-preview-content">
                  <div className="theme-preview-line"></div>
                  <div className="theme-preview-line short"></div>
                </div>
              </div>
              <div className="theme-option-label">
                <span className="theme-option-icon">☀️</span>
                <span>Tema Claro</span>
                {!isDarkMode && <span className="theme-check">✓</span>}
              </div>
            </div>
            
            {/* Opción de tema oscuro */}
            <div 
              className={`theme-option ${isDarkMode ? 'active' : ''}`}
              onClick={handleDarkThemeClick}
            >
              <div className="theme-preview dark-preview">
                <div className="theme-preview-header"></div>
                <div className="theme-preview-content">
                  <div className="theme-preview-line"></div>
                  <div className="theme-preview-line short"></div>
                </div>
              </div>
              <div className="theme-option-label">
                <span className="theme-option-icon">🌙</span>
                <span>Tema Oscuro</span>
                {isDarkMode && <span className="theme-check">✓</span>}
              </div>
            </div>
            
            {/* Opción de tema colorido (próximamente) */}
            <div className="theme-option disabled">
              <div className="theme-preview colorful-preview">
                <div className="theme-preview-header"></div>
                <div className="theme-preview-content">
                  <div className="theme-preview-line"></div>
                  <div className="theme-preview-line short"></div>
                </div>
              </div>
              <div className="theme-option-label">
                <span className="theme-option-icon">🎨</span>
                <span>Colorido (Próximamente)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="theme-section">
          <label className="theme-label">Tamaño de texto</label>
          <div className="text-size-slider">
            <span className="text-size-min">A</span>
            <input 
              type="range" 
              min="1" 
              max="5" 
              defaultValue="3" 
              className="text-size-range"
            />
            <span className="text-size-max">A</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;

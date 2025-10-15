import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    colors: {
      primary: '#8B1E41', // Color principal borgoña del logo UNIVALLE
      secondary: '#C0C0C0', // Color gris/plateado del borde del logo
      accent: '#A52A4A', // Una variante más clara del color principal
      background: isDarkMode ? '#121212' : '#F8F8F8',
      card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      text: isDarkMode ? '#FFFFFF' : '#333333',
      textLight: isDarkMode ? '#BBBBBB' : '#666666',
      border: isDarkMode ? '#444444' : '#DDDDDD',
      notification: '#E53935', // Rojo para notificaciones
      success: '#43A047', // Verde para éxito
      warning: '#FB8C00', // Naranja para advertencias
      info: '#1E88E5', // Azul para información
      footerBg: isDarkMode ? '#151515' : '#E0E0E0', // Fondo del footer
    },
    fonts: {
      heading: 'Roboto, sans-serif',
      body: 'Roboto, sans-serif',
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    borderRadius: {
      small: '4px',
      medium: '8px',
      large: '16px',
      circle: '50%',
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const value = {
    isDarkMode,
    theme,
    toggleTheme
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

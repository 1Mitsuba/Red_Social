import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';

// Asegurarse de que el elemento root existe
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('No se encontró el elemento con id "root"');
}

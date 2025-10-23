import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/Carpooling.css';
import '../styles/CustomComponents.css';
import './styles/globalStyles.css';

// Componente para mostrar una tarjeta de ruta de carpooling con estilo moderno
export const RouteCard = ({ route, onJoin, onViewMap }) => {
  const { theme } = useTheme();
  
  const isAvailable = route.occupiedSeats < route.capacity;
  
  return (
    <div className="route-card">
      <div className="route-header" style={{ 
        background: theme.colors.primaryGradient || `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryLight})`
      }}>
        <h3 className="route-title">
          {route.origin} → {route.destination}
        </h3>
        <span className={`route-status ${isAvailable ? 'status-available' : 'status-full'}`}>
          {isAvailable ? 'Disponible' : 'Completo'}
        </span>
      </div>
      <div className="route-content">
        <div className="route-driver">
          <div className="driver-avatar">
            {route.driver ? route.driver.charAt(0) : 'U'}
          </div>
          <div className="driver-info">
            <p className="driver-name" style={{ color: theme.colors.text }}>{route.driver || 'Usuario'}</p>
            <span className="driver-role" style={{ color: theme.colors.textLight }}>Conductor</span>
          </div>
        </div>
        <div className="route-details">
          <div className="detail-item">
            <span className="detail-icon" style={{ color: theme.colors.primary }}>🕒</span>
            <span className="detail-text" style={{ color: theme.colors.text }}>Hora de salida: {route.time}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-icon" style={{ color: theme.colors.primary }}>📍</span>
            <span className="detail-text" style={{ color: theme.colors.text }}>Origen: {route.origin}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-icon" style={{ color: theme.colors.primary }}>🎯</span>
            <span className="detail-text" style={{ color: theme.colors.text }}>Destino: {route.destination}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-icon" style={{ color: theme.colors.primary }}>👤</span>
            <span className="detail-text" style={{ color: theme.colors.text }}>
              {route.occupiedSeats} / {route.capacity} asientos ocupados
            </span>
          </div>
          
          <div className="route-schedule" style={{ backgroundColor: `${theme.colors.cardBgSecondary || '#f5f5f5'}` }}>
            <p className="schedule-title" style={{ color: theme.colors.primary }}>Días disponibles:</p>
            <p className="schedule-days" style={{ color: theme.colors.text }}>
              {route.days ? route.days.join(', ') : 'No especificados'}
            </p>
          </div>

          {route.stops && route.stops.length > 0 && (
            <div className="route-stops">
              <h4 className="stops-title" style={{ color: theme.colors.primary }}>Paradas</h4>
              
              {route.stops.map((stop, index) => (
                <div key={index} className="stop-item" style={{ 
                  backgroundColor: index % 2 === 0 ? `${theme.colors.primary}10` : 'transparent' 
                }}>
                  <span className="stop-name" style={{ color: theme.colors.text }}>{stop.name}</span>
                  <span className="stop-time" style={{ color: theme.colors.secondaryText }}>{stop.time}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="route-actions">
            <button 
              className="join-button" 
              onClick={() => onJoin && onJoin(route.id)}
              style={{ backgroundColor: theme.colors.primary }}
              disabled={!isAvailable}
            >
              {isAvailable ? 'Unirse a esta ruta' : 'Ruta completa'}
            </button>
            <button 
              className="more-info-button" 
              onClick={() => onViewMap && onViewMap(route.id)}
              style={{ color: theme.colors.secondaryText, borderColor: theme.colors.border }}
            >
              <span role="img" aria-label="Ver mapa">🗺️</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para crear una nueva ruta
export const CreateRouteForm = ({ onSubmit, onCancel }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    origin: '',
    destination: 'Campus Universidad',
    time: '',
    days: [],
    capacity: 4
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleDayToggle = (day) => {
    const updatedDays = formData.days.includes(day)
      ? formData.days.filter(d => d !== day)
      : [...formData.days, day];
    
    setFormData({
      ...formData,
      days: updatedDays
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };
  
  return (
    <div className="create-route-form">
      <h3 style={{ 
        color: theme.colors.primary, 
        marginBottom: '25px',
        fontSize: '1.2rem',
        fontWeight: '600',
        letterSpacing: '-0.3px',
        position: 'relative',
        paddingBottom: '10px'
      }}>
        <span style={{ 
          position: 'relative',
          zIndex: 1
        }}>Crear Nueva Ruta</span>
        <span style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '40px',
          height: '3px',
          backgroundColor: theme.colors.primary,
          borderRadius: '2px'
        }}></span>
      </h3>
      
      <div className="form-group">
        <label className="input-label">
          Origen
        </label>
        <input 
          type="text" 
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          placeholder="¿Desde dónde sales?"
          className="custom-input"
        />
        <div className="help-text">Ingresa la dirección desde donde saldrás</div>
      </div>
      
      <div className="form-group">
        <label className="input-label">
          Destino
        </label>
        <input 
          type="text" 
          name="destination"
          value={formData.destination}
          disabled
          className="custom-input"
          style={{ opacity: 0.7 }}
        />
        <div className="help-text">El destino está configurado por defecto</div>
      </div>
      
      <div className="form-group">
        <label className="input-label">
          Horario de salida
        </label>
        <input 
          type="time" 
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="custom-input"
        />
        <div className="help-text">Selecciona la hora de salida</div>
      </div>
      
      <div className="form-group">
        <label className="input-label">
          Días disponibles
        </label>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '10px', 
          marginTop: '10px', 
          marginBottom: '5px' 
        }}>
          {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => handleDayToggle(day)}
              style={{
                padding: '8px 16px',
                borderRadius: '18px',
                border: `1px solid ${formData.days.includes(day) ? 'transparent' : 'rgba(255, 255, 255, 0.15)'}`,
                background: formData.days.includes(day) 
                  ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryLight})` 
                  : 'rgba(255, 255, 255, 0.05)',
                color: formData.days.includes(day) ? 'white' : theme.colors.text,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: formData.days.includes(day) 
                  ? '0 4px 10px rgba(139, 30, 65, 0.3)'
                  : 'none',
                fontWeight: formData.days.includes(day) ? '600' : '400',
              }}
            >
              {day}
            </button>
          ))}
        </div>
        <div className="help-text">Selecciona los días en que ofrecerás este viaje</div>
      </div>
      
      <div className="form-group">
        <label className="input-label">
          Capacidad de asientos
        </label>
        <select 
          name="capacity" 
          value={formData.capacity}
          onChange={handleChange}
          className="custom-select"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
            <option key={num} value={num}>{num} {num === 1 ? 'asiento' : 'asientos'}</option>
          ))}
        </select>
        <div className="help-text">Número de asientos disponibles en tu vehículo</div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        marginTop: '30px',
        gap: '15px'
      }}>
        <button 
          onClick={onCancel}
          className="button-secondary"
        >
          <span role="img" aria-label="cancelar" style={{ marginRight: '5px' }}>✖️</span>
          Cancelar
        </button>
        <button 
          onClick={handleSubmit}
          className="join-button"
          style={{ padding: '12px 25px' }}
        >
          <span role="img" aria-label="crear" style={{ marginRight: '5px' }}>✅</span>
          Crear ruta
        </button>
      </div>
      
      <div className="tooltip" style={{ position: 'absolute', right: '20px', bottom: '20px' }}>
        <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>?</span>
        <span className="tooltip-text">
          Al crear una ruta, estás ofreciendo llevar a otros estudiantes a la universidad.
          Recuerda ser puntual y respetar las normas de tránsito.
        </span>
      </div>
    </div>
  );
};

// Componente para mostrar las rutas en un mapa
export const RoutesMap = ({ routes }) => {
  const { theme } = useTheme();
  
  return (
    <div style={{
      backgroundColor: theme.colors.card,
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      <h3 style={{ color: theme.colors.primary, marginBottom: '20px' }}>
        Mapa de rutas
      </h3>
      
      <div style={{
        height: '400px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{ color: theme.colors.secondaryText }}>
          Visualización de mapa próximamente
        </p>
      </div>
    </div>
  );
};

// Componente para mostrar mis rutas como conductor
export const MyRoutesAsDriver = ({ routes, onEdit, onCancel }) => {
  const { theme } = useTheme();
  
  return (
    <div style={{
      backgroundColor: theme.colors.card,
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      <h3 style={{ color: theme.colors.primary, marginBottom: '20px' }}>
        Mis rutas como conductor
      </h3>
      
      {routes && routes.length > 0 ? (
        <div>
          {routes.map((route, index) => (
            <div key={index} style={{
              padding: '15px',
              borderBottom: `1px solid ${theme.colors.border}`,
              marginBottom: '10px',
            }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <h4 style={{ color: theme.colors.text, margin: 0 }}>
                  {route.origin} → {route.destination}
                </h4>
                <span style={{
                  padding: '4px 8px',
                  backgroundColor: theme.colors.success + '30',
                  color: theme.colors.success,
                  borderRadius: '4px',
                  fontSize: '12px',
                }}>
                  Activa
                </span>
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '5px'
              }}>
                <div>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Horario:</span>
                  <span>{route.time}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Ocupación:</span>
                  <span>{route.occupiedSeats}/{route.capacity}</span>
                </div>
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Días:</span>
                <span>{route.days.join(', ')}</span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end',
                gap: '10px'
              }}>
                <button 
                  onClick={() => onEdit && onEdit(route.id)}
                  style={{
                    backgroundColor: theme.colors.warning,
                    color: 'white',
                    border: 'none',
                    padding: '8px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Editar ruta
                </button>
                <button 
                  onClick={() => onCancel && onCancel(route.id)}
                  style={{
                    backgroundColor: theme.colors.error,
                    color: 'white',
                    border: 'none',
                    padding: '8px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar ruta
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: theme.colors.secondaryText, textAlign: 'center' }}>
          No tienes rutas activas como conductor.
        </p>
      )}
    </div>
  );
};

export default { RouteCard, CreateRouteForm, RoutesMap, MyRoutesAsDriver };

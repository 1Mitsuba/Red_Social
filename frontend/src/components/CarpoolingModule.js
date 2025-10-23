import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import DetailPanel from './DetailPanel';
import '../styles/Carpooling.css';

const CarpoolingModule = ({ onSelectItem, selectedItem }) => {
  const { theme } = useTheme();
  
  // Estados para las rutas
  const [activeTab, setActiveTab] = useState('disponibles');
  
  // Datos simulados para rutas
  const rutas = [
    {
      id: '001',
      punto_inicio: 'Campus Central',
      punto_destino: 'Residencial Las Palmas',
      hora_salida: '17:30',
      dias_disponibles: 'Lunes, Miércoles, Viernes',
      capacidad_ruta: 4,
      pasajeros_actuales: 2,
      fecha_creacion: '2025-10-01',
      conductor: {
        nombre: 'Juan Méndez',
        avatar: 'https://ui-avatars.com/api/?name=Juan+Méndez&background=random'
      },
      paradas: [
        { orden: 1, ubicacion: 'Avenida Central #205' },
        { orden: 2, ubicacion: 'Plaza Los Álamos' },
        { orden: 3, ubicacion: 'Supermercado Norte' }
      ]
    },
    {
      id: '002',
      punto_inicio: 'Campus Norte',
      punto_destino: 'Zona Sur',
      hora_salida: '18:00',
      dias_disponibles: 'Lunes a Viernes',
      capacidad_ruta: 3,
      pasajeros_actuales: 3,
      fecha_creacion: '2025-10-05',
      conductor: {
        nombre: 'Andrea López',
        avatar: 'https://ui-avatars.com/api/?name=Andrea+López&background=random'
      },
      paradas: [
        { orden: 1, ubicacion: 'Centro Comercial Meridiano' },
        { orden: 2, ubicacion: 'Hospital General' }
      ]
    },
    {
      id: '003',
      punto_inicio: 'Campus Este',
      punto_destino: 'Barrio El Dorado',
      hora_salida: '12:30',
      dias_disponibles: 'Martes, Jueves',
      capacidad_ruta: 5,
      pasajeros_actuales: 2,
      fecha_creacion: '2025-10-10',
      conductor: {
        nombre: 'Roberto Salazar',
        avatar: 'https://ui-avatars.com/api/?name=Roberto+Salazar&background=random'
      },
      paradas: [
        { orden: 1, ubicacion: 'Parque Central' },
        { orden: 2, ubicacion: 'Estación de Metro' },
        { orden: 3, ubicacion: 'Centro Comercial El Dorado' }
      ]
    },
    {
      id: '004',
      punto_inicio: 'Campus Sur',
      punto_destino: 'Valle Verde',
      hora_salida: '19:15',
      dias_disponibles: 'Lunes, Miércoles',
      capacidad_ruta: 2,
      pasajeros_actuales: 0,
      fecha_creacion: '2025-10-15',
      conductor: {
        nombre: 'Laura Gómez',
        avatar: 'https://ui-avatars.com/api/?name=Laura+Gómez&background=random'
      },
      paradas: [
        { orden: 1, ubicacion: 'Terminal de Autobuses' }
      ]
    }
  ];

  // Manejador para seleccionar una ruta
  const handleSelectRuta = (ruta) => {
    // Generar una imagen de mapa más realista
    const mapImage = `https://via.placeholder.com/800x300/333333/FFFFFF?text=Ruta+${ruta.punto_inicio}+a+${ruta.punto_destino}`;
    
    onSelectItem({
      ...ruta,
      userHandle: ruta.conductor.nombre.toLowerCase().replace(' ', ''),
      userName: ruta.conductor.nombre,
      userAvatar: ruta.conductor.avatar,
      title: `${ruta.punto_inicio} → ${ruta.punto_destino}`,
      image: mapImage,
      price: `${ruta.pasajeros_actuales}/${ruta.capacidad_ruta}`,
      id: ruta.id,
      tipo: 'carpooling'
    });
  };

  // Función para determinar el estado de capacidad
  const getCapacidadStatus = (actual, total) => {
    if (actual >= total) return 'lleno';
    if (actual >= total * 0.7) return 'casi-lleno';
    return 'disponible';
  };

  return (
    <>
      <div className="collections-section">
        <div className="collections-header">
          <h2 className="collections-title">Carpooling Universitario</h2>
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Buscar rutas..." 
              className="search-input" 
            />
            <span className="search-icon">🔍</span>
          </div>
          <button 
            className="primary-button" 
            style={{ 
              background: `linear-gradient(145deg, ${theme.colors.primary}, ${theme.colors.primaryLight})`,
              borderRadius: '20px',
              padding: '8px 20px',
              fontWeight: '500'
            }}
          >
            Crear Ruta
          </button>
        </div>
        
        <div className="tab-selector">
          <div 
            className={`tab-item ${activeTab === 'disponibles' ? 'active' : ''}`}
            onClick={() => setActiveTab('disponibles')}
          >
            Disponibles
          </div>
          <div 
            className={`tab-item ${activeTab === 'mis-rutas' ? 'active' : ''}`}
            onClick={() => setActiveTab('mis-rutas')}
          >
            Mis Rutas
          </div>
          <div 
            className={`tab-item ${activeTab === 'historial' ? 'active' : ''}`}
            onClick={() => setActiveTab('historial')}
          >
            Historial
          </div>
        </div>
        
        <div className="collections-grid carpooling-grid">
          {rutas
            .filter(ruta => {
              if (activeTab === 'disponibles') return ruta.pasajeros_actuales < ruta.capacidad_ruta;
              if (activeTab === 'mis-rutas') return ruta.conductor.nombre === 'Laura Gómez'; // Simulando rutas del usuario actual
              if (activeTab === 'historial') return new Date(ruta.fecha_creacion) < new Date('2025-10-15');
              return true;
            })
            .map((ruta) => {
              const capacidadStatus = getCapacidadStatus(ruta.pasajeros_actuales, ruta.capacidad_ruta);
              
              return (
                <div 
                  key={ruta.id} 
                  className="collection-card carpooling-card" 
                  onClick={() => handleSelectRuta(ruta)}
                  style={{ background: `linear-gradient(145deg, ${theme.colors.primaryDark}30, ${theme.colors.primaryLight}20)` }}
                >
                <div className="card-header">
                  <div className="user-info">
                    <div className="user-avatar">
                      <img src={ruta.conductor.avatar} alt={ruta.conductor.nombre} />
                    </div>
                    <div className="user-name">{ruta.conductor.nombre}</div>
                  </div>
                  <div className={`capacity-tag ${capacidadStatus}`}>
                    {ruta.pasajeros_actuales}/{ruta.capacidad_ruta}
                  </div>
                </div>
                
                <div className="card-content carpooling-content">
                  <div className="route-details">
                    <div className="route-points">
                      <div className="route-start">{ruta.punto_inicio}</div>
                      <div className="route-arrow">→</div>
                      <div className="route-end">{ruta.punto_destino}</div>
                    </div>
                    <div className="route-time">
                      <span className="time-icon">⏱️</span>
                      <span>{ruta.hora_salida}</span>
                    </div>
                    <div className="route-days">
                      <span className="days-icon">📅</span>
                      <span>{ruta.dias_disponibles}</span>
                    </div>
                  </div>
                </div>
                
                <div className="card-footer">
                  <div className="stops-info">{ruta.paradas.length} parada{ruta.paradas.length !== 1 ? 's' : ''}</div>
                  <div className="route-date">{new Date(ruta.fecha_creacion).toLocaleDateString('es-ES')}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {selectedItem && <DetailPanel item={selectedItem} onClose={() => onSelectItem(null)} />}
    </>
  );
};

export default CarpoolingModule;
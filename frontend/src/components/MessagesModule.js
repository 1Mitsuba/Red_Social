import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import DetailPanel from './DetailPanel';
import '../styles/Messages.css';

const MessagesModule = ({ onSelectItem, selectedItem }) => {
  const { theme } = useTheme();
  
  // Estado para conversaciones
  const [activeTab, setActiveTab] = useState('recientes');
  
  // Datos simulados para conversaciones
  const conversaciones = [
    {
      id: '001',
      tipo: 'privada',
      fecha_ultimo_mensaje: '2025-10-17T10:30:00',
      no_leidos: 3,
      participante: {
        nombre: 'Elena Rodríguez',
        avatar: 'https://ui-avatars.com/api/?name=Elena+Rodríguez&background=random'
      },
      ultimo_mensaje: '¿Tienes los apuntes de la clase de ayer?'
    },
    {
      id: '002',
      tipo: 'privada',
      fecha_ultimo_mensaje: '2025-10-16T18:15:00',
      no_leidos: 0,
      participante: {
        nombre: 'Luis Fernández',
        avatar: 'https://ui-avatars.com/api/?name=Luis+Fernández&background=random'
      },
      ultimo_mensaje: 'Gracias por la información'
    },
    {
      id: '003',
      tipo: 'grupal',
      nombre: 'Proyecto Final Informática',
      fecha_ultimo_mensaje: '2025-10-16T15:45:00',
      no_leidos: 12,
      participantes: [
        { nombre: 'María López', avatar: 'https://ui-avatars.com/api/?name=María+López&background=random' },
        { nombre: 'Carlos García', avatar: 'https://ui-avatars.com/api/?name=Carlos+García&background=random' },
        { nombre: 'Ana Martínez', avatar: 'https://ui-avatars.com/api/?name=Ana+Martínez&background=random' }
      ],
      ultimo_mensaje: 'María: Podemos reunirnos mañana en la biblioteca'
    },
    {
      id: '004',
      tipo: 'grupal',
      nombre: 'Estudio Cálculo II',
      fecha_ultimo_mensaje: '2025-10-15T20:10:00',
      no_leidos: 0,
      participantes: [
        { nombre: 'Roberto Díaz', avatar: 'https://ui-avatars.com/api/?name=Roberto+Díaz&background=random' },
        { nombre: 'Pablo Torres', avatar: 'https://ui-avatars.com/api/?name=Pablo+Torres&background=random' }
      ],
      ultimo_mensaje: 'Roberto: No olviden traer las calculadoras para la práctica'
    }
  ];

  // Manejador para seleccionar una conversación
  const handleSelectConversacion = (conversacion) => {
    onSelectItem({
      ...conversacion,
      userHandle: conversacion.tipo === 'privada' ? 
        conversacion.participante.nombre.toLowerCase().replace(' ', '') : 
        'grupo',
      userName: conversacion.tipo === 'privada' ? 
        conversacion.participante.nombre : 
        conversacion.nombre,
      userAvatar: conversacion.tipo === 'privada' ? 
        conversacion.participante.avatar : 
        'https://ui-avatars.com/api/?name=Grupo&background=random',
      title: conversacion.tipo === 'privada' ? 
        `Chat con ${conversacion.participante.nombre}` : 
        conversacion.nombre,
      image: 'https://via.placeholder.com/400x300/9C27B0/FFFFFF?text=Mensajería',
      price: conversacion.no_leidos,
      id: conversacion.id,
      tipo: 'conversacion',
      esGrupal: conversacion.tipo === 'grupal'
    });
  };

  return (
    <>
      <div className="collections-section">
        <div className="collections-header">
          <h2 className="collections-title">Mensajería</h2>
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Buscar mensajes..." 
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
            Nuevo Mensaje
          </button>
        </div>
        
        <div className="tab-selector">
          <div 
            className={`tab-item ${activeTab === 'recientes' ? 'active' : ''}`}
            onClick={() => setActiveTab('recientes')}
          >
            Recientes
          </div>
          <div 
            className={`tab-item ${activeTab === 'no-leidos' ? 'active' : ''}`}
            onClick={() => setActiveTab('no-leidos')}
          >
            No leídos
          </div>
          <div 
            className={`tab-item ${activeTab === 'grupos' ? 'active' : ''}`}
            onClick={() => setActiveTab('grupos')}
          >
            Grupos
          </div>
        </div>
        
        <div className="collections-grid message-grid">
          {conversaciones
            .filter(conversacion => {
              if (activeTab === 'recientes') return true;
              if (activeTab === 'no-leidos') return conversacion.no_leidos > 0;
              if (activeTab === 'grupos') return conversacion.tipo === 'grupal';
              return true;
            })
            .map((conversacion) => (
              <div 
                key={conversacion.id} 
                className="collection-card message-card" 
                onClick={() => handleSelectConversacion(conversacion)}
                style={{ 
                  width: '100%',
                  background: `linear-gradient(145deg, ${theme.colors.primaryDark}30, ${theme.colors.primaryLight}20)`
                }}
              >
              <div className="card-header">
                {conversacion.tipo === 'privada' ? (
                  <div className="user-info">
                    <div className="user-avatar">
                      <img src={conversacion.participante.avatar} alt={conversacion.participante.nombre} />
                    </div>
                    <div className="user-name">{conversacion.participante.nombre}</div>
                  </div>
                ) : (
                  <div className="group-info">
                    <div className="group-avatar-stack">
                      {conversacion.participantes.slice(0, 2).map((participant, idx) => (
                        <div key={idx} className="stacked-avatar" style={{ zIndex: 10 - idx }}>
                          <img src={participant.avatar} alt={participant.nombre} />
                        </div>
                      ))}
                    </div>
                    <div className="group-name">{conversacion.nombre}</div>
                  </div>
                )}
                
                <div className="message-time">
                  {new Date(conversacion.fecha_ultimo_mensaje).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              
              <div className="message-preview">
                <p>{conversacion.ultimo_mensaje}</p>
              </div>
              
              <div className="card-footer">
                {conversacion.no_leidos > 0 && (
                  <div className="unread-badge" style={{ backgroundColor: theme.colors.primary }}>
                    {conversacion.no_leidos}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedItem && <DetailPanel item={selectedItem} />}
    </>
  );
};

export default MessagesModule;
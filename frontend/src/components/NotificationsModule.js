import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import DetailPanel from './DetailPanel';

const NotificationsModule = ({ onSelectItem, selectedItem }) => {
  const { theme } = useTheme();
  
  // Estado para notificaciones
  const [activeTab, setActiveTab] = useState('todas');
  
  // Datos simulados para notificaciones
  const notificaciones = [
    {
      id: '001',
      tipo: 'comentario',
      contenido: 'Carlos García comentó en tu publicación',
      fecha_envio: '2025-10-17T09:45:00',
      leida: false,
      usuario: {
        nombre: 'Carlos García',
        avatar: 'https://ui-avatars.com/api/?name=Carlos+García&background=random'
      },
      referencia: {
        tipo: 'publicacion',
        id: '002',
        fragmento: 'Fotos del evento de ciencias de ayer'
      }
    },
    {
      id: '002',
      tipo: 'reaccion',
      contenido: 'A María López le gustó tu publicación',
      fecha_envio: '2025-10-16T15:20:00',
      leida: true,
      usuario: {
        nombre: 'María López',
        avatar: 'https://ui-avatars.com/api/?name=María+López&background=random'
      },
      referencia: {
        tipo: 'publicacion',
        id: '001',
        fragmento: 'Hoy tenemos reunión de estudio en la biblioteca a las 4PM'
      }
    },
    {
      id: '003',
      tipo: 'solicitud_amistad',
      contenido: 'Roberto Díaz quiere ser tu amigo',
      fecha_envio: '2025-10-16T11:10:00',
      leida: false,
      usuario: {
        nombre: 'Roberto Díaz',
        avatar: 'https://ui-avatars.com/api/?name=Roberto+Díaz&background=random'
      },
      referencia: {
        tipo: 'usuario',
        id: '005'
      }
    },
    {
      id: '004',
      tipo: 'solicitud_ruta',
      contenido: 'Ana Martínez quiere unirse a tu ruta',
      fecha_envio: '2025-10-15T18:30:00',
      leida: false,
      usuario: {
        nombre: 'Ana Martínez',
        avatar: 'https://ui-avatars.com/api/?name=Ana+Martínez&background=random'
      },
      referencia: {
        tipo: 'ruta',
        id: '001',
        fragmento: 'Campus Central → Residencial Las Palmas'
      }
    },
    {
      id: '005',
      tipo: 'mensaje',
      contenido: 'Tienes un nuevo mensaje de Elena Rodríguez',
      fecha_envio: '2025-10-15T14:05:00',
      leida: true,
      usuario: {
        nombre: 'Elena Rodríguez',
        avatar: 'https://ui-avatars.com/api/?name=Elena+Rodríguez&background=random'
      },
      referencia: {
        tipo: 'conversacion',
        id: '001'
      }
    },
    {
      id: '006',
      tipo: 'nota_nueva',
      contenido: 'Nueva calificación disponible en Cálculo Diferencial',
      fecha_envio: '2025-10-14T10:15:00',
      leida: true,
      referencia: {
        tipo: 'nota',
        id: '002',
        materia: 'Cálculo Diferencial',
        codigo: 'MAT101'
      }
    }
  ];

  // Manejador para seleccionar una notificación
  const handleSelectNotificacion = (notificacion) => {
    onSelectItem({
      ...notificacion,
      userHandle: notificacion.usuario ? notificacion.usuario.nombre.toLowerCase().replace(' ', '') : 'sistema',
      userName: notificacion.usuario ? notificacion.usuario.nombre : 'Sistema',
      userAvatar: notificacion.usuario ? notificacion.usuario.avatar : 'https://ui-avatars.com/api/?name=Sistema&background=random',
      title: 'Notificación',
      subtitle: notificacion.tipo.replace('_', ' '),
      image: notificacion.tipo === 'nota_nueva' ? 
        'https://via.placeholder.com/400x300/FF9800/FFFFFF?text=Nueva+Nota' :
        'https://via.placeholder.com/400x300/673AB7/FFFFFF?text=Notificación',
      id: notificacion.id,
      price: new Date(notificacion.fecha_envio).toLocaleString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit'
      }),
      tipo: 'notificacion'
    });
  };

  return (
    <>
      <div className="collections-section">
        <div className="collections-header">
          <h2 className="collections-title">Notificaciones</h2>
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Buscar notificaciones..." 
              className="search-input" 
            />
            <span className="search-icon">🔍</span>
          </div>
          <button 
            className="primary-button" 
            style={{ background: `linear-gradient(145deg, ${theme.colors.primary}, ${theme.colors.primaryLight})` }}
          >
            Marcar todas como leídas
          </button>
        </div>
        
        <div className="tab-selector">
          <div 
            className={`tab-item ${activeTab === 'todas' ? 'active' : ''}`}
            onClick={() => setActiveTab('todas')}
          >
            Todas
          </div>
          <div 
            className={`tab-item ${activeTab === 'no-leidas' ? 'active' : ''}`}
            onClick={() => setActiveTab('no-leidas')}
          >
            No leídas
          </div>
          <div 
            className={`tab-item ${activeTab === 'academicas' ? 'active' : ''}`}
            onClick={() => setActiveTab('academicas')}
          >
            Académicas
          </div>
        </div>
        
        <div className="collections-grid notification-grid">
          {notificaciones
            .filter(notif => activeTab !== 'no-leidas' || !notif.leida)
            .filter(notif => activeTab !== 'academicas' || ['nota_nueva'].includes(notif.tipo))
            .map((notificacion) => (
              <div 
                key={notificacion.id} 
                className={`collection-card notification-card ${!notificacion.leida ? 'unread' : ''}`}
                onClick={() => handleSelectNotificacion(notificacion)}
                style={{ 
                  width: '100%',
                  background: !notificacion.leida 
                    ? `linear-gradient(145deg, ${theme.colors.primaryLight}30, ${theme.colors.primary}20)`
                    : `linear-gradient(145deg, ${theme.colors.primaryDark}30, ${theme.colors.primaryLight}10)`
                }}
              >
                <div className="card-header">
                  <div className="notification-type-icon">
                    {notificacion.tipo === 'comentario' && '💬'}
                    {notificacion.tipo === 'reaccion' && '❤️'}
                    {notificacion.tipo === 'solicitud_amistad' && '👥'}
                    {notificacion.tipo === 'solicitud_ruta' && '🚗'}
                    {notificacion.tipo === 'mensaje' && '✉️'}
                    {notificacion.tipo === 'nota_nueva' && '📝'}
                    {notificacion.tipo === 'otro' && '🔔'}
                  </div>
                  <div className="notification-time">
                    {new Date(notificacion.fecha_envio).toLocaleString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                      day: '2-digit',
                      month: '2-digit'
                    })}
                  </div>
                </div>
                
                <div className="notification-content">
                  <p>{notificacion.contenido}</p>
                  {notificacion.referencia && notificacion.referencia.fragmento && (
                    <div className="notification-reference">
                      "{notificacion.referencia.fragmento}"
                    </div>
                  )}
                </div>
                
                <div className="card-footer">
                  {notificacion.usuario && (
                    <div className="user-info small-user-info">
                      <div className="user-avatar small-avatar">
                        <img src={notificacion.usuario.avatar} alt={notificacion.usuario.nombre} />
                      </div>
                      <div className="user-name small-name">{notificacion.usuario.nombre}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
      
      {selectedItem && <DetailPanel item={selectedItem} onClose={() => onSelectItem(null)} />}
    </>
  );
};

export default NotificationsModule;

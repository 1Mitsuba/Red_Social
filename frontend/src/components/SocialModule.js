import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import DetailPanel from './DetailPanel';
import '../styles/Social.css';

const SocialModule = ({ onSelectItem, selectedItem }) => {
  const { theme } = useTheme();
  
  // Estados para las publicaciones y eventos
  const [activeTab, setActiveTab] = useState('recientes');
  const [eventos, setEventos] = useState([
    {
      id: 'ev1',
      titulo: 'Feria Cultural - La Fevalle',
      descripcion: 'Actividades culturales y presentaciones artísticas en el campus.',
      fecha: '2025-11-02T18:00:00',
      lugar: 'Plaza Central',
      organizador: 'Comité Cultural'
    },
    {
      id: 'ev2',
      titulo: 'Campeonato de Futsal',
      descripcion: 'Torneo interfacultades de futsal. Inscripciones abiertas para equipos.',
      fecha: '2025-11-15T09:00:00',
      lugar: 'Gimnasio Principal',
      organizador: 'Departamento de Deportes'
    }
  ]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ titulo: '', descripcion: '', fecha: '', lugar: '' });

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && showEventForm) setShowEventForm(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showEventForm]);

  const titleRef = useRef(null);
  // Autofocus en el título cuando se abre el modal
  useEffect(() => {
    if (showEventForm) {
      setTimeout(() => titleRef.current && titleRef.current.focus(), 50);
    }
  }, [showEventForm]);
  
  // Datos simulados para publicaciones
  const publicaciones = [
    {
      id: '001',
      tipo: 'texto',
      contenido: 'Hoy tenemos reunión de estudio en la biblioteca a las 4PM. ¡No falten!',
      fecha_creacion: '2025-10-16T14:30:00',
      usuario: {
        nombre: 'Ana García',
        avatar: 'https://ui-avatars.com/api/?name=Ana+García&background=random'
      },
      reacciones: 24,
      comentarios: 5
    },
    {
      id: '002',
      tipo: 'imagen',
      contenido: 'Fotos del evento de ciencias de ayer',
      media: 'https://picsum.photos/400/300?random=1',
      fecha_creacion: '2025-10-16T10:15:00',
      usuario: {
        nombre: 'Carlos Mendoza',
        avatar: 'https://ui-avatars.com/api/?name=Carlos+Mendoza&background=random'
      },
      reacciones: 42,
      comentarios: 8
    },
    {
      id: '003',
      tipo: 'documento',
      contenido: 'Compartiendo los apuntes de cálculo para el examen',
      fecha_creacion: '2025-10-15T18:45:00',
      usuario: {
        nombre: 'Patricia Fuentes',
        avatar: 'https://ui-avatars.com/api/?name=Patricia+Fuentes&background=random'
      },
      reacciones: 18,
      comentarios: 3
    },
    {
      id: '004',
      tipo: 'enlace',
      contenido: 'Artículo interesante sobre las nuevas tecnologías de IA',
      url: 'https://example.com/articulo-ia',
      fecha_creacion: '2025-10-15T09:20:00',
      usuario: {
        nombre: 'Miguel Torres',
        avatar: 'https://ui-avatars.com/api/?name=Miguel+Torres&background=random'
      },
      reacciones: 15,
      comentarios: 2
    }
  ];

  // Manejador para seleccionar una publicación
  const handleSelectPublicacion = (publicacion) => {
    // Generar comentarios ficticios para el detalle
    const comentariosFicticios = [];
    const usuarios = ["Usuario 1", "Usuario 2", "Usuario 3", "Usuario 4", "Usuario 5"];
    const hoy = new Date();
    
    for (let i = 0; i < publicacion.comentarios; i++) {
      const usuarioAleatorio = usuarios[Math.floor(Math.random() * usuarios.length)];
      comentariosFicticios.push({
        id: `comment-${i}-${publicacion.id}`,
        userName: usuarioAleatorio,
        userAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(usuarioAleatorio)}&background=random`,
        contenido: `Este es un comentario de ejemplo #${i+1} para la publicación.`,
        fecha: new Date(hoy - (i * 3600000)).toISOString() // Comentarios de horas atrás
      });
    }
    
    onSelectItem({
      ...publicacion,
      tipo: publicacion.tipo || 'social',
      userHandle: publicacion.usuario.nombre.toLowerCase().replace(' ', ''),
      userName: publicacion.usuario.nombre,
      userAvatar: publicacion.usuario.avatar,
      title: publicacion.contenido.substring(0, 30) + (publicacion.contenido.length > 30 ? '...' : ''),
      image: publicacion.media || 'https://via.placeholder.com/400x300?text=Sin+imagen',
      price: publicacion.reacciones,
      id: publicacion.id,
      comentarios: comentariosFicticios // Array de comentarios en lugar de solo el número
    });
  };

  // Manejador para seleccionar un evento (abre detalle similar a una publicación)
  const handleSelectEvent = (ev) => {
    const comentariosFicticios = [
      {
        id: `c-1-${ev.id}`,
        userName: 'Usuario A',
        userAvatar: `https://ui-avatars.com/api/?name=Usuario+A&background=random`,
        contenido: '¡Interesante, me apunto!',
        fecha: new Date().toISOString()
      }
    ];

    onSelectItem({
      id: ev.id,
      tipo: 'evento',
      title: ev.titulo,
      contenido: ev.descripcion,
      userName: ev.organizador || 'Organizador',
      userHandle: (ev.organizador || 'organizador').toLowerCase().replace(/\s+/g, ''),
      image: null,
      comentarios: comentariosFicticios,
      fecha: ev.fecha,
      lugar: ev.lugar
    });
  };

  return (
    <>
      <div className="collections-section">
        <div className="collections-header">
          <h2 className="collections-title">Red Social Universitaria</h2>
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Buscar publicaciones..." 
              className="search-input" 
            />
            <span className="search-icon">🔍</span>
          </div>
          <button 
            className="primary-button" 
            style={{ background: `linear-gradient(145deg, ${theme.colors.primary}, ${theme.colors.primaryLight})` }}
            onClick={() => document.getElementById('newPostInput').focus()}
          >
            Nueva Publicación
          </button>
        </div>
        
        <div className="new-post-form">
          <textarea 
            id="newPostInput"
            className="new-post-input"
            placeholder="¿Qué está pasando en la universidad?" 
            rows={3}
          ></textarea>
          <div className="new-post-actions">
            <div className="post-attachments">
              <div className="attachment-button" title="Añadir imagen">📷</div>
              <div className="attachment-button" title="Añadir documento">📄</div>
              <div className="attachment-button" title="Añadir enlace">🔗</div>
            </div>
            <button 
              className="post-button"
              style={{ background: `linear-gradient(145deg, ${theme.colors.primary}, ${theme.colors.primaryLight})` }}
            >
              Publicar
            </button>
          </div>
        </div>
        
        <div className="tab-selector">
          <div 
            className={`tab-item ${activeTab === 'recientes' ? 'active' : ''}`}
            onClick={() => setActiveTab('recientes')}
          >
            Recientes
          </div>
          <div 
            className={`tab-item ${activeTab === 'populares' ? 'active' : ''}`}
            onClick={() => setActiveTab('populares')}
          >
            Populares
          </div>
          <div 
            className={`tab-item ${activeTab === 'amigos' ? 'active' : ''}`}
            onClick={() => setActiveTab('amigos')}
          >
            Amigos
          </div>
          <div 
            className={`tab-item ${activeTab === 'eventos' ? 'active' : ''}`}
            onClick={() => setActiveTab('eventos')}
          >
            Eventos
          </div>
        </div>
        
        {/* Header de eventos: solo visible cuando activeTab === 'eventos' */}
        {activeTab === 'eventos' && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Eventos</h3>
            <button 
              className="primary-button" 
              style={{ background: `linear-gradient(145deg, ${theme.colors.primary}, ${theme.colors.primaryLight})` }}
              onClick={() => setShowEventForm(true)}
            >
              Crear Evento
            </button>
          </div>
        )}
        
        <div className="collections-grid social-posts">
          {activeTab !== 'eventos' ? (
            publicaciones
              .filter(publicacion => {
                if (activeTab === 'recientes') return true;
                if (activeTab === 'populares') return publicacion.reacciones >= 20; // Ejemplo: populares si tienen más de 20 reacciones
                if (activeTab === 'amigos') return ['Ana García', 'Carlos Mendoza'].includes(publicacion.usuario.nombre); // Ejemplo: publicaciones de "amigos"
                return true;
              })
              .map((publicacion) => (
                <div 
                  key={publicacion.id} 
                  className="collection-card social-post" 
                  onClick={() => handleSelectPublicacion(publicacion)}
                  style={{ 
                    width: '100%',
                    background: `linear-gradient(145deg, ${theme.colors.primaryDark}30, ${theme.colors.primaryLight}20)`
                  }}
                >
                <div className="card-header">
                  <div className="user-info">
                    <div className="user-avatar">
                      <img src={publicacion.usuario.avatar} alt={publicacion.usuario.nombre} />
                    </div>
                    <div className="user-name">{publicacion.usuario.nombre}</div>
                  </div>
                  <div className="publication-date">
                    {new Date(publicacion.fecha_creacion).toLocaleDateString('es-ES')}
                  </div>
                </div>
                
                <div className="post-content">
                  <p>{publicacion.contenido}</p>
                  
                  {publicacion.tipo === 'imagen' && (
                    <div className="post-media">
                      <img src={publicacion.media} alt="Contenido multimedia" />
                    </div>
                  )}
                  
                  {publicacion.tipo === 'documento' && (
                    <div className="post-document">
                      <span className="document-icon">📄</span>
                      <span>Documento compartido</span>
                    </div>
                  )}
                  
                  {publicacion.tipo === 'enlace' && (
                    <div className="post-link">
                      <span className="link-icon">🔗</span>
                      <a href={publicacion.url} target="_blank" rel="noopener noreferrer">
                        {publicacion.url}
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="card-footer">
                  <div className="post-stats">
                    <span>❤️ {publicacion.reacciones}</span>
                    <span>💬 {publicacion.comentarios}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Renderizar eventos cuando la pestaña activa es 'eventos'
            <>
              {eventos.length === 0 && <div>No hay eventos programados.</div>}
              {eventos.map(ev => (
                <div key={ev.id} className="collection-card event-card" onClick={() => handleSelectEvent(ev)}>
                  <div className="event-card-header">
                    <div className="event-icon">📅</div>
                    <div className="event-badge">Evento</div>
                  </div>
                  
                  <div className="event-card-body">
                    <h4 className="event-title">{ev.titulo}</h4>
                    
                    <div className="event-details">
                      <div className="event-detail-item">
                        <span className="event-detail-icon">🕒</span>
                        <span className="event-detail-text">{new Date(ev.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })} • {new Date(ev.fecha).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="event-detail-item">
                        <span className="event-detail-icon">📍</span>
                        <span className="event-detail-text">{ev.lugar}</span>
                      </div>
                    </div>
                    
                    <p className="event-description">{ev.descripcion}</p>
                  </div>
                  
                  <div className="event-card-footer">
                    <div className="event-organizer">
                      <div className="event-organizer-avatar">
                        {(ev.organizador || 'O')[0].toUpperCase()}
                      </div>
                      <div className="event-organizer-info">
                        <span className="event-organizer-label">Organiza</span>
                        <span className="event-organizer-name">{ev.organizador || 'Universidad'}</span>
                      </div>
                    </div>
                    <button className="event-comment-btn" onClick={(e) => { e.stopPropagation(); handleSelectEvent(ev); }}>
                      💬
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      
      {/* Modal para crear evento - fuera del grid */}
      {showEventForm && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={(e) => { if (e.target === e.currentTarget) setShowEventForm(false); }}>
          <div className="modal-content new-event-modal" style={{ maxWidth: 720, width: '95%', margin: '40px auto', padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ margin: 0 }}>Crear Evento</h3>
              <button className="modal-close" aria-label="Cerrar" onClick={() => setShowEventForm(false)}>×</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
              <input ref={titleRef} type="text" placeholder="Título del evento" value={newEvent.titulo} onChange={e => setNewEvent({...newEvent, titulo: e.target.value})} style={{ width: '100%' }} />
              <input type="datetime-local" placeholder="Fecha y hora" value={newEvent.fecha} onChange={e => setNewEvent({...newEvent, fecha: e.target.value})} style={{ width: '100%' }} />
              <input type="text" placeholder="Lugar" value={newEvent.lugar} onChange={e => setNewEvent({...newEvent, lugar: e.target.value})} style={{ width: '100%' }} />
              <textarea placeholder="Descripción" value={newEvent.descripcion} onChange={e => setNewEvent({...newEvent, descripcion: e.target.value})} style={{ width: '100%' }} />
            </div>

            <div style={{ textAlign: 'right', marginTop: 12 }}>
              <button className="post-button" onClick={() => {
                if (!newEvent.titulo || !newEvent.fecha) return alert('Completa título y fecha');
                const ev = { ...newEvent, id: `ev${Date.now()}` };
                setEventos(prev => [ev, ...prev]);
                setNewEvent({ titulo: '', descripcion: '', fecha: '', lugar: '' });
                setShowEventForm(false);
              }} style={{ background: `linear-gradient(145deg, ${theme.colors.primary}, ${theme.colors.primaryLight})` }}>Guardar Evento</button>
            </div>
          </div>
        </div>
      )}
      
      {selectedItem && <DetailPanel item={selectedItem} onClose={() => onSelectItem(null)} />}
    </>
  );
};

export default SocialModule;
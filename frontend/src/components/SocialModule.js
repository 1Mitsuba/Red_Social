import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import DetailPanel from './DetailPanel';
import '../styles/Social.css';

const SocialModule = ({ onSelectItem, selectedItem }) => {
  const { theme } = useTheme();
  
  // Estados para las publicaciones
  const [activeTab, setActiveTab] = useState('recientes');
  
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
        </div>
        
        <div className="collections-grid social-posts">
          {publicaciones
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
          ))}
        </div>
      </div>
      
      {selectedItem && <DetailPanel item={selectedItem} />}
    </>
  );
};

export default SocialModule;
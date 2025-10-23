import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/DetailPanel.css';
import '../styles/CarpoolingDetail.css';
import '../styles/Messages.css';

const DetailPanel = ({ item, onClose }) => {
  const { theme } = useTheme();
  const [showAllComments, setShowAllComments] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [localComments, setLocalComments] = useState([]);
  
  // Default item para mostrar siempre un ejemplo como en la imagen
  const defaultItem = {
    id: '141',
    title: 'Red Social Universitaria',
    userName: 'Bienvenido',
    userHandle: 'bienvenido',
    price: '0',
    tipo: 'default',
    image: 'https://via.placeholder.com/300x400/333/fff?text=Bienvenido'
  };
  
  // Usar el item seleccionado o el default
  item = item || defaultItem;

  // Inicializar comentarios locales cuando cambie el item
  React.useEffect(() => {
    setLocalComments(item.comentarios || []);
  }, [item]);
  
  // Renderizar diferentes tipos de detalle según el tipo de elemento
  const renderDetailContent = () => {
    switch (item.tipo) {
      case 'materia':
        return renderMateriaDetail();
      case 'carpooling':
        return renderCarpoolingDetail();
      case 'conversacion':
        return renderConversacionDetail();
      case 'notificacion':
        return renderNotificacionDetail();
      default:
        return renderDefaultDetail();
    }
  };
  
  // Detalle de materia (académico)
  const renderMateriaDetail = () => (
    <>
      <div className="detail-content">
        <div className="item-image course-image">
          <img src={item.image} alt={item.title} />
          <div className="course-code-overlay">{item.id}</div>
        </div>
        
        <div className="item-info">
          <div className="item-title">{item.title}</div>
          <div className="teacher-info">
            <span>Docente:</span> {item.userName}
          </div>
          
          <div className="course-schedules">
            <h4>Horarios</h4>
            {item.horarios && item.horarios.map((horario, idx) => (
              <div key={idx} className="schedule-item-detail">
                <span className="day-label">{horario.dia}:</span> 
                <span>{horario.inicio} - {horario.fin}</span>
                <span className="classroom">{horario.aula}</span>
              </div>
            ))}
          </div>
          
          <div className="item-price-container">
            <div className="item-stats">Promedio:</div>
            <div className="item-price grade-display" style={{ background: `linear-gradient(145deg, ${theme.colors.primary}, ${theme.colors.primaryLight})` }}>
              {item.price}
            </div>
          </div>
        </div>
      </div>
      
      {item.notas && (
        <div className="history-section">
          <div className="history-tabs">
            <div className="history-tab active">Calificaciones</div>
          </div>
          
          <table className="history-table">
            <thead>
              <tr>
                <th>Evaluación</th>
                <th>Nota</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {item.notas.map((nota, index) => (
                <tr key={index}>
                  <td>{nota.tipo_nota}</td>
                  <td>{nota.nota}</td>
                  <td>{new Date(nota.fecha).toLocaleDateString('es-ES')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
  
  // Detalle de ruta de carpooling
  const renderCarpoolingDetail = () => (
    <>
      <div className="detail-content">
        <div className="item-image map-preview">
          <img src={item.image} alt="Mapa de la ruta" />
        </div>
        
        <div className="item-info">
          <div className="item-title">{item.title}</div>
          
          <div className="route-details-full">
            <div className="route-time-info">
              <div><span className="detail-icon">⏱️</span> {item.hora_salida}</div>
              <div><span className="detail-icon">📅</span> {item.dias_disponibles}</div>
            </div>
          </div>
          
          <div className="paradas-section">
            <h4>Paradas</h4>
            <div className="paradas-list">
              {item.paradas && item.paradas.map((parada, idx) => (
                <div key={idx} className="stop-item">
                  <span className="stop-number">{parada.orden}.</span> 
                  <span className="stop-location">{parada.ubicacion}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="item-price-container">
            <div className="item-capacity">Capacidad:</div>
            <div className="item-price capacity-display" style={{ background: `linear-gradient(145deg, ${theme.colors.primary}, ${theme.colors.primaryLight})` }}>
              {item.price}
            </div>
          </div>
        </div>
      </div>
      
      <div className="passengers-section">
        <div className="passengers-header">
          <div className="passengers-title">Pasajeros</div>
        </div>
        
        <div className="passengers-list">
          {[...Array(parseInt(item.price.split('/')[0]))].map((_, idx) => (
            <div key={idx} className="passenger-item">
              <div className="passenger-avatar">
                <img src={`https://ui-avatars.com/api/?name=Pasajero+${idx+1}&background=random`} alt="Pasajero" />
              </div>
              <div className="passenger-name">Pasajero {idx+1}</div>
              <div className="passenger-status">Confirmado</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  
  // Detalle de conversación de mensajería
  // Array de emojis disponibles para el selector
  const emojis = [
    "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
    "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
    "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩",
    "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖",
    "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯",
    "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "❣️", "💕", "💞"
  ];

  const addEmoji = (emoji) => {
    setMessageText(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const renderConversacionDetail = () => {
    // Verificar si la conversación es grupal
    const isGroupChat = item.esGrupal === true || (item.participantes && item.participantes.length > 2);
    
    return (
      <>
        <div className="detail-content">
          <div className="messages-container">
            <div className="message-day-divider">Hoy</div>
            
            <div className="message-bubble received">
              {isGroupChat && (
                <div className="message-sender">María</div>
              )}
              <div className="message-text">¿A qué hora y dónde nos vemos?</div>
              <div className="message-time">10:35</div>
            </div>
            
            <div className="message-bubble sent">
              {/* No mostramos el nombre en mensajes enviados por el usuario actual */}
              <div className="message-text">A las 4PM en la biblioteca central. Llevaré mis apuntes de la clase anterior.</div>
              <div className="message-time">10:40</div>
            </div>
  
            <div className="message-day-divider">Ayer</div>
            
            <div className="message-bubble received">
              {isGroupChat && (
                <div className="message-sender">Roberto</div>
              )}
              <div className="message-text">¿Tienes los apuntes de la clase de ayer?</div>
              <div className="message-time">18:15</div>
            </div>
          </div>
        </div>
        
        <div className="message-input-area">
          <button 
            className="emoji-button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😊
          </button>
          <input 
            type="text" 
            placeholder="Escribe un mensaje..." 
            className="message-input"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button 
            className="send-message-btn"
            style={{ backgroundColor: theme.colors.primary }}
          >
            📤
          </button>
  
          {showEmojiPicker && (
            <div className="emoji-picker-container">
              <div className="emoji-grid">
                {emojis.map((emoji, idx) => (
                  <div 
                    key={idx} 
                    className="emoji-item" 
                    onClick={() => addEmoji(emoji)}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </>
    );
  };
  // Detalle de notificación
  const renderNotificacionDetail = () => (
    <>
      <div className="detail-content notification-detail">
        <div className="notification-icon" style={{ backgroundColor: theme.colors.primaryLight }}>
          {item.tipo === 'comentario' && '💬'}
          {item.tipo === 'reaccion' && '❤️'}
          {item.tipo === 'solicitud_amistad' && '👥'}
          {item.tipo === 'solicitud_ruta' && '🚗'}
          {item.tipo === 'mensaje' && '✉️'}
          {item.tipo === 'nota_nueva' && '📝'}
          {item.tipo === 'otro' && '🔔'}
        </div>
        
        <div className="item-info">
          <div className="item-title notification-title">{item.contenido}</div>
          <div className="notification-date">
            {new Date(item.fecha_envio).toLocaleString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </div>
          
          {item.referencia && item.referencia.fragmento && (
            <div className="notification-reference-full">
              <p>"{item.referencia.fragmento}"</p>
            </div>
          )}
          
          <div className="notification-actions">
            {(item.tipo === 'solicitud_amistad' || item.tipo === 'solicitud_ruta') && (
              <>
                <button className="notification-action accept" style={{ backgroundColor: theme.colors.success }}>
                  Aceptar
                </button>
                <button className="notification-action reject" style={{ backgroundColor: theme.colors.notification }}>
                  Rechazar
                </button>
              </>
            )}
            
            {item.tipo === 'comentario' && (
              <button className="notification-action" style={{ backgroundColor: theme.colors.info }}>
                Ver comentario
              </button>
            )}
            
            {item.tipo === 'reaccion' && (
              <button className="notification-action" style={{ backgroundColor: theme.colors.info }}>
                Ver publicación
              </button>
            )}
            
            {item.tipo === 'mensaje' && (
              <button className="notification-action" style={{ backgroundColor: theme.colors.info }}>
                Responder
              </button>
            )}
            
            {item.tipo === 'nota_nueva' && (
              <button className="notification-action" style={{ backgroundColor: theme.colors.info }}>
                Ver calificación
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
  
  // Detalle por defecto
  const renderDefaultDetail = () => (
    <>
      <div className="detail-content">
        <div className="item-image">
          {item.image ? (
            <img src={item.image} alt={item.title} />
          ) : (
            <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>No hay imagen disponible</div>
          )}
        </div>
        
        <div className="item-info">
          <div className="item-title">{item.title}</div>
          <div className="item-id">{item.id ? `#${item.id}` : ''}</div>
          
          <div className="item-description">
            {item.contenido && <p>{item.contenido}</p>}
            {item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="item-link">
                {item.url}
              </a>
            )}
          </div>
          
          <div className="item-price-container">
            {item.reacciones !== undefined && (
              <div className="item-likes">❤️ {item.reacciones}</div>
            )}
            {item.price !== undefined && (
              <div className="item-price" style={{ background: `linear-gradient(145deg, ${theme.colors.primary}, ${theme.colors.primaryLight})` }}>
                {item.price}
              </div>
            )}
          </div>
        </div>
      </div>
      
      { (localComments && localComments.length >= 0) && (
        <div className="history-section">
          <div className="comments-divider"></div>
          <div className="history-tabs">
            <div className="history-tab active">Comentarios ({localComments.length})</div>
          </div>
          
          <div className="comments-list">
            {(showAllComments ? localComments : localComments.slice(0, 3)).map((comment, idx) => (
              <div key={idx} className="comment-item">
                <div className="comment-avatar">
                  <img src={comment.userAvatar || `https://ui-avatars.com/api/?name=${comment.userName}&background=random`} alt={comment.userName} />
                </div>
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">{comment.userName}</span>
                    <span className="comment-date">17/10/2025</span>
                  </div>
                  <div className="comment-text">{comment.contenido}</div>
                </div>
              </div>
            ))}
            {!showAllComments && item.comentarios.length > 3 && (
              <div className="view-more-comments" onClick={() => setShowAllComments(true)}>
                Ver todos los {item.comentarios.length} comentarios
              </div>
            )}
            {showAllComments && (
              <div className="view-more-comments" onClick={() => setShowAllComments(false)}>
                Mostrar menos
              </div>
            )}
          </div>
          {/* Input para añadir comentario en detalle */}
          <div className="add-comment-section">
            <div className="comment-input-container">
              <input 
                type="text" 
                className="comment-input" 
                placeholder="Escribe un comentario..." 
                value={messageText} 
                onChange={e => setMessageText(e.target.value)}
                onKeyPress={e => {
                  if (e.key === 'Enter' && messageText.trim()) {
                    const comment = {
                      id: `c-${Date.now()}`,
                      userName: 'Tú',
                      userAvatar: `https://ui-avatars.com/api/?name=Tu&background=random`,
                      contenido: messageText,
                      fecha: new Date().toISOString()
                    };
                    setLocalComments(prev => [comment, ...prev]);
                    setMessageText('');
                  }
                }}
              />
              <button 
                className="comment-submit-btn" 
                onClick={() => {
                  if (!messageText.trim()) return;
                  const comment = {
                    id: `c-${Date.now()}`,
                    userName: 'Tú',
                    userAvatar: `https://ui-avatars.com/api/?name=Tu&background=random`,
                    contenido: messageText,
                    fecha: new Date().toISOString()
                  };
                  setLocalComments(prev => [comment, ...prev]);
                  setMessageText('');
                }}
                disabled={!messageText.trim()}
                style={{ background: messageText.trim() ? `linear-gradient(145deg, ${theme.colors.primary}, ${theme.colors.primaryLight})` : 'rgba(255,255,255,0.1)' }}
              >
                Comentar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
  
  return (
    <div className="detail-panel">
      <div className="detail-header">
        <div className="user-detail">
          <div className="user-detail-name">{item.userName}</div>
          {item.tipo === 'conversacion' && item.esGrupal ? (
            <div className="user-detail-username">@grupo</div>
          ) : (
            <div className="user-detail-username">@{item.userHandle}</div>
          )}
        </div>
        <div className="detail-actions">
          {item.tipo === 'materia' && <div className="action-button" title="Descargar material">📥</div>}
          {item.tipo === 'carpooling' && <div className="action-button" title="Compartir ruta">🔗</div>}
          {item.tipo === 'conversacion' && <div className="action-button" title="Información">ℹ️</div>}
          <div className="action-button" title="Favoritos">⭐</div>
          {onClose && (
            <button className="detail-close-btn" onClick={onClose} title="Cerrar">
              ✕
            </button>
          )}
        </div>
      </div>
      
      {renderDetailContent()}
    </div>
  );
};

export default DetailPanel;
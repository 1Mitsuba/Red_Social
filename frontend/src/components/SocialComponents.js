import React from 'react';
import { useTheme } from '../context/ThemeContext';

// Componente para publicaciones sociales
export const SocialPost = ({ post, onLike, onComment, onShare }) => {
  const { theme } = useTheme();
  
  return (
    <div style={{
      backgroundColor: theme.colors.card,
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', marginBottom: '15px' }}>
        <div style={{ 
          width: '50px', 
          height: '50px', 
          borderRadius: '50%', 
          backgroundColor: theme.colors.primary,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '15px',
          fontWeight: 'bold',
          fontSize: '18px'
        }}>
          {post.avatarText || post.user.charAt(0)}
        </div>
        <div>
          <div style={{ fontWeight: 'bold', color: theme.colors.text }}>{post.user}</div>
          <div style={{ color: theme.colors.textLight, fontSize: '0.8rem' }}>{post.time}</div>
        </div>
      </div>
      
      <div style={{ marginBottom: '15px', lineHeight: '1.5' }}>
        {post.content}
      </div>
      
      {post.image && (
        <div style={{ marginBottom: '15px' }}>
          <img 
            src={post.image} 
            alt="Contenido de la publicación" 
            style={{
              width: '100%',
              borderRadius: '8px',
              maxHeight: '400px',
              objectFit: 'cover'
            }}
          />
        </div>
      )}
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        borderTop: `1px solid ${theme.colors.border}`,
        paddingTop: '15px'
      }}>
        <button 
          onClick={() => onLike && onLike(post.id)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            color: post.liked ? theme.colors.primary : theme.colors.textLight,
            cursor: 'pointer',
            fontWeight: post.liked ? 'bold' : 'normal'
          }}
        >
          <span style={{ marginRight: '5px', fontSize: '1.2rem' }}>👍</span>
          {post.likes} Me gusta
        </button>
        
        <button 
          onClick={() => onComment && onComment(post.id)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            color: theme.colors.textLight,
            cursor: 'pointer'
          }}
        >
          <span style={{ marginRight: '5px', fontSize: '1.2rem' }}>💬</span>
          {post.comments} Comentarios
        </button>
        
        <button 
          onClick={() => onShare && onShare(post.id)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            color: theme.colors.textLight,
            cursor: 'pointer'
          }}
        >
          <span style={{ marginRight: '5px', fontSize: '1.2rem' }}>↗️</span>
          Compartir
        </button>
      </div>
      
      {post.showComments && (
        <div style={{ 
          marginTop: '15px',
          borderTop: `1px solid ${theme.colors.border}`,
          paddingTop: '15px'
        }}>
          {post.commentList && post.commentList.map((comment, index) => (
            <div key={index} style={{ 
              marginBottom: '10px',
              backgroundColor: `${theme.colors.background}`,
              padding: '10px',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <div style={{ 
                  width: '30px', 
                  height: '30px', 
                  borderRadius: '50%', 
                  backgroundColor: theme.colors.primary,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  {comment.user.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{comment.user}</div>
                  <div style={{ fontSize: '0.7rem', color: theme.colors.textLight }}>{comment.time}</div>
                </div>
              </div>
              <div style={{ marginLeft: '40px' }}>{comment.content}</div>
            </div>
          ))}
          
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: theme.colors.primary,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '10px',
              fontWeight: 'bold'
            }}>
              YO
            </div>
            <input 
              type="text" 
              placeholder="Escribe un comentario..."
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '20px',
                border: `1px solid ${theme.colors.border}`,
                backgroundColor: theme.colors.background
              }}
            />
            <button style={{
              marginLeft: '10px',
              backgroundColor: theme.colors.primary,
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente para crear una nueva publicación
export const CreatePostForm = ({ onSubmit }) => {
  const { theme } = useTheme();
  
  return (
    <div style={{
      backgroundColor: theme.colors.card,
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
        <div style={{ 
          width: '50px', 
          height: '50px', 
          borderRadius: '50%', 
          backgroundColor: theme.colors.primary,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '15px',
          fontWeight: 'bold'
        }}>
          YO
        </div>
        <textarea 
          placeholder="¿Qué estás pensando?"
          style={{
            flex: 1,
            minHeight: '100px',
            padding: '15px',
            borderRadius: '8px',
            border: `1px solid ${theme.colors.border}`,
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            resize: 'none',
            fontFamily: 'inherit',
            fontSize: '1rem'
          }}
        />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <button style={{
            backgroundColor: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            color: theme.colors.textLight,
            cursor: 'pointer',
            padding: '5px 10px'
          }}>
            <span style={{ marginRight: '5px', fontSize: '1.2rem' }}>📷</span>
            Foto
          </button>
        </div>
        
        <button 
          onClick={onSubmit}
          style={{
            backgroundColor: theme.colors.primary,
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Publicar
        </button>
      </div>
    </div>
  );
};

// Componente para mostrar chat grupal
export const GroupChat = ({ chat }) => {
  const { theme } = useTheme();
  
  return (
    <div style={{
      backgroundColor: theme.colors.card,
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      height: '500px'
    }}>
      <div style={{
        backgroundColor: theme.colors.primary,
        color: 'white',
        padding: '15px',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          backgroundColor: 'white',
          color: theme.colors.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '15px',
          fontWeight: 'bold'
        }}>
          {chat.icon || '👥'}
        </div>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{chat.name}</div>
          <div style={{ fontSize: '0.8rem' }}>{chat.participants} participantes</div>
        </div>
      </div>
      
      <div style={{
        flex: 1,
        padding: '15px',
        overflowY: 'auto',
        backgroundColor: theme.colors.background,
        borderBottom: `1px solid ${theme.colors.border}`
      }}>
        {chat.messages && chat.messages.map((message, index) => {
          const isMe = message.user === 'Yo';
          
          return (
            <div key={index} style={{
              display: 'flex',
              justifyContent: isMe ? 'flex-end' : 'flex-start',
              marginBottom: '10px'
            }}>
              {!isMe && (
                <div style={{ 
                  width: '30px', 
                  height: '30px', 
                  borderRadius: '50%', 
                  backgroundColor: theme.colors.primary,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  fontWeight: 'bold',
                  fontSize: '12px'
                }}>
                  {message.user.charAt(0)}
                </div>
              )}
              
              <div style={{
                backgroundColor: isMe ? theme.colors.primary : theme.colors.card,
                color: isMe ? 'white' : theme.colors.text,
                padding: '10px 15px',
                borderRadius: '18px',
                maxWidth: '70%',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}>
                {!isMe && (
                  <div style={{ fontWeight: 'bold', marginBottom: '3px', fontSize: '0.9rem' }}>
                    {message.user}
                  </div>
                )}
                <div>{message.text}</div>
                <div style={{ 
                  textAlign: 'right', 
                  fontSize: '0.7rem', 
                  marginTop: '3px',
                  opacity: 0.7
                }}>
                  {message.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div style={{
        padding: '15px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <input 
          type="text" 
          placeholder="Escribe un mensaje..."
          style={{
            flex: 1,
            padding: '12px 15px',
            borderRadius: '20px',
            border: `1px solid ${theme.colors.border}`,
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            fontSize: '1rem'
          }}
        />
        <button style={{
          marginLeft: '10px',
          backgroundColor: theme.colors.primary,
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '1.2rem'
        }}>
          →
        </button>
      </div>
    </div>
  );
};

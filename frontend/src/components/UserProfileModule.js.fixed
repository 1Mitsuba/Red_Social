import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import '../styles/UserProfileModule.css';

const UserProfileModule = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  
  // Estado para los datos del usuario
  const [userData, setUserData] = useState({
    nombre: user?.nombre || 'Usuario de Prueba',
    apellido: user?.apellido || '',
    correo: user?.correo || 'usuario@ejemplo.com',
    rol: user?.rol || 'estudiante',
    carrera: user?.carrera || 'Informática',
    semestre: user?.semestre || '5',
  });

  // Estado para las secciones del perfil
  const [activeTab, setActiveTab] = useState('reciente');
  
  // Manejador de cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  // Manejador para guardar cambios
  const handleSaveChanges = () => {
    // Aquí iría la lógica para guardar los cambios en el servidor
    alert('Cambios guardados correctamente');
  };

  // Iniciales del usuario
  const getUserInitials = () => {
    return (userData.nombre.charAt(0) + userData.apellido.charAt(0)).toUpperCase() || 'US';
  };

  return (
    <div className="user-profile-container" style={{ 
      maxHeight: '100vh', 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '20px',
      backgroundColor: '#000000',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      color: '#ffffff'
    }}>
      <div className="profile-header" style={{
        position: 'relative',
        height: '200px',
        backgroundColor: '#000000',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}>
        <div className="camera-icon" style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          fontSize: '24px',
          color: 'white'
        }}>
          📷
        </div>
        
        <div className="search-bar" style={{
          width: '80%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '30px',
          padding: '10px 15px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#E75A7C', marginRight: '10px' }}></div>
          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Buscar...</span>
        </div>
        
        <div className="user-avatar" style={{
          position: 'absolute',
          bottom: '-40px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#E75A7C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          fontWeight: 'bold',
          color: 'white',
          border: '3px solid #000000',
          zIndex: 10
        }}>
          {getUserInitials()}
        </div>
      </div>
      
      <div className="profile-content" style={{
        flex: 1,
        backgroundColor: 'white',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        padding: '60px 20px 20px',
        color: '#000000',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        <div className="profile-tabs" style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <div className={`tab-indicator ${activeTab === 'reciente' ? 'active' : ''}`} style={{
              height: '4px',
              width: '30px',
              backgroundColor: activeTab === 'reciente' ? '#E75A7C' : '#ccc',
              borderRadius: '2px',
              margin: '0 5px',
              cursor: 'pointer'
            }} onClick={() => setActiveTab('reciente')}></div>
            <div className={`tab-indicator ${activeTab === '3nights' ? 'active' : ''}`} style={{
              height: '4px',
              width: '30px',
              backgroundColor: activeTab === '3nights' ? '#E75A7C' : '#ccc',
              borderRadius: '2px',
              margin: '0 5px',
              cursor: 'pointer'
            }} onClick={() => setActiveTab('3nights')}></div>
            <div className={`tab-indicator ${activeTab === '4months' ? 'active' : ''}`} style={{
              height: '4px',
              width: '30px',
              backgroundColor: activeTab === '4months' ? '#E75A7C' : '#ccc',
              borderRadius: '2px',
              margin: '0 5px',
              cursor: 'pointer'
            }} onClick={() => setActiveTab('4months')}></div>
          </div>
        </div>
        
        <div className="profile-categories" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <div className={`category ${activeTab === 'today' ? 'active' : ''}`} style={{
            backgroundColor: activeTab === 'today' ? '#E75A7C' : '#eee',
            color: activeTab === 'today' ? 'white' : '#666',
            padding: '5px 15px',
            borderRadius: '15px',
            fontSize: '12px',
            cursor: 'pointer'
          }} onClick={() => setActiveTab('today')}>
            3 nights
          </div>
          <div className={`category ${activeTab === '4months' ? 'active' : ''}`} style={{
            backgroundColor: activeTab === '4months' ? '#E75A7C' : '#eee',
            color: activeTab === '4months' ? 'white' : '#666',
            padding: '5px 15px',
            borderRadius: '15px',
            fontSize: '12px',
            cursor: 'pointer'
          }} onClick={() => setActiveTab('4months')}>
            4 months
          </div>
          <div className={`category ${activeTab === 'today' ? 'active' : ''}`} style={{
            backgroundColor: activeTab === 'today' ? '#E75A7C' : '#E75A7C',
            color: 'white',
            padding: '5px 15px',
            borderRadius: '15px',
            fontSize: '12px',
            cursor: 'pointer'
          }} onClick={() => setActiveTab('today')}>
            today
          </div>
        </div>
        
        <div className="content-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '15px'
        }}>
          <div className="grid-item" style={{
            backgroundColor: '#000',
            borderRadius: '15px',
            aspectRatio: '1/1',
            position: 'relative'
          }}></div>
          <div className="grid-item" style={{
            backgroundColor: '#000',
            borderRadius: '15px',
            aspectRatio: '1/1',
            position: 'relative'
          }}></div>
        </div>
        
        <div className="action-button" style={{
          position: 'fixed',
          bottom: '40px',
          right: '40px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#E75A7C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '30px',
          color: 'white',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          cursor: 'pointer'
        }}>
          +
        </div>
        
        <div className="bottom-nav" style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60px',
          backgroundColor: '#000000',
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          color: 'white'
        }}>
          <div style={{ fontSize: '20px', padding: '0 20px' }}>🏠</div>
          <div style={{ fontSize: '20px', padding: '0 20px' }}>🔍</div>
          <div style={{ fontSize: '20px', padding: '0 20px' }}>💬</div>
          <div style={{ fontSize: '20px', padding: '0 20px' }}>👤</div>
        </div>
        
        <div className="user-name-title" style={{
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          marginTop: '10px',
          marginBottom: '5px'
        }}>
          {userData.nombre} {userData.apellido}
        </div>
        
        <div className="user-role-subtitle" style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#777',
          marginBottom: '20px'
        }}>
          {userData.rol} - {userData.carrera}
        </div>
        
        <div className="user-stats" style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '20px'
        }}>
          <div className="stat" style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>157</div>
            <div style={{ fontSize: '12px', color: '#777' }}>Posts</div>
          </div>
          <div className="stat" style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>325</div>
            <div style={{ fontSize: '12px', color: '#777' }}>Followers</div>
          </div>
          <div className="stat" style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>285</div>
            <div style={{ fontSize: '12px', color: '#777' }}>Following</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModule;

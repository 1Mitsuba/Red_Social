import React from 'react';
import '../styles/globalStyles.css';

// Iconos de ejemplo
const icons = [
  { name: 'Recent', icon: '🕒' },
  { name: 'Collections', icon: '📦' },
  { name: 'History', icon: '📜' },
  { name: 'Profile', icon: '👤' }
];

const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar-logo">CC</div>
    <div className="sidebar-icons">
      {icons.slice(0,3).map((item, idx) => (
        <div key={item.name} className="sidebar-icon">
          <span>{item.icon}</span>
        </div>
      ))}
    </div>
    <div className="sidebar-profile">
      <img src="https://ui-avatars.com/api/?name=Usuario" alt="avatar" />
      <div className="sidebar-profile-name">Usuario</div>
    </div>
  </aside>
);

const MainLayout = ({ children }) => (
  <div className="main-layout">
    <Sidebar />
    <main className="main-content">
      {children}
    </main>
  </div>
);

export default MainLayout;

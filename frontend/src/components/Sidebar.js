import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar({ handleLogout = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <div className="burger-button" onClick={toggleSidebar}>
        ☰
      </div>

      {isOpen && (
        <aside className="custom-sidebar">
          <ul className="sidebar-menu">
            <li><button onClick={() => navigate('/home')}>🏠 Acasă</button></li>
            <li><button onClick={() => navigate('/history')}>📜 Căutări</button></li>
            <li><button onClick={() => navigate('/favorites')}>⭐ Favorite</button></li>
            <li><button onClick={() => navigate('/account')}>👤 Cont</button></li>
            <li><button onClick={handleLogout}>🚪 Logout</button></li>
          </ul>
        </aside>
      )}
    </>
  );
}

export default Sidebar;

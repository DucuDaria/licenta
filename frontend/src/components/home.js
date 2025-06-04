import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import '../styles/Home.css';
import Sidebar from './Sidebar';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/rezultate?termen=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="home-container">
      <Sidebar handleLogout={handleLogout} />
      <main className="home-content">
        <div className="home-welcome">
          <h1>Bun venit în aplicația de comparare a prețurilor</h1>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Caută un produs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Caută</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Home;

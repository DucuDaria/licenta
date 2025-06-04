import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StartPage.css'; // pentru stilizare

function StartPage() {
  const navigate = useNavigate();

  return (
    <div className="start-page">
      <h1>Bine ai venit la Price Comparator!</h1>
      <div className="buttons">
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/register')}>Înregistrează-te</button>
      </div>
    </div>
  );
}

export default StartPage;

import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Autentificare reușită!');
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Cont creat cu succes!');
      navigate('/home');
    } catch (error) {
      alert('Eroare: ' + error.message);
    }
  };

  return (
    <div className="login-background">
      <div className="login-card">
        <h2>Conectează-te</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <span className="icon">📧</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder="Parolă"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn primary">Autentificare</button>
          <button type="button" onClick={handleRegister} className="btn secondary">
            Creează cont
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

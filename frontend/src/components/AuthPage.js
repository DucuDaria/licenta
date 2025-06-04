import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthPage.css';

function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/auth');
  };

  const saveUserToOracle = async (user) => {
    try {
      await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          parola: password,
          displayName: user.displayName || ''
        })
      });
    } catch (err) {
      console.error('Eroare la salvare utilizator Oracle:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await saveUserToOracle(userCredential.user); // 🔄 adaugă în Oracle
      alert('Autentificare reușită!');
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await saveUserToOracle(userCredential.user); // 🔄 adaugă în Oracle
      alert('Cont creat cu succes!');
      navigate('/home');
    } catch (error) {
      console.error('Register error:', error);
      alert(`Eroare la înregistrare: ${error.code} - ${error.message}`);
    }
  };

  return (
    <div className="auth-background">
      <div className="auth-card">
        <h2>Autentificare / Înregistrare</h2>
        <form onSubmit={handleLogin} autoComplete="off" className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Parolă"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="buttons">
            <button type="submit">Login</button>
            <button type="button" onClick={handleRegister}>
              Înregistrează-te
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;

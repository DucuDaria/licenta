
import { useState, useEffect } from 'react';
import { auth } from './services/firebase';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom';


import AccountPage from './components/AccountPage';
import HistoryPage from './components/HistoryPage';
import AuthPage from './components/AuthPage';
import Home from './components/home';
import ProductsPage from './components/ProductsPage';
import Sidebar from './components/Sidebar';
import Rezultate from './components/rezultate'; 
import FavoritesPage from './components/FavoritesPage';

import './styles/app.css';
import './styles/AuthPage.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/auth');
  };

  const isAuthPage = location.pathname === '/auth';

  if (loading) {
    return <div>Se încarcă...</div>;
  }

  return (
    <div className={isAuthPage ? 'auth-background' : 'app-container'}>
      {user && !isAuthPage && (
        <Sidebar
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          handleLogout={handleLogout}
        />
      )}

      <div className="content-container">
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/auth" />} />
          <Route path="/produse" element={user ? <ProductsPage /> : <Navigate to="/auth" />} />
          <Route path="/history" element={user ? <HistoryPage /> : <Navigate to="/auth" />} />
          <Route path="/account" element={user ? <AccountPage /> : <Navigate to="/auth" />} />
          <Route path="/rezultate" element={user ? <Rezultate /> : <Navigate to="/auth" />} /> {/* ✅ ADĂUGAT */}
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

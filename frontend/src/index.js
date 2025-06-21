// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './firebase'; 

export const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
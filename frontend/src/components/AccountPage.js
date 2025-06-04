import React from 'react';
import { auth } from '../services/firebase';

function AccountPage() {
  const user = auth.currentUser;

  if (!user) {
    return <div>Nu ești autentificat.</div>;
  }

  return (
    <div style={styles.container}>
      <h2>Detalii cont</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>User ID:</strong> {user.uid}</p>
      {/* Adaugă mai multe date dacă ai nevoie */}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#fff',
    maxWidth: '600px',
    margin: '2rem auto',
    borderRadius: '12px',
    boxShadow: '0 0 12px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif'
  }
};

export default AccountPage;

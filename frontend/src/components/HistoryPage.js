import React, { useEffect, useState } from 'react';
import { getSearchHistory } from '../services/api';
import { auth } from '../services/firebase';

function HistoryPage() {
  const [cautari, setCautari] = useState([]);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    getSearchHistory(uid)
      .then(data => setCautari(data))
      .catch(err => console.error("Eroare la citire istoric:", err));
  }, []);

  return (
    <div>
      <h2>Istoric Căutări</h2>
      {cautari.length === 0 ? (
        <p>Nu există căutări salvate.</p>
      ) : (
        <ul>
          {cautari.map((item, index) => (
            <li key={index}>
              {item.term} — {new Date(item.timestamp?.toDate()).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HistoryPage;

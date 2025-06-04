import React, { useEffect, useState } from 'react';
import { useAuth } from '../firebase';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import '../styles/HistoryPage.css';

function HistoryPage() {
  const { currentUser } = useAuth();
  const [istoric, setIstoric] = useState([]);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        if (!currentUser) return;

        const q = query(
          collection(db, 'searches'),
          where('uid', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(q);

        const searchList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setIstoric(searchList);
      } catch (error) {
        console.error('Eroare la încărcarea istoricului:', error);
        setIstoric([]);
      }
    };

    fetchSearchHistory();
  }, [currentUser]);

  return (
    <div className="history-container">
      <h2>Istoric Căutări</h2>
      <ul>
        {Array.isArray(istoric) && istoric.map((item, index) => (
          <li key={index}>
            {item.query} – {new Date(item.timestamp?.seconds * 1000).toLocaleString()}
          </li>
        ))}
        {istoric.length === 0 && <li>Nu există căutări înregistrate.</li>}
      </ul>
    </div>
  );
}

export default HistoryPage;

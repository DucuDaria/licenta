import React, { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from '../services/firebase';
import { useLocation } from 'react-router-dom';
import { auth } from '../services/firebase';
import { cautaProduse } from '../services/api';

function Rezultate() {
  const [produse, setProduse] = useState([]);
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const termen = new URLSearchParams(location.search).get('termen');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUid(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (!termen) return;
      try {
        const data = await cautaProduse(termen);
        console.log("📦 Produse:", data); // Debug
        setProduse(data || []);
        if (uid) {
          await addDoc(collection(db, "searches"), {
            uid,
            term: termen,
            timestamp: serverTimestamp(),
          });
        }
      } catch (err) {
        console.error("Eroare la încărcarea rezultatelor:", err);
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchResults();
    }
  }, [termen, uid]);

  if (loading) {
    return <div style={{ padding: '2rem' }}>Se încarcă...</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Rezultate pentru: <em>{termen}</em></h2>
      {!produse || produse.length === 0 ? (
        <p>Nu s-au găsit produse.</p>
      ) : (
        <ul>
          {produse.map((produs) => (
            <li key={produs.id || produs.denumire}>
              <strong>{produs.denumire}</strong> – {produs.pret} lei<br />
              Link: <a href={produs.link_cumparare} target="_blank" rel="noopener noreferrer">{produs.link_cumparare}</a><br />
              ID Magazin: {produs.id_magazin}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Rezultate;

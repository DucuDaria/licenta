import React, { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from '../services/firebase';
import { useLocation } from 'react-router-dom';
import { auth } from '../services/firebase';
import { cautaProduse } from '../services/api';

function Rezultate() {
  const [produse, setProduse] = useState([]);
  const [uid, setUid] = useState(null);

  const location = useLocation();
  const termen = new URLSearchParams(location.search).get('termen');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUid(user.uid);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await cautaProduse(termen);
        setProduse(data);

        if (uid) {
          await addDoc(collection(db, "searches"), {
            uid,
            term: termen,
            timestamp: serverTimestamp(),
          });
        }
      } catch (err) {
        console.error("Eroare la încărcarea rezultatelor:", err);
      }
    };

    if (termen && uid) {
      fetchResults();
    }
  }, [termen, uid]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Rezultate pentru: {termen}</h2>
      {produse.length === 0 ? (
        <p>Nu s-au găsit produse.</p>
      ) : (
        <ul>
          {produse.map((produs) => (
            <li key={produs.id}>
              <strong>{produs.denumire}</strong> - {produs.pret} lei
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Rezultate;

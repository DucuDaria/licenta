import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cautaProduse } from '../services/api';
import ProductsList from './ProductsList'

function Rezultate() {
  const [produse, setProduse] = useState([]);
  const location = useLocation();
  const termen = new URLSearchParams(location.search).get('termen');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await cautaProduse(termen);
        setProduse(data);
      } catch (err) {
        console.error("Eroare la încărcarea rezultatelor:", err);
      }
    };
    if (termen) fetchResults();
  }, [termen]);

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

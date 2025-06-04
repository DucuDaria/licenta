import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Rezultate() {
  const [produse, setProduse] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const termen = params.get('termen');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/search/${encodeURIComponent(termen)}`);
        const data = await res.json();
        setProduse(data);
      } catch (error) {
        console.error("Eroare la încărcarea rezultatelor:", error);
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
          {produse.map((produs, index) => (
            <li key={index}>
              <strong>{produs.nume}</strong> - {produs.pret} lei
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Rezultate;

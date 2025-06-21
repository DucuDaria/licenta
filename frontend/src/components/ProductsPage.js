import React, { useEffect, useState } from 'react';
import { getAllProduse } from '../services/api';
// În ProductsPage sau Rezultate
import ProductsList from './ProductsList';


function ProductsPage() {
  const [produse, setProduse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduse = async () => {
      try {
        const data = await getAllProduse();
        setProduse(data);
      } catch (error) {
        console.error("Eroare la încărcarea produselor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduse();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Toate produsele</h2>
      {loading ? (
        <p>Se încarcă...</p>
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

export default ProductsPage;
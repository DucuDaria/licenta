import React, { useEffect, useState } from 'react';

function ProductsPage() {
  const [produse, setProduse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduse = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
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
      <h2>Lista de produse</h2>
      {loading ? (
        <p>Se încarcă...</p>
      ) : (
        <ul>
          {produse.map(produs => (
            <li key={produs.id}>
              <strong>{produs.nume}</strong> - {produs.pret} lei
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductsPage;

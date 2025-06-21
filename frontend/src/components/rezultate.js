import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cautaProduse } from '../services/api';
import '../styles/ResultsPage.css';

function Rezultate() {
  const [produse, setProduse] = useState([]);
  const [filtru, setFiltru] = useState('toate');
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const termen = new URLSearchParams(location.search).get('termen');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await cautaProduse(termen);
        setProduse(data);
      } catch (err) {
        console.error("Eroare la încărcarea rezultatelor:", err);
      } finally {
        setLoading(false);
      }
    };

    if (termen) {
      fetchResults();
    }
  }, [termen]);

  const aplicaFiltru = () => {
    let rezultate = [...produse];

    switch (filtru) {
      case 'sub5':
        return rezultate.filter(p => p.pret < 5);
      case 'peste5':
        return rezultate.filter(p => p.pret >= 5);
      case 'pretCresc':
        return rezultate.sort((a, b) => a.pret - b.pret);
      case 'pretDesc':
        return rezultate.sort((a, b) => b.pret - a.pret);
      case 'alphaAsc':
        return rezultate.sort((a, b) => a.denumire.localeCompare(b.denumire));
      case 'alphaDesc':
        return rezultate.sort((a, b) => b.denumire.localeCompare(a.denumire));
      case 'idMagCresc':
        return rezultate.sort((a, b) => (a.id_magazin || 0) - (b.id_magazin || 0));
      case 'idMagDesc':
        return rezultate.sort((a, b) => (b.id_magazin || 0) - (a.id_magazin || 0));
      default:
        return rezultate;
    }
  };

  const produseAfisate = aplicaFiltru();

  if (loading) return <div style={{ padding: '2rem' }}>Se încarcă...</div>;

  return (
    <div className="rezultate-container">
      <h2>Rezultate pentru: <em>{termen}</em></h2>

      {/* Bara de filtre */}
      <div className="filtre-box">
        <button className="filtru-btn" onClick={() => setFiltru('toate')}>Toate</button>
        <button className="filtru-btn" onClick={() => setFiltru('sub5')}>Sub 5 lei</button>
        <button className="filtru-btn" onClick={() => setFiltru('peste5')}>Peste 5 lei</button>
        <button className="filtru-btn" onClick={() => setFiltru('pretCresc')}>Preț ↑</button>
        <button className="filtru-btn" onClick={() => setFiltru('pretDesc')}>Preț ↓</button>
        <button className="filtru-btn" onClick={() => setFiltru('alphaAsc')}>A–Z</button>
        <button className="filtru-btn" onClick={() => setFiltru('alphaDesc')}>Z–A</button>
        <button className="filtru-btn" onClick={() => setFiltru('idMagCresc')}>ID Magazin ↑</button>
        <button className="filtru-btn" onClick={() => setFiltru('idMagDesc')}>ID Magazin ↓</button>
      </div>

      {produseAfisate.length === 0 ? (
        <p>Nu s-au găsit produse.</p>
      ) : (
        <ul className="produse-lista">
          {produseAfisate.map((produs) => (
            <li key={produs.id || produs.denumire} className="produs-card">
              <strong>{produs.denumire}</strong> – {produs.pret} lei<br />
              <a href={produs.link_cumparare} target="_blank" rel="noopener noreferrer">
                Cumpără {produs.link_cumparare}
              </a><br />
              ID Magazin: {produs.id_magazin}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Rezultate;

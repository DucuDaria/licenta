import '../styles/ProductsList.css';
import React, { useEffect, useState } from 'react';
import { getAllProduse } from '../services/api'; // ai deja definit în api.js
import Paginator from './Paginator'; // trebuie să existe
import { useNavigate } from 'react-router-dom';

const ProductsList = () => {
  const [produse, setProduse] = useState([]);
  const [paginaCurenta, setPaginaCurenta] = useState(1);
  const [dimensiunePagina, setDimensiunePagina] = useState(10);
  const [filtru, setFiltru] = useState('');
  const [sort, setSort] = useState('denumire_asc');
  const navigate = useNavigate();

  const fetchProduse = async () => {
    try {
      const toateProdusele = await getAllProduse(); // fără paginare la Oracle => filtrăm în frontend
      let filtrate = toateProdusele;

      if (filtru) {
        filtrate = filtrate.filter(p => p.denumire.toLowerCase().includes(filtru.toLowerCase()));
      }

      if (sort === 'denumire_asc') {
        filtrate.sort((a, b) => a.denumire.localeCompare(b.denumire));
      } else if (sort === 'denumire_desc') {
        filtrate.sort((a, b) => b.denumire.localeCompare(a.denumire));
      }

      const start = (paginaCurenta - 1) * dimensiunePagina;
      const end = start + dimensiunePagina;
      setProduse(filtrate.slice(start, end));
    } catch (err) {
      console.error('Eroare la încărcarea produselor:', err);
    }
  };

  useEffect(() => {
    fetchProduse();
  }, [paginaCurenta, dimensiunePagina, filtru, sort]);

  return (
    <div className='products-list'>
      <h1>Listă Produse</h1>
      <input
        type="text"
        placeholder="Caută după denumire..."
        onChange={(e) => {
          setFiltru(e.target.value);
          setPaginaCurenta(1);
        }}
      />
      <table>
        <thead>
          <tr>
            <th>
              Denumire
              <button onClick={() => setSort('denumire_asc')}>⬆</button>
              <button onClick={() => setSort('denumire_desc')}>⬇</button>
            </th>
            <th>Preț</th>
          </tr>
        </thead>
        <tbody>
          {produse.map((produs) => (
            <tr key={produs.id}>
              <td>{produs.denumire}</td>
              <td>{produs.pret} lei</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginator
        onPageChange={(pagina) => setPaginaCurenta(pagina)}
        onPageSizeChange={(size) => setDimensiunePagina(size)}
        totalRecords={produse.length}
      />
      <div className='footer'>
        <button onClick={() => navigate('/produse')}>Înapoi</button>
      </div>
    </div>
  );
};

export default ProductsList;

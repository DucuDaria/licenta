import '../styles/ProductsList.css';
import React, { useEffect, useState } from 'react';
import { getAllProduse } from '../services/api';
import Paginator from './Paginator';
import { useNavigate } from 'react-router-dom';

const ProductsList = () => {
  const [toateProdusele, setToateProdusele] = useState([]); // 🟡 toate produsele din API
  const [produse, setProduse] = useState([]); // 🔵 doar pagina curentă
  const [paginaCurenta, setPaginaCurenta] = useState(1);
  const [dimensiunePagina, setDimensiunePagina] = useState(10);
  const [filtru, setFiltru] = useState('');
  const [sort, setSort] = useState('denumire_asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduse = async () => {
      try {
        const toate = await getAllProduse();
        setToateProdusele(toate);
      } catch (err) {
        console.error('Eroare la încărcarea produselor:', err);
      }
    };
    fetchProduse();
  }, []);

  useEffect(() => {
    let filtrate = [...toateProdusele];

    if (filtru) {
      filtrate = filtrate.filter(p =>
        p.denumire.toLowerCase().includes(filtru.toLowerCase())
      );
    }

    if (sort === 'denumire_asc') {
      filtrate.sort((a, b) => a.denumire.localeCompare(b.denumire));
    } else if (sort === 'denumire_desc') {
      filtrate.sort((a, b) => b.denumire.localeCompare(a.denumire));
    }

    const start = (paginaCurenta - 1) * dimensiunePagina;
    const end = start + dimensiunePagina;
    setProduse(filtrate.slice(start, end));
  }, [toateProdusele, paginaCurenta, dimensiunePagina, filtru, sort]);

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
        onPageSizeChange={(size) => {
          setDimensiunePagina(size);
          setPaginaCurenta(1);
        }}
        totalRecords={
          toateProdusele.filter(p =>
            p.denumire.toLowerCase().includes(filtru.toLowerCase())
          ).length
        }
      />

      <div className='footer'>
        <button onClick={() => navigate('/produse')}>Înapoi</button>
      </div>
    </div>
  );
};

export default ProductsList;

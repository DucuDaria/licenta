import React from 'react';
import axios from 'axios';

function ScrapeButton() {
  const handleScrape = async () => {
    const url = prompt("Introdu URL-ul paginii de produse:");
    if (!url) return;
    try {
      await axios.post('http://localhost:5000/api/products/scrape', { url });
      alert('Scraping completed!');
    } catch (error) {
      console.error(error);
      alert('Scraping failed!');
    }
  };

  return <button onClick={handleScrape}>Scrape Products</button>;
}

export default ScrapeButton;

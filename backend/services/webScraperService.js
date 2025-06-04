const axios = require('axios');
const cheerio = require('cheerio');
const getConnection = require('../db/oracle'); // conecta-te la baza ta

// exemplu: scraping Emag, dar adaptabil ușor
async function scrapeAndInsert(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const connection = await getConnection();

    $('.card-item, .product-title').each(async (index, element) => {
      const nume = $(element).find('.product-title').text().trim();
      const pretText = $(element).find('.price-current').text().trim();
      const pret = parseFloat(pretText.replace(/[^\d,]/g, '').replace(',', '.'));

      if (nume && !isNaN(pret)) {
        await connection.execute(
          `INSERT INTO produse (nume, pret, data_adaugare) VALUES (:nume, :pret, SYSDATE)`,
          [nume, pret],
          { autoCommit: true }
        );
      }
    });

    await connection.close();
  } catch (error) {
    console.error("Eroare la scraping:", error);
    throw error;
  }
}

module.exports = { scrapeAndInsert };

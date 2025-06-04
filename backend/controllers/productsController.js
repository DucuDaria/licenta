const { getProductsFromDB } = require('../services/oracleService');
const { scrapeAndInsert } = require('../services/webScraperService');

exports.scrapeProducts = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: "URL lipsă." });

  try {
    await scrapeAndInsert(url);
    res.json({ message: "Scraping și inserare completate." });
  } catch (error) {
    console.error("Eroare scraping:", error);
    res.status(500).json({ message: "Eroare scraping." });
  }
};

exports.getAllProducts = async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(`SELECT * FROM produse`);
    const rows = result.rows.map(row => ({
      id: row[0],
      nume: row[1],
      pret: row[2],
      data_adaugare: row[3],
    }));
    res.json(rows);
  } catch (error) {
    console.error("Eroare SELECT produse:", error);
    res.status(500).json({ error: "Eroare la citirea produselor" });
  } finally {
    if (connection) await connection.close();
  }
};

exports.getProductsBySearch = async (req, res) => {
  const query = req.params.query.toLowerCase();

  try {
    const connection = await getConnection();
    const result = await connection.execute(
      `SELECT nume, pret FROM produse WHERE LOWER(nume) LIKE :term`,
      [`%${query}%`]
    );

    const products = result.rows.map(row => ({
      nume: row[0],
      pret: row[1]
    }));

    res.json(products);
  } catch (err) {
    console.error("Eroare la căutare:", err);
    res.status(500).json({ error: 'Eroare la căutare produse' });
  }
};



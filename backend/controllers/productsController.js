const { getAllProducts, getProductsBySearch } = require('../services/oracleService');

exports.getAllProducts = async (req, res) => {
  try {
    const produse = await getAllProducts();
    res.json(produse);
  } catch (err) {
    console.error("Eroare:", err);
    res.status(500).json({ error: 'Eroare server' });
  }
};

exports.getProductsBySearch = async (req, res) => {
  try {
    const { termen } = req.params;
    const produse = await getProductsBySearch(termen);
    res.json(produse);
  } catch (err) {
    console.error("Eroare căutare:", err);
    res.status(500).json({ error: 'Eroare server' });
  }
};
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const offset = (page - 1) * limit;

const result = await conn.execute(
  `SELECT * FROM produse OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY`,
  { offset, limit }
);

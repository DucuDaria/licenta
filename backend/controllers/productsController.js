const { getAllProducts, getProductsBySearch } = require('../services/oracleService');

exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const produse = await getAllProducts({ limit, offset }); // trimite la serviciu dacă îl folosești
    res.json(produse);
  } catch (err) {
    console.error("Eroare:", err);
    res.status(500).json({ error: 'Eroare server' });
  }
};

exports.getProductsBySearch = async (req, res) => {
  try {
    const { termen } = req.params;
    const produse = await getProductsBySearchFromDB(termen);
    res.json(produse);
  } catch (err) {
    console.error("Eroare în controller:", err);
    res.status(500).json({ error: 'Eroare server' });
  }
};
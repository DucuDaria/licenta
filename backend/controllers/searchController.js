const { insertSearch, getSearchHistory } = require('../services/oracleService');

exports.saveSearch = async (req, res) => {
  const { uid, termen } = req.body;
  if (!uid || !termen) return res.status(400).json({ error: 'Lipsă uid sau termen' });

  try {
    await insertSearch(uid, termen);
    res.json({ success: true });
  } catch (error) {
    console.error("Eroare salvare căutare:", error);
    res.status(500).json({ error: 'Eroare salvare căutare' });
  }
};

exports.getHistory = async (req, res) => {
  const { uid } = req.query;
  if (!uid) return res.status(400).json({ error: 'Lipsă uid' });

  try {
    const results = await getSearchHistory(uid);
    res.json(results.map(([termen, data]) => ({ termen, data })));
  } catch (error) {
    console.error("Eroare citire istoric:", error);
    res.status(500).json({ error: 'Eroare citire istoric' });
  }
};

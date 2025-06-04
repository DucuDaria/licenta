const { insertUserIntoDB } = require('../services/oracleService');

exports.saveUser = async (req, res) => {
  const { uid, email } = req.body;
  try {
    await insertUserIntoDB(uid, email);
    res.json({ message: 'User saved successfully in Oracle DB.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save user.' });
  }
};

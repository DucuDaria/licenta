const { getConnection } = require('../services/oracleService');

exports.registerUser = async (req, res) => {
  const { email, parola } = req.body;
  if (!email || !parola) return res.status(400).json({ error: "Email și parolă sunt obligatorii" });

  let conn;
  try {
    conn = await getConnection();
    await conn.execute(
      `INSERT INTO utilizatori ( email, parola, data_creare)
       VALUES (:email, :parola, SYSDATE)`,
      { email, parola },
      { autoCommit: true }
    );
    res.status(200).json({ message: "Înregistrare reușită" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Eroare la înregistrare" });
  } finally {
    if (conn) await conn.close();
  }
};

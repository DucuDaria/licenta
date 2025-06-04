const getConnection = require('../db/oracle');

exports.registerUser = async (req, res) => {
  const { email, parola } = req.body;

  if (!email || !parola) {
    return res.status(400).json({ error: "Email și parolă sunt obligatorii." });
  }

  let connection;
  try {
    connection = await getConnection();

    const existing = await connection.execute(
      `SELECT * FROM utilizatori WHERE email = :email`,
      [email]
    );

    if (existing.rows.length === 0) {
      await connection.execute(
        `INSERT INTO utilizatori (email, parola) VALUES (:email, :parola)`,
        [email, parola],
        { autoCommit: true }
      );
    }

    res.status(200).json({ message: "Utilizator salvat în Oracle." });

  } catch (error) {
    console.error("Eroare Oracle:", error);
    res.status(500).json({ error: "Eroare Oracle" });
  } finally {
    if (connection) await connection.close();
  }
};

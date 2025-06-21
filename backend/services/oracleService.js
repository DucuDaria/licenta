require('dotenv').config();
const oracledb = require('oracledb');

// 1. Conectare la Oracle
async function getConnection() {
  return await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING
  });
}

// 2. Obține toate produsele
async function getAllProducts() {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT id_produs, denumire, pret FROM produse`
  );
  await conn.close();

  return result.rows.map(row => ({
    id_produs: row[0],
    denumire: row[1],
    pret: row[2]
  }));
}

// 3. Caută produse după termen
async function getProductsBySearch(searchTerm) {
  const connection = await getConnection();
  const result = await connection.execute(
    `SELECT id_produs, denumire, pret FROM produse WHERE LOWER(denumire) LIKE :term`,
    { term: `%${searchTerm.toLowerCase()}%` }
  );
  await connection.close();
  return result.rows.map(([id, denumire, pret]) => ({ id, denumire, pret }));
}


// 4. Inserare căutare în tabelul CAUTARI
async function insertSearch(uid, termen) {
  const conn = await getConnection();
  await conn.execute(
    `INSERT INTO cautari (id_utilizator, termen, data_cautare)
     VALUES (:uid, :termen, SYSDATE)`,
    { uid, termen },
    { autoCommit: true }
  );
  await conn.close();
}

// 5. Istoric căutări pentru un utilizator
async function getSearchHistory(uid) {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT termen, TO_CHAR(data_cautare, 'YYYY-MM-DD HH24:MI') AS data_cautare
     FROM cautari
     WHERE id_utilizator = :uid
     ORDER BY data_cautare DESC`,
    { uid }
  );
  await conn.close();

  return result.rows.map(row => ({
    termen: row[0],
    data_cautare: row[1]
  }));
}

// 6. Inserare utilizator dacă nu există deja
async function insertUserIntoDB(uid, email) {
  const conn = await getConnection();
  await conn.execute(
    `MERGE INTO utilizatori u USING dual ON (u.id_utilizator = :uid)
     WHEN NOT MATCHED THEN
     INSERT (id_utilizator, email, data_creare)
     VALUES (:uid, :email, SYSDATE)`,
    { uid, email },
    { autoCommit: true }
  );
  await conn.close();
}

module.exports = {
  getConnection,
  getAllProducts,
  getProductsBySearch,
  insertSearch,
  getSearchHistory,
  insertUserIntoDB
};

const oracledb = require('oracledb');

const dbConfig = {
  user: "daria",
  password: "daria",
  connectString: "localhost/XEPDB1"
};

async function getConnection() {
  return await oracledb.getConnection(dbConfig);
}

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
  return result.rows;
}

async function insertUserIntoDB(uid, email) {
  const conn = await getConnection();
  await conn.execute(
    `MERGE INTO utilizatori u USING dual ON (u.id_utilizator = :uid)
     WHEN NOT MATCHED THEN
     INSERT (id_utilizator, email, data_creare) VALUES (:uid, :email, SYSDATE)`,
    { uid, email },
    { autoCommit: true }
  );
  await conn.close();
}

module.exports = {
  getConnection,
  insertSearch,
  getSearchHistory,
  insertUserIntoDB
};

const oracledb = require('oracledb');

async function getConnection() {
  return await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING
  });
}

async function getProductsBySearchFromDB(termen) {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT id_produs, denumire, pret, link_cumparare, id_magazin FROM produse WHERE LOWER(denumire) LIKE :termen`,
    { termen: `%${termen.toLowerCase()}%` }
  );
  await conn.close();

  return result.rows.map(([id, denumire, pret, link, id_magazin]) => ({
    id,
    denumire,
    pret,
    link_cumparare: link,
    id_magazin
  }));
}

module.exports = { getProductsBySearchFromDB };

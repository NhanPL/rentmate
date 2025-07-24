const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // hoặc config riêng
});

const findByUsername = async (username) => {
  const res = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return res.rows[0];
};

const create = async ({ username, password, full_name, email }) => {
  const res = await pool.query(
    `INSERT INTO users (username, password, full_name, email)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [username, password, full_name, email]
  );
  return res.rows[0];
};

module.exports = {
  findByUsername,
  create,
};

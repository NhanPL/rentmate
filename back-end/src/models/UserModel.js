const pool = require("../db/pool"); // Sửa lại đường dẫn pool dùng chung

const findByUsername = async (username) => {
  // Sửa lại cú pháp truy vấn tham số
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

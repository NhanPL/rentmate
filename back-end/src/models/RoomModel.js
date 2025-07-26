const pool = require("../db/pool");

const getAll = async () => {
  const res = await pool.query("SELECT * FROM rooms ORDER BY id");
  return res.rows;
};

const getById = async (id) => {
  const res = await pool.query("SELECT * FROM rooms WHERE id = $1", [id]);
  return res.rows[0];
};

const create = async ({ name, type, status, description }) => {
  const res = await pool.query(
    `INSERT INTO rooms (name, type, status, description)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, type, status, description]
  );
  return res.rows[0];
};

const update = async (id, { name, type, status, description }) => {
  const res = await pool.query(
    `UPDATE rooms SET name=$2, type=$3, status=$4, description=$5 WHERE id=$1 RETURNING *`,
    [id, name, type, status, description]
  );
  return res.rows[0];
};

const remove = async (id) => {
  await pool.query("DELETE FROM rooms WHERE id = $1", [id]);
  return true;
};

module.exports = { getAll, getById, create, update, remove };

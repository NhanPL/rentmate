const pool = require("../db/pool");

const RoomModel = {
  async getAll() {
    const res = await pool.query("SELECT * FROM rooms ORDER BY id");
    return res.rows;
  },
  async getById(id) {
    const res = await pool.query("SELECT * FROM rooms WHERE id = $1", [id]);
    return res.rows[0];
  },
  async create(data) {
    const { name, type, status, description } = data;
    const res = await pool.query(
      `INSERT INTO rooms (name, type, status, description)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, type, status, description]
    );
    return res.rows[0];
  },
  async update(id, data) {
    const { name, type, status, description } = data;
    const res = await pool.query(
      `UPDATE rooms SET name=$2, type=$3, status=$4, description=$5 WHERE id=$1 RETURNING *`,
      [id, name, type, status, description]
    );
    return res.rows[0];
  },
  async delete(id) {
    await pool.query("DELETE FROM rooms WHERE id = $1", [id]);
  },
};

module.exports = RoomModel;

const pool = require("../db/pool");

const ApartmentModel = {
  async getAll() {
    const res = await pool.query("SELECT * FROM apartments");
    return res.rows;
  },
  async getById(id) {
    const res = await pool.query("SELECT * FROM apartments WHERE id = $1", [
      id,
    ]);
    return res.rows[0];
  },
  async create(data) {
    const { name, address, fileId, fileUrl } = data;
    const res = await pool.query(
      "INSERT INTO apartments (name, address, file_id, fileurl) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, address, fileId, fileUrl]
    );
    return res.rows[0];
  },
  async update(id, data) {
    const { name, address, fileId } = data;
    const res = await pool.query(
      "UPDATE apartments SET name = $1, address = $2, file_id = $3 WHERE id = $4 RETURNING *",
      [name, address, fileId, id]
    );
    return res.rows[0];
  },
  async delete(id) {
    await pool.query("DELETE FROM apartments WHERE id = $1", [id]);
  },
};

module.exports = ApartmentModel;

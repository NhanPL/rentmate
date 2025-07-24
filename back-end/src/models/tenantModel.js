const pool = require("../db");

const Tenant = {
  async getAll() {
    const res = await pool.query("SELECT * FROM tenants");
    return res.rows;
  },
  async getById(id) {
    const res = await pool.query("SELECT * FROM tenants WHERE id = $1", [id]);
    return res.rows[0];
  },
  async create(data) {
    const { name, phone, email } = data;
    const res = await pool.query(
      "INSERT INTO tenants (name, phone, email) VALUES ($1, $2, $3) RETURNING *",
      [name, phone, email]
    );
    return res.rows[0];
  },
  async update(id, data) {
    const { name, phone, email } = data;
    const res = await pool.query(
      "UPDATE tenants SET name = $1, phone = $2, email = $3 WHERE id = $4 RETURNING *",
      [name, phone, email, id]
    );
    return res.rows[0];
  },
  async delete(id) {
    await pool.query("DELETE FROM tenants WHERE id = $1", [id]);
  },
};

module.exports = Tenant;

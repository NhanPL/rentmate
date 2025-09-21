const pool = require("../db/pool");

const ContractModel = {
  async getAll() {
    const res = await pool.query("SELECT * FROM rental_contracts");
    return res.rows;
  },
  async getById(id) {
    const res = await pool.query(
      "SELECT * FROM rental_contracts WHERE id = $1",
      [id]
    );
    return res.rows[0];
  },
  async create(data) {
    const { apartment_id, tenant_id, start_date, end_date, rent_amount } = data;
    const res = await pool.query(
      "INSERT INTO rental_contracts (apartment_id, tenant_id, start_date, end_date, rent_amount) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [apartment_id, tenant_id, start_date, end_date, rent_amount]
    );
    return res.rows[0];
  },
  async update(id, data) {
    const { apartment_id, tenant_id, start_date, end_date, rent_amount } = data;
    const res = await pool.query(
      "UPDATE rental_contracts SET apartment_id = $1, tenant_id = $2, start_date = $3, end_date = $4, rent_amount = $5 WHERE id = $6 RETURNING *",
      [apartment_id, tenant_id, start_date, end_date, rent_amount, id]
    );
    return res.rows[0];
  },
  async delete(id) {
    await pool.query("DELETE FROM rental_contracts WHERE id = $1", [id]);
  },
};

module.exports = ContractModel;

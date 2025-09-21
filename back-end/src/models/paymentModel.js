const pool = require("../db/pool");

const PaymentModel = {
  async getAll() {
    const res = await pool.query("SELECT * FROM monthly_payments");
    return res.rows;
  },
  async getById(id) {
    const res = await pool.query(
      "SELECT * FROM monthly_payments WHERE id = $1",
      [id]
    );
    return res.rows[0];
  },
  async create(data) {
    const { contract_id, month, year, amount, paid } = data;
    const res = await pool.query(
      "INSERT INTO monthly_payments (contract_id, month, year, amount, paid) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [contract_id, month, year, amount, paid]
    );
    return res.rows[0];
  },
  async update(id, data) {
    const { contract_id, month, year, amount, paid } = data;
    const res = await pool.query(
      "UPDATE monthly_payments SET contract_id = $1, month = $2, year = $3, amount = $4, paid = $5 WHERE id = $6 RETURNING *",
      [contract_id, month, year, amount, paid, id]
    );
    return res.rows[0];
  },
  async delete(id) {
    await pool.query("DELETE FROM monthly_payments WHERE id = $1", [id]);
  },
};

module.exports = PaymentModel;

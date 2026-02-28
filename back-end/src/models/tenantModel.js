const pool = require("../db/pool");

const TenantModel = {
  async getAll() {
    const res = await pool.query(
      "SELECT * FROM tenants ORDER BY created_at DESC"
    );
    return res.rows;
  },

  async getById(id) {
    const res = await pool.query("SELECT * FROM tenants WHERE id = $1", [id]);
    return res.rows[0];
  },

  async getDetailTenantById(id) {
    const res = await pool.query(
      `SELECT *, t.name as name, a.name as apartment_name, r.name as room_name
        FROM tenants t
        LEFT JOIN rental_contracts rc ON t.id = rc.tenant_id AND (rc.end_date IS NULL OR rc.end_date > now())
        LEFT JOIN rooms r ON rc.room_id = r.id
        LEFT JOIN apartments a ON a.id = r.apartment_id
        WHERE t.id = $1`,
      [id]
    );
    return res.rows[0];
  },

  async create(data) {
    const { name, phone, email, cardId, gender, location, birthday } = data;
    const res = await pool.query(
      `INSERT INTO tenants 
        (name, phone, email, card_id, gender, location, birthday) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [name, phone, email, cardId, gender, location, birthday]
    );
    return res.rows[0];
  },

  async update(id, data) {
    const { name, phone, email, cardId, gender, location, birthday } = data;
    console.log(data);
    const res = await pool.query(
      `UPDATE tenants 
       SET name = $1, phone = $2, email = $3, card_id = $4, 
           gender = $5, location = $6, birthday = $7
       WHERE id = $8 
       RETURNING *`,
      [name, phone, email, cardId, gender, location, birthday, id]
    );
    return res.rows[0];
  },

  async delete(id) {
    const res = await pool.query(
      "DELETE FROM tenants WHERE id = $1 RETURNING *",
      [id]
    );
    return res.rows[0];
  },
};

module.exports = TenantModel;

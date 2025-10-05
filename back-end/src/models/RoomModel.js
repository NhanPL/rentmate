const pool = require("../db/pool");

const RoomModel = {
  async getAllRoomByApartmentId(id) {
    const res = await pool.query(
      "SELECT * FROM rooms WHERE apartment_id = $1 ORDER BY id",
      [id]
    );
    return res.rows;
  },
  async getById(id) {
    const res = await pool.query("SELECT * FROM rooms WHERE id = $1", [id]);
    return res.rows[0];
  },
  async create(data) {
    const { name, type, price, status, size, apartmentId } = data;
    console.log("back", data);
    const res = await pool.query(
      `INSERT INTO rooms (name, room_type, price, status, size, apartment_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, type, price, status, size, apartmentId]
    );
    return res.rows[0];
  },
  async update(id, data) {
    const { name, type, price, status, size } = data;
    console.log(data, id);
    const res = await pool.query(
      `UPDATE rooms SET name=$2, room_type=$3, price=$4,status=$5, size=$6 WHERE id=$1 RETURNING *`,
      [id, name, type, price, status, size]
    );
    return res.rows[0];
  },
  async delete(id) {
    await pool.query("DELETE FROM rooms WHERE id = $1", [id]);
  },
};

module.exports = RoomModel;

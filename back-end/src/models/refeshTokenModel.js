const pool = require("../db/pool");

const RefreshTokenModel = {
  async create(userId, token) {
    await pool.query(
      "INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2)",
      [userId, token]
    );
  },

  async delete(token) {
    await pool.query("DELETE FROM refresh_tokens WHERE token = $1", [token]);
  },
};

module.exports = RefreshTokenModel;

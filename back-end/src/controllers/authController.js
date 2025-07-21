const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const register = async (req, res) => {
  const { username, password, full_name, email } = req.body;

  try {
    // Kiểm tra trùng username
    const checkUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await pool.query(
      `INSERT INTO users (username, password, full_name, email)
       VALUES ($1, $2, $3, $4) RETURNING id, username, full_name, email`,
      [username, hashedPassword, full_name, email]
    );

    return res
      .status(201)
      .json({ message: "User registered successfully", user: result.rows[0] });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Tạo JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };

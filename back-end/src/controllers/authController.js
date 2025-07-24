const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
require("dotenv").config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

// Lưu refresh token (có thể lưu vào DB, ở đây demo lưu tạm trong RAM)
let refreshTokens = [];

const register = async (req, res) => {
  const { username, password, full_name, email } = req.body;

  try {
    // Kiểm tra trùng username
    const existingUser = await UserModel.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Thêm user mới
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
      full_name,
      email,
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findByUsername(username);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Tạo JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    );
    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );
    refreshTokens.push(refreshToken);

    res.json({ message: "Login successful", token, accessToken, refreshToken });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: "Refresh token not found" });
  }
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });
    const { id, username } = user;
    const accessToken = jwt.sign({ id, username }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
    res.json({ accessToken });
  });
};

const logout = (req, res) => {
  const { refreshToken } = req.body;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(204).end();
};

module.exports = { register, login, refreshToken, logout };

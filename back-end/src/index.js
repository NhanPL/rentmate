const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const authRoutes = require("./routes/authRoute"); // Import auth routes
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Kết nối DB
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Kiểm tra kết nối
pool
  .connect()
  .then(() => console.log("🟢 Connected to PostgreSQL"))
  .catch((err) => console.error("🔴 PostgreSQL connection error", err));

// Auth routes
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

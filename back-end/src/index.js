const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoute"); // Import auth routes
const roomRoutes = require("./routes/roomRoute"); // Import auth routes
const apartmentRoutes = require("./routes/apartmentRoute");
const tenantRoutes = require("./routes/tenantRoute");
const contractRoutes = require("./routes/contractRoute");
const paymentRoutes = require("./routes/paymentRoute");
const uploadRoutes = require("./routes/uploadRoute");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);
app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/apartments", apartmentRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });
  }
};

module.exports = { authenticateJWT };

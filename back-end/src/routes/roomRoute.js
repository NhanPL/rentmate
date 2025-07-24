const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const { authenticateJWT } = require("../middleware/authMiddleware");

router.get("/", authenticateJWT, roomController.getRooms);
router.get("/:id", authenticateJWT, roomController.getRoomById);
router.post("/", authenticateJWT, roomController.createRoom);
router.put("/:id", authenticateJWT, roomController.updateRoom);
router.delete("/:id", authenticateJWT, roomController.deleteRoom);

module.exports = router;

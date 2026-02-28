const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get(
  "/apartment/:id",
  authMiddleware,
  roomController.getRoomByApartmentId
);
router.get("/:id", authMiddleware, roomController.getRoomById);
router.post("/", authMiddleware, roomController.createRoom);
router.put("/:id", authMiddleware, roomController.updateRoom);
router.delete("/:id", authMiddleware, roomController.deleteRoom);

module.exports = router;

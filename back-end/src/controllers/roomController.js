const RoomModel = require("../models/RoomModel");

const getRooms = async (req, res) => {
  try {
    const rooms = await RoomModel.getAll();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getRoomById = async (req, res) => {
  try {
    const room = await RoomModel.getById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createRoom = async (req, res) => {
  try {
    const room = await RoomModel.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateRoom = async (req, res) => {
  try {
    const room = await RoomModel.update(req.params.id, req.body);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteRoom = async (req, res) => {
  try {
    await RoomModel.remove(req.params.id);
    res.json({ message: "Room deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getRooms, getRoomById, createRoom, updateRoom, deleteRoom };

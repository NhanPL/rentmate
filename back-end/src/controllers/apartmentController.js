const Apartment = require("../models/apartmentModel");

exports.getAll = async (req, res) => {
  const data = await Apartment.getAll();
  res.json(data);
};

exports.getById = async (req, res) => {
  const data = await Apartment.getById(req.params.id);
  if (!data) return res.status(404).json({ message: "Not found" });
  res.json(data);
};

exports.create = async (req, res) => {
  const data = await Apartment.create(req.body);
  res.status(201).json(data);
};

exports.update = async (req, res) => {
  const data = await Apartment.update(req.params.id, req.body);
  res.json(data);
};

exports.delete = async (req, res) => {
  await Apartment.delete(req.params.id);
  res.status(204).end();
};

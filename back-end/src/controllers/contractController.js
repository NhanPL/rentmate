const Contract = require("../models/contractModel");

exports.getAll = async (req, res) => {
  const data = await Contract.getAll();
  res.json(data);
};

exports.getById = async (req, res) => {
  const data = await Contract.getById(req.params.id);
  if (!data) return res.status(404).json({ message: "Not found" });
  res.json(data);
};

exports.create = async (req, res) => {
  const data = await Contract.create(req.body);
  res.status(201).json(data);
};

exports.update = async (req, res) => {
  const data = await Contract.update(req.params.id, req.body);
  res.json(data);
};

exports.delete = async (req, res) => {
  await Contract.delete(req.params.id);
  res.status(204).end();
};

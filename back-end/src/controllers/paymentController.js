const Payment = require("../models/paymentModel");

exports.getAll = async (req, res) => {
  const data = await Payment.getAll();
  res.json(data);
};

exports.getById = async (req, res) => {
  const data = await Payment.getById(req.params.id);
  if (!data) return res.status(404).json({ message: "Not found" });
  res.json(data);
};

exports.create = async (req, res) => {
  const data = await Payment.create(req.body);
  res.status(201).json(data);
};

exports.update = async (req, res) => {
  const data = await Payment.update(req.params.id, req.body);
  res.json(data);
};

exports.delete = async (req, res) => {
  await Payment.delete(req.params.id);
  res.status(204).end();
};

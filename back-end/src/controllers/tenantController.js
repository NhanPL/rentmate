const Tenant = require("../models/tenantModel");

exports.getAll = async (req, res) => {
  const data = await Tenant.getAll();
  res.json(data);
};

exports.getById = async (req, res) => {
  const data = await Tenant.getById(req.params.id);
  if (!data) return res.status(404).json({ message: "Not found" });
  res.json(data);
};

exports.create = async (req, res) => {
  const data = await Tenant.create(req.body);
  res.status(201).json(data);
};

exports.update = async (req, res) => {
  const data = await Tenant.update(req.params.id, req.body);
  res.json(data);
};

exports.delete = async (req, res) => {
  await Tenant.delete(req.params.id);
  res.status(204).end();
};

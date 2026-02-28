const Tenant = require("../models/tenantModel");

exports.getAll = async (req, res) => {
  try {
    const data = await Tenant.getAll();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await Tenant.getById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getDetailTenantById = async (req, res) => {
  try {
    const data = await Tenant.getDetailTenantById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, phone, email, cardId, gender, location, birthday } = req.body;

    // Basic validation
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const data = await Tenant.create({
      name,
      phone,
      email,
      cardId,
      gender,
      location,
      birthday,
    });

    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, phone, email, cardId, gender, location, birthday } = req.body;

    // Basic validation
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const existingTenant = await Tenant.getById(req.params.id);
    if (!existingTenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    const data = await Tenant.update(req.params.id, {
      name,
      phone,
      email,
      cardId,
      gender,
      location,
      birthday,
    });

    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const tenant = await Tenant.delete(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.status(200).json({ message: "Tenant deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

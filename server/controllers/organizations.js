const Organization = require("../models/organization");

const createOrganization = async (req, res) => {
  try {
    const newOrganization = Organization.create(req.body);
    console.log("CREATE ORGANIZATION", newOrganization);
    res.status(201).json(newOrganization);
  } catch (error) {
    res.status(500).json({ message: error.message, errors: error.errors });
  }
};

const getAllOrganizations = async (req, res) => {
  try {
    const Organizations = await Organization.find();
    console.log(
      "🚀 ~ file: organizations.js:16 ~ getAllOrganizations ~ Organizations:",
      Organizations
    );
    res.json(Organization);
  } catch (error) {
    res.status(500).json({ message: error.message, errors: error.errors });
  }
};

const getOrganizationById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const Organization = await Organization.find({ _id: id });
    console.log(
      "🚀 ~ file: organizations.js:26 ~ getOrganizationById ~ Organization:",
      Organization
    );
    if (Organizations.length === 0) {
      res.status(404).json({ message: "Organization Not Found" });
    }
    res.json(Organizations[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrganization = async (req, res) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateOrganization = await Organization.findOneAndUpdate(
      { _id: id },
      body,
      { new: true }
    );
    console.log(
      "🚀 ~ file: organizations.js:56 ~ updateOrganization ~ updateOrganization:",
      updateOrganization
    );
    if (!updateOrganization) {
      res.status(404).json({ message: "Organization Not Found" });
    }
    res.json(Organizations[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrganization = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const deletedOrganization = await Organization.findOneAndDelete(
      { _id: id },
      body,
      { new: true }
    );
    console.log(
      "🚀 ~ file: organizations.js:76 ~ deleteOrganization ~ deletedOrganization:",
      deletedOrganization
    );
    if (!deletedOrganization) {
      res.status(404).json({ message: "Organization Not Found" });
    }
    res.json(Organizations[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
};

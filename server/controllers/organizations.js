const Organization = require("../models/organization");
const Project = require('../models/project')



const getAllOrganizations = async (req, res) => {
  console.log("get organization is calling......");
  try {
    const organizations = await Organization.find();
    console.log(
      "🚀 ~ file: organizations.js:7 ~ getAllOrganizations ~ organizations:",
      organizations
    );

    res.json(organizations);
  } catch (error) {
    res.status(500).json({ message: error.message, errors: error.errors });
  }
};

const getOrganizationById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const organizations = await Organization.find({ _id: id });
    console.log(
      "🚀 ~ file: organizations.js:32 ~ getOrganizationById ~ organization:",
      organizations
    );

    if (organizations.length === 0) {
      res.status(404).json({ message: "Organization Not Found" });
    }
    res.json(organizations[0]);
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
    res.json(updateOrganization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrganization = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const deletedOrganization = await Organization.findOneAndDelete({
      _id: id,
    });
    console.log(
      "🚀 ~ file: organizations.js:76 ~ deleteOrganization ~ deletedOrganization:",
      deletedOrganization
    );
    if (!deletedOrganization) {
      res.status(404).json({ message: "Organization Not Found" });
    }
    res.json(deletedOrganization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all projects created by a specific organization (My projects)
const getProjectsCreatedByOrganization = async (req, res) => {
  try {
    const organizationId = req.params.id; 

    // Find projects where the organization's ID matches the "organizationId" field
    const projects = await Project.find({ organizationId })
    //.populate('volunteers');

    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching projects created by organization' });
  }
};

//  updating the decision for a project application

const updateProjectDecision = async (req, res) => {
    const { decision } = req.body; // Should be 'accept' or 'deny'

    try {
        // Find the project by ID and update the decision status
        const updatedProject = await Project.findByIdAndUpdate(
          req.params.id,
            { $set: { decision } },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating project decision' });
    }
};

// projectdetails for a specific organization

const getProjectByIdCreatedByOrganization = async (req, res) => {
    
  try {
    const organizationId = req.params.id
    const projectId = req.params.projectId

    // Find projects where the organization's ID matches the "organizationId" field
    const project = await Project.findOne({_id: organizationId,  _id:projectId })
    //.populate('volunteers');

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching a project created by organization' });
  }
} 



module.exports = {
  
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
  getProjectByIdCreatedByOrganization,
  getProjectsCreatedByOrganization,
  updateProjectDecision
};

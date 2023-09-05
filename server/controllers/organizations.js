const cloudinary = require('../config/cloudinary');
const Organization = require("../models/organization");
const Project = require('../models/project')
const Volunteer = require('../models/volunteer');

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

const updateOrganizationProfile = async (req, res) => {
  try {
  // Handling the file upload first using multer and cloudinary
  const uploadedFile = await cloudinary.uploader.upload(req.file.path);

  // Extracting the secure URLs of the uploaded files
  const imageUrl = uploadedFile.secure_url;

  const updatedOrganization = await Organization.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      // req.file.path,
      { new: true, });
  console.log("🚀 ~ file: organizations.js:55 ~ updateOrganization ~ updatedOrganization:", updatedOrganization)

  // Adding the image URLs to the updated projectand saving the update
  updatedOrganization.image = imageUrl;
  
  if(!updatedOrganization) {
      res.status(404).json({Error: 'Organization not Found!'})
  }
  res.status(202).json(updatedOrganization)
  } catch(error) {
  console.log("🚀 ~ file: organizations.js:81 ~ updateOrganization ~ error:", error)
  res.status(500).json({Error:'Error updating organization'})  
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
    console.log("🚀 ~ file: organizations.js:76 ~ deleteOrganization ~ deletedOrganization:",
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
    const projects = await Project.find({organizationId: req.organization._id });

    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching projects created by organization' });
  }
};

// list of volunteers for organization
const getVolunteersByOrganization = async (req, res) => {
  try {
   
    // Find all projects created by the organization
    const orgaProjects = await Project.find({organizationId: req.organization._id });
    console.log('Projects', orgaProjects)

    // Fetch volunteers who have applied for projects created by the organization
    const volunteers = await Volunteer.find({ 
      'projects': { $in: orgaProjects.map((p) => p._id) },
    }).populate('projects');

      console.log('Volunteers:', volunteers);

    res.status(200).json(volunteers);
  } catch (error) {
    console.error('Error fetching volunteers by organization', error);
    res.status(500).json({ error: 'Error fetching volunteers by organization' });
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

//  updating the decision for a project and volunteer status application

const updateProjectDecision = async (req, res) => {
    const { decision } = req.body; // Should be 'Accepted' or 'Denied'
    const projectId = req.params.projectId

    try {
      const updatedProject = await Project.changeProjectStatusBasedOnDecision(projectId, decision);

      if (!updatedProject) {
          return res.status(404).json({ message: 'Project not found' });
      }

      // Call the function to update the volunteer's status
      await updateVolunteerStatus(projectId, decision);


      res.status(200).json({ message: 'Project decision updated', project: updatedProject });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating project decision' });
  }
};



// Function For get logged in Organization:::
const getLoggedinOrganization = async (req, res) => {
try {
  const organization = await Organization.findOne({ _id: req.organization._id }).select('_id email organizationName description contactInfo website projects decision');
  console.log("🚀 ~ file: auth-organization.js:87 ~ getLoggedinOrganization ~ organization:", organization)
  res.json({ organization });
} catch (error) {
  console.log("🚀 ~ file: auth-organization.js:90 ~ getLoggedinOrganization ~ error:", error)
  res.json({ message: error.message });
}
};


module.exports = {
  
  getAllOrganizations,
  getOrganizationById,
  updateOrganizationProfile,
  deleteOrganization,
  getProjectByIdCreatedByOrganization,
  getProjectsCreatedByOrganization,
  getVolunteersByOrganization, 
  updateProjectDecision,
  getLoggedinOrganization,
};

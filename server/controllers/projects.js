//const cloudinary = require('../config/cloudinary1');
const Project = require('../models/project')
const Organization = require('../models/organization');
const Volunteer = require('../models/volunteer');



// creating a NewProject with an uploaded file 
const createProject = async (req, res) => {
    try {
        const project = await Project.create({ ...req.body, image: req.file.path, createdBy: req.organization._id  });
        console.log("🚀 ~ file: projects.js:11 ~ createProject ~ project:", project)

        // adding the created project to the organization's project array
        const organization = await Organization.findByIdAndUpdate(
        req.organization._id ,
        { $push: { projects: project._id } },
        { new: true }
        );
        console.log("Updated organization:", organization);
        res.status(201).json({ project, organization })

    } catch (error) {
        console.log("🚀 ~ file: projects.js:23 ~ createProject ~ error:", error)
        res.status(500).json({Error:'Error creating project'})
    }
}

//  Getting all Projects (Projects)
const getProjects = async (req, res) => {
    
    try {
        const projects = await Project.find()
        console.log("🚀 ~ file: projects.js:33 ~ getProjects ~ projects:", projects)
        res.status(200).json(projects)
    } catch (error) {
        console.log("🚀 ~ file: projects.js:13 ~ getProjects ~ error:", error)
        res.status(500).json({Error:'Error fetching projects'})
    }
}
console.log("🚀 ~ file: projects.js:40 ~ getProjects ~ getProjects:", getProjects)


// Getting a project by its ID (ProjectDetails)
const getProjectDetails = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        .populate(
            { path: 'createdBy', select: 'organizationName email' },
        );
        console.log("🚀 ~ file: projects.js:46 ~ getProjectById ~ project:", project)
        if (!project) {
            res.status(404).json({ message: 'Project Not Found' });
        }
        res.json(project);
    } catch (error) {
        console.log("🚀 ~ file: projects.js:52 ~ getProjectById ~ error:", error)
        res.status(500).json({Error:'Error fetching project details'})
    }
}

// Applying for a project 
const applyForProject = async (req, res) => {
    try {
        // Handling the file upload first using multer and cloudinary
        //const uploadedFile = await cloudinary.uploader.upload(req.file.path);

        // Extracting the secure URLs of the uploaded files
        //const imageUrl = uploadedFile.secure_url;

        // Updating the project Document to add the volunteer's ID to the 'volunteers' array
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id, 
            { $push: { volunteers: req.volunteer._id } }, 
            { new: true }
        );

        // Update the volunteer document to add the project's ID to the 'projects' array
        const updatedVolunteer = await Volunteer.findByIdAndUpdate(
            req.volunteer._id,
            { $push: { projects: updatedProject._id } }, 
            { new: true }
        );

        // Adding the image URLs to the updated projectand saving the update
        //updatedProject.image = imageUrl;
        //await updatedProject.save();

        res.status(200).json({ updatedProject, updatedVolunteer });
    } catch (error) {
        console.log("🚀 ~ file: projects.js:91 ~ applyForProject ~ error:", error)
        res.status(500).json({ Error: 'Error applying for the project' });
    }
};

// Updating an existing Project
const updateProject = async (req, res) => {
    try {
    const updatedProject = await Project.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        req.file.path,
        {
        new: true,
    });
    if(!updatedProject) {
        res.status(404).json({Error: 'Project not Found!'})
    }
    res.status(202).json(updatedProject)
    } catch(error) {
    console.log("🚀 ~ file: projects.js:81 ~ updateProject ~ error:", error)
    res.status(500).json({Error:'Error updating project'})  
    }
}; 


// Getting all projects applied for by a specific volunteer (My projects)
const getProjectsAppliedByVolunteer = async (req, res) => {
    try {
        const volunteerIdToSearch = req.params.id; 
        
        // Finding all projects where the volunteer's ID is in the 'volunteers' array
        const appliedProjects = await Project.find({ volunteers: volunteerIdToSearch });
        
        res.status(200).json(appliedProjects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching projects applied by volunteer' });
    }
};


// Get all projects created by a specific organization (My projects)
const getProjectsCreatedByOrganization = async (req, res) => {
    try {
      // Finding projects matching with the organization's ID
        const projects = await Project.find({ Id: req.params.id }).populate({
        path: 'volunteers',
        select: 'volunteerName, email',
    });
    res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching projects created by organization' });
    }
};

// Getting all volunteers who have applied for a specific project
const getVolunteersForProject = async (req, res) => {
    try {
      // Finding the project by its ID and populate the "volunteers" field
        const project = await Project.findById(req.params.id).populate({
        path: 'volunteers',
        select: 'volunteerName, email',
    });

      // Extract the array of volunteer objects from the project document
        const appliedVolunteers = project.volunteers;
        res.status(200).json(appliedVolunteers);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Error fetching volunteers for project' });
    }
};

// deleting an existing Project
const deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findOneAndDelete({ _id: req.params.id });
        console.log("🚀 ~ file: projects.js:91 ~ deletePost ~ deletedProject:", deletedProject)
        if (!deletedProject) {
            res.status(404).json({Error:'Project not Found'})
        }
        res.status(200).json(deletedProject)   
    }catch (error) {
        console.log("🚀 ~ file: projects.js:97 ~ deletePost ~ erro:", erro)
        res.status(500).json({Error: 'Internal server error'})
    }
};


// Organization can accept or deny a project application by a volunteer
const respondToApplication = async (req, res) => {
    try {
        const { projectId, volunteerId, status } = req.body;

      // Update the project's volunteers array to set the status for the volunteer's application
        const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { $set: { 'volunteers.$[elem].status': status } },
        { arrayFilters: [{ 'elem.volunteer': volunteerId }] }
        );

      // Update the volunteer's projects array to set the status for the applied project
        const updatedVolunteer = await Volunteer.findByIdAndUpdate(
        volunteerId,
        { $set: { 'projects.$[elem].status': status } },
        { arrayFilters: [{ 'elem.project': projectId }] }
        );

        res.status(200).json({ message: 'Application response recorded', updatedProject, updatedVolunteer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error responding to project application' });
    }
};


module.exports = {
    getProjects,
    getProjectDetails,
    createProject,
    applyForProject,
    updateProject,
    getProjectsAppliedByVolunteer,
    getProjectsCreatedByOrganization,
    getVolunteersForProject,
    deleteProject,
    respondToApplication,
};

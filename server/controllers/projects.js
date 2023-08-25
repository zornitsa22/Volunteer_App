const cloudinary = require('../config/cloudinary');
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
        const uploadedFile = await cloudinary.uploader.upload(req.file.path);

        // Extracting the secure URLs of the uploaded files
        const imageUrl = uploadedFile.secure_url;

        // Updating the project Document to add the volunteer's ID to the 'volunteers' array
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id, 
            { $push: { volunteers: req.volunteer._id } }, 
            { new: true }
        ).populate('volunteers');
        console.log("🚀 ~ file: projects.js:77 ~ applyForProject ~ updatedProject:", updatedProject)
         
        // Update the volunteer document to add the project's ID to the 'projects' array
        const updatedVolunteer = await Volunteer.findByIdAndUpdate(
            req.volunteer._id,
            { $push: { projects: updatedProject._id } }, 
            { new: true }
        );
        console.log("🚀 ~ file: projects.js:85 ~ applyForProject ~ updatedVolunteer:", updatedVolunteer)

        // Adding the image URLs to the updated projectand saving the update
        updatedProject.image = imageUrl;
        await updatedProject.save();
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
        //req.file.path,
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


// updating the project status based on the decision made by the organization:t
const updateProjectDecision = async (req, res) => {
    
    const { decision } = req.body;

    try {
    const project = await Project.findById(req.params.id);

    if (!project) {
    return res.status(404).json({ message: 'Project not found' });
    }

    // Update the project's status based on the decision
    if (decision === 'Accepted') {
    project.status = 'Accepted';
    } else if (decision === 'Denied') {
        project.status = 'Denied';
    }

    const updatedProject = await project.save();

    res.status(200).json({ message: 'Project decision updated', project: updatedProject });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating project decision' });
    }
};



module.exports = {
    getProjects,
    getProjectDetails,
    createProject,
    applyForProject,
    updateProject,
    deleteProject,
    updateProjectDecision
};

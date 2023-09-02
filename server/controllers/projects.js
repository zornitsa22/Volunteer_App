const cloudinary = require('../config/cloudinary');
const Project = require('../models/project')
const Organization = require('../models/organization');
const Volunteer = require('../models/volunteer');


// creating a NewProject with an uploaded file 
const createProject = async (req, res) => {
    try {
        const project = await Project.create({ ...req.body, image: req.file.path, organizationId: req.organization._id  });
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
            { path: 'organizationId', select: 'organizationName email' },
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
        // Check if the volunteer has already applied for the project
        const project = await Project.findById(req.params.id).populate('volunteers');
        const volunteerAlreadyApplied = project.volunteers.some(
            volunteer => volunteer._id.equals(req.volunteer._id)
        );

        if (volunteerAlreadyApplied) {
            return res.status(400).json({ Error: 'Volunteer has already applied for this project' });
        }

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
/*const updateProject = async (req, res) => {
    try {
    const updatedProject = await Project.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {
        new: true,
    });
    if(!updatedProject) {
        res.status(404).json({Error: 'Project not Found!'})
    }
    res.status(202).json(updatedProject)
    } catch(error) {
    console.log("🚀 ~ file: projects.js:122 ~ updateProject ~ error:", error)
    res.status(500).json({Error:'Error updating project'})  
    }
}; */

const updateProject = async (req, res) => {
    try {
        const projectId = req.params.id;

        // Check if a new image file was uploaded
        let imageUrl = null;
        if (req.file) {
            // Upload the new image to Cloudinary and get the secure URL
            const uploadedFile = await cloudinary.uploader.upload(req.file.path);
            imageUrl = uploadedFile.secure_url;
        }

        // Prepare the project data to be updated (excluding image if not provided)
        const updatedData = {
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            skills: req.body.skills,
            ocurrence: req.body.ocurrence,
            cause: req.body.cause,
            capacity: req.body.capacity,
            contactEmail: req.body.contactEmail,
            tasks: req.body.tasks,
            latitude: req.body.latitude,
            longitude: req.body.longitude,

            // Add the image URL if it's available
            image: imageUrl || req.body.image,
        };

        // Update the project in the database
        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            updatedData,
            {
                new: true,
            }
        );

        if (!updatedProject) {
            return res.status(404).json({ Error: 'Project not found' });
        }

        res.status(202).json(updatedProject);
    } catch (error) {
        console.log("Error updating project:", error);
        res.status(500).json({ Error: 'Error updating project' });
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


// updating the project status based on the decision made by the organization
const changeProjectStatusBasedOnDecision = async (req, res) => {
    
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

// Volunteers who applied for a specific project

const volunteersForProject = async (req, res) => {
    try {
        const projectId = req.params.id;

      // Find the project by its ID and populate the 'volunteers' field to get volunteer details.
        const project = await Project.findById(projectId).populate('volunteers');

        if (!project) {
        return res.status(404).json({ error: 'Project not found' });
        }

      // Extract the volunteer data from the project and send it as a response.
        const volunteers = project.volunteers;

    return res.json(volunteers);
    } catch (error) {
        console.error('Error fetching project volunteers:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    getProjects,
    getProjectDetails,
    createProject,
    applyForProject,
    updateProject,
    deleteProject,
    changeProjectStatusBasedOnDecision,
    volunteersForProject
};

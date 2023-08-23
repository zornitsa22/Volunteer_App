const express = require ('express');

// Creating a router instance 
const router = express.Router();


// Import the projects-related controller functions
const { 
    getProjects,
    getProjectDetails,
    createProject,
    applyForProject,
    updateProject,
    getProjectsAppliedByVolunteer,
    getProjectsCreatedByOrganization,
    getVolunteersForProject,
    deleteProject,
} = require('../controllers/projects');

// Importing the authentication Middelwares 
const authenticateVol = require('../middlewares/auth')
const authenticateOrg = require('../middlewaresOrga/authOrga')


// Importing the upload Object from the multer configuration
const upload = require('../config/multer');

// using the authentication Middelwares for all routes 
router.use(authenticateVol);
router.use(authenticateOrg);

router.get('/', getProjects);
router.get('/:id', getProjectDetails);
router.post('/', upload.single('image'), createProject);
router.post('/:id/apply', applyForProject);
router.put('/:id/', upload.single('image'), updateProject);




router.get('/volunteers/:id/projects', getProjectsAppliedByVolunteer);
router.get('/organizations/:id/projects', getProjectsCreatedByOrganization);
router.get('/projects/:id/volunteers', getVolunteersForProject);
router.delete('/projects/:id', deleteProject);

module.exports = router;


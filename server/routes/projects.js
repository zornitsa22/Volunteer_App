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
    deleteProject,
    changeProjectStatusBasedOnDecision,
    volunteersForProject
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
router.put('/:id/update', upload.single('image'), updateProject);
router.post('/:id/apply', upload.single('image'), applyForProject);
router.delete('/:id', deleteProject);
router.put('/:id/decision', changeProjectStatusBasedOnDecision);
router.get('/:id/volunteers', volunteersForProject);


module.exports = router;


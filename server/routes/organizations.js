const express = require("express");

const router = express.Router();

const {
  
  getAllOrganizations,
  getOrganizationById,
  updateOrganizationProfile,
  deleteOrganization,
  getProjectsCreatedByOrganization,
  getProjectByIdCreatedByOrganization,
  updateProjectDecision,
  getLoggedinOrganization,
  getVolunteersByOrganization, 
} = require("../controllers/organizations");

const authenticate = require('../middlewaresOrga/authOrga');
const upload = require('../config/multer');
router.use(authenticate);

router.get("/", getAllOrganizations);
router.get("/profile",authenticate, getLoggedinOrganization);


router.get("/:id", getOrganizationById);

// router.post("/", createOrganization);
router.put("/:profile/update", upload.single('image'),authenticate, updateOrganizationProfile);
router.delete("/:id", deleteOrganization);

router.get('/:id/projects', getProjectsCreatedByOrganization);
router.get('/:id/projects/:projectId', getProjectByIdCreatedByOrganization);
router.put('/:id/projects/:id/decision', updateProjectDecision);
router.get('/:id/volunteers', getVolunteersByOrganization);

module.exports = router;

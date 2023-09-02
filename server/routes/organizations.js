const express = require("express");

const router = express.Router();

const {
  
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
  getProjectsCreatedByOrganization,
  getProjectByIdCreatedByOrganization,
  updateProjectDecision,
  getLoggedinOrganization,
} = require("../controllers/organizations");

const authenticate = require('../middlewaresOrga/authOrga');
const upload = require('../config/multer');
router.use(authenticate);

router.get("/", getAllOrganizations);
router.get("/profile",authenticate, getLoggedinOrganization);

router.get("/:id", getOrganizationById);

// router.post("/", createOrganization);
router.put("/:id/update", upload.single('image'), updateOrganization);
router.delete("/:id", deleteOrganization);

router.get('/:id/projects', getProjectsCreatedByOrganization);
router.get('/:id/projects/:projectId', getProjectByIdCreatedByOrganization);
router.put('/:id/projects/:id/decision', updateProjectDecision);

module.exports = router;

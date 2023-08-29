const express = require("express");

const router = express.Router();

const {
  
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
  getProjectsCreatedByOrganization,
  getProjectByIdCreatedByOrganization,
  updateProjectDecision
} = require("../controllers/organizations");

const authenticate = require("../middlewares/auth");
const upload = require('../config/multer');
router.use(authenticate);

router.get("/", getAllOrganizations);
router.get("/:id", getOrganizationById);
router.put("/:id", updateOrganization);
router.delete("/:id", deleteOrganization);
router.get('/:id/projects', getProjectsCreatedByOrganization);
router.get('/:id/projects/:projectId', getProjectByIdCreatedByOrganization);
router.put('/:id/projects/:projectId/decision', updateProjectDecision);

module.exports = router;

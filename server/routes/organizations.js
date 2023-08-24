const express = require("express");
const router = express.Router();
const {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} = require("../controllers/organizations");

router.get("/", getAllOrganizations);
router.get("/:id", getOrganizationById);
router.post("/", createOrganization);
router.put("/:id", updateOrganization);
router.delete("/:id", deleteOrganization);

module.exports = router;
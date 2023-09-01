const express = require('express');
const router = express.Router();
const {
  getAllVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
  getProjectsAppliedByVolunteer, 
} = require('../controllers/volunteers');

const authenticate = require('../middlewares/auth');
const upload = require('../config/multer');
router.use(authenticate);
router.get('/', getAllVolunteers);
router.get('/:id', getVolunteerById);


router.get('/:id/projects', getProjectsAppliedByVolunteer)
router.put('/:id/update',upload.single('image'), updateVolunteer);
router.delete('/:id', deleteVolunteer);



module.exports = router;
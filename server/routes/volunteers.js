const express = require('express');
const router = express.Router();

const {
  getAllVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
  getProjectsAppliedByVolunteer, 
  getLoggedinVolunteer,
  updateVolunteerDecision
} = require('../controllers/volunteers');

const authenticate = require('../middlewares/auth');
const upload = require('../config/multer');
router.use(authenticate);
router.get('/', getAllVolunteers);
router.get('/profile', authenticate, getLoggedinVolunteer);
router.get('/:id', getVolunteerById);
router.get('/:id/projects', getProjectsAppliedByVolunteer)
router.put('/:id/update',upload.single('image'), updateVolunteer);
router.delete('/:id', deleteVolunteer);
router.post('/api/volunteers/:id/decision', updateVolunteerDecision);

module.exports = router;
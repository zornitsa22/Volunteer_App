const express = require('express');
const router = express.Router();

const {
  getAllVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
  getProjectsAppliedByVolunteer, 
  getLoggedinVolunteer,
  updateVolunteerDecision,
  updateVolunteerStatus
} = require('../controllers/volunteers');

const authenticate = require('../middlewares/auth');
const upload = require('../config/multer');
router.use(authenticate);
router.get('/', getAllVolunteers);
router.get('/profile', authenticate, getLoggedinVolunteer);
router.put('/profile/update', upload.single('image'), authenticate, updateVolunteer);
router.get('/:id', getVolunteerById);
router.get('/:id/projects', getProjectsAppliedByVolunteer)
router.delete('/:id', deleteVolunteer);
router.post('/api/volunteers/:id/decision', updateVolunteerDecision);
router.put('/:id/status', updateVolunteerStatus);

module.exports = router;
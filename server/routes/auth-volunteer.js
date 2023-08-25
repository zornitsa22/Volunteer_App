const express = require('express');

const router = express.Router();

// Importing the upload Object from the multer configuration
const upload = require('../config/multer');

const { register, login, logout, getLoggedinVolunteer } = require('../controllers/auth-volunteer');

const authenticate = require('../middlewares/auth');

router.post('/register',upload.single('image'), register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/currentVolunteer', authenticate, getLoggedinVolunteer);

module.exports = router;


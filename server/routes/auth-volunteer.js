const express = require('express');
const router = express.Router();
const { register, login, logout, getLoggedinVolunteer } = require('../controllers/auth-volunteer');
const authenticate = require('../middlewares/auth');
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/currentVolunteer', authenticate, getLoggedinVolunteer);

module.exports = router;

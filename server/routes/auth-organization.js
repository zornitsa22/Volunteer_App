const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth-organization');
const authenticate = require('../middlewaresOrga/authOrga');
const { getLoggedinOrganization } = require('../controllers/auth-organization');
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/currentOrganization', authenticate, getLoggedinOrganization);

module.exports = router;

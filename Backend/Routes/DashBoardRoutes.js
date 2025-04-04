const express = require('express');
const dashRoutes = express.Router();
const fetchUserData = require('../Controller/DashBoard');
const AuthToken = require('../Middlewear/Auth');
const CsrfAuth = require('../Middlewear/CsrfAuth')
dashRoutes.get('/allUserData',AuthToken,CsrfAuth,fetchUserData);

module.exports = dashRoutes;
// route/Userroute.js
const express = require('express');
const mongoose = require('mongoose');
const route = express.Router();

// Import ALL the functions you need from the controller
const { RegisterUser, LoginUser, verifyToken } = require('../control/Usercontrol.js');
const { protect } = require('../middleware/authmiddleware.js');

// Routes
route.post('/register', RegisterUser);
route.post('/login', LoginUser);
route.get('/verify', protect, verifyToken);  // Now verifyToken is properly imported

module.exports = route;
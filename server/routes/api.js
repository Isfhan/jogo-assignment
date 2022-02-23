// Import express  
const express = require('express');
// Creating express router
const router = express.Router();
// Import user controller
const userController = require('../controllers/userController');

// Routes
router.post("/signup",userController.signup);
router.post("/login",userController.login);



// Exporting routes
module.exports = router;

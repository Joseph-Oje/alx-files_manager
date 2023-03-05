// Import the required modules
const express = require('express');

// Import the controllers
const AppController = require('../controllers/AppController');

// Create the router
const router = express.Router();

// Define the routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// Export the router
module.exports = router;

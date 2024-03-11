// Import the Router object from the Express framework
const router = require('express').Router();

// Import the routes for the API endpoints from the ./api.js file
const uploadRoutes = require('./upload-routes');

// Mount the API routes under the "/api" path
router.use('/', uploadRoutes);

// Export the router object to be used by the main application
module.exports = router;
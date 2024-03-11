// Import the Router object from the Express framework
const router = require('express').Router();

// Import the routes for the API endpoints from the ./api.js file
const loginRoutes = require('./login-routes');

// Mount the API routes under the "/api" path
router.use('/', loginRoutes);

// Export the router object to be used by the main application
module.exports = router;
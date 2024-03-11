// Import the Router object from the Express framework
const router = require('express').Router();

// Import the routes for the API endpoints from the ./api.js file
const dashboardRoutes = require('./dashboard-routes');

// Mount the API routes under the "/api" path
router.use('/', dashboardRoutes);

// Export the router object to be used by the main application
module.exports = router;
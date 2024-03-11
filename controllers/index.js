// Import the Router object from the Express framework
const router = require('express').Router();

// Import the routes for the API endpoints from the ./api.js file
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard');
const loginRoutes = require('./login');
const uploadRoutes = require('./upload');
// Import the routes for the main application from the ./homeRoutes.js file
const homeRoutes = require('./home-routes');

// const uploadRoutes = require('./upload-routes');

// Mount the API routes under the "/api" path
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/login', loginRoutes);
router.use('/upload', uploadRoutes);
// Mount the home routes under the root path "/"
router.use('/', homeRoutes);




// Export the router object to be used by the main application
module.exports = router;

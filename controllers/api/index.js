// Import the Express router to create a new router instance
const router = require('express').Router();

// Change the name 'testRoutes1 and testRoutes2'.
// If we are adding more apiRoutes, include here and add file under api
const testRoutes1 = require('./testRoutes1');
const testRoutes2 = require('./testRoutes2');

// Rename testRoutes1 and testRoutes2
// Mount testRoutes1 at the '/testRoutes1' path
router.use('/testRoutes1', testRoutes1);
// Mount testRoutes2 at the '/testRoutes2' path
router.use('/testRoutes2', testRoutes2);

// Export the router for use in other parts of the application
module.exports = router;

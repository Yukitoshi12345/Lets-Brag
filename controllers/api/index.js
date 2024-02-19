const router = require('express').Router();

// Change the name 'testRoutes1 and testRoutes2'.
// If we are adding more apiRoutes, include here and add file under api
const testRoutes1 = require('./testRoutes1');
const testRoutes2 = require('./testRoutes2');

// Rename testRoutes1 and testRoutes2
router.use('/testRoutes1', testRoutes1);
router.use('/testRoutes2', testRoutes2);

module.exports = router;
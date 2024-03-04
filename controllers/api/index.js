// Import the Express router to create a new router instance
const router = require('express').Router();

const bragRoutes = require('./bragRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/brag', bragRoutes);
router.use('/comment', commentRoutes);

// Export the router for use in other parts of the application
module.exports = router;

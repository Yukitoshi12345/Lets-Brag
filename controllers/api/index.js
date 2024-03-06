// Import the Express router to create a new router instance
const router = require('express').Router();


const userRoutes = require('./user-routes');
const bragRoutes = require('./brag-routes');
const commentRoutes = require('./comment-routes');
const ratingRoutes = require('./rating-routes');

router.use('/users', userRoutes);
router.use('/brags', bragRoutes);
router.use('/comments', commentRoutes);
router.use('/ratings', ratingRoutes);

// Export the router for use in other parts of the application
module.exports = router;

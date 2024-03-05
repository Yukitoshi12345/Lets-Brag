// Import the Express router to create a new router instance
const router = require('express').Router();


const userRoutes = require('./user-routes');
const bragRoutes = require('./brag-routes');
const commentRoutes = require('./comment-routes');
const ratingRoutes = require('./rating-routes');


router.use('/user', userRoutes);
router.use('/brag', bragRoutes);
router.use('/comment', commentRoutes);
router.use('/rating', ratingRoutes);

// Export the router for use in other parts of the application
module.exports = router;

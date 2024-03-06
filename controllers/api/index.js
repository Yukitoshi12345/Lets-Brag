// Import the Express router to create a new router instance
const router = require('express').Router();


const userRoutes = require('./user-routes');
const bragRoutes = require('./brag-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const ratingRoutes = require('./rating-routes');
const dashboardRoutes= require('./dashboard-routes');

router.use('/users', userRoutes);
router.use('/brags', bragRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/ratings', ratingRoutes);
router.use('/dashboard', dashboardRoutes);

// Export the router for use in other parts of the application
module.exports = router;

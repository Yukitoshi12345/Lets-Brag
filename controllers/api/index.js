// Import the Express router to create a new router instance for handling API routes
const router = require('express').Router();

// Import separate route modules for different functionalities
const userRoutes = require('./user-routes'); // Routes for user-related operations
const bragRoutes = require('./brag-routes'); // Routes for brag (post) operations
const commentRoutes = require('./comment-routes'); // Routes for comment operations
const ratingRoutes = require('./rating-routes'); // Routes for rating operations
const uploadRoutes = require('./upload-routes'); // routes for upload operation

// Mount the imported route modules onto the main router
router.use('/users', userRoutes); // Handle user routes under '/users' prefix
router.use('/brags', bragRoutes); // Handle brag routes under '/brags' prefix
router.use('/comments', commentRoutes); // Handle comment routes under '/comments' prefix
router.use('/ratings', ratingRoutes); // Handle rating routes under '/ratings' prefix
router.use('/upload', uploadRoutes); // Handle upload routes under '/ratings' prefix

// Export the router for use in other parts of the application
module.exports = router;

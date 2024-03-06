// Import the Express router to create a new router instance
const router = require('express').Router();

// Import the database connection from the configuration file
const sequelize = require('../../config/connection');

// Import specific models from the models directory
const { Brag, User, Comment } = require('../../models');

// Import a middleware for authentication
const withAuth = require('../../utils/auth');

// Create new comment with content, brag_id and commenter_id
// **Create a new comment**
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new comment object in the database
    const newComment = await Comment.create({
      // Extract content, post ID, and commenter ID from the request body
      content: req.body.content,
      comment_date: new Date().toJSON(), // Use current timestamp
      brag_id: req.body.post_id, // Associate with the specified post
      commenter_id: req.session.user_id, // Associate with the current user
    });

    // Respond with a success status code (200) and the newly created comment data
    res.status(200).json(newComment);
  } catch (err) {
    // Catch any errors and respond with a bad request status code (400) with the error message
    res.status(400).json(err);
  }
});

// **Edit an existing comment**
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Update the comment in the database with the provided content
    const comment = await Comment.update(
      {
        content: req.body.content, // Update with new content
        comment_date: new Date().toJSON(), // Update timestamp
        user_id: req.session.user_id, // Ensure user attempting update is the commenter
      },
      {
        where: {
          id: req.params.id, // Update the comment matching this ID
          commenter_id: req.session.user_id, // Only allow updates by the comment author
        },
      },
    );
    // Respond with a success status code (200) and the updated comment data (if applicable)
    res.status(200).json(comment);
  } catch (err) {
    // Catch any errors and respond with a bad request status code (400) with the error message
    res.status(400).json(err);
  }
});

// **Delete a comment by Id - is it necessary?**
// **(Consider the necessity based on your specific use case)**
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete the comment from the database
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id, // Delete the comment matching this ID
        user_id: req.session.user_id, // Only allow deletion by the comment author
      },
    });

    // If no comment is found, return a not found status code (404)
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    // Respond with a success status code (200) containing the deleted comment data (optional)
    res.status(200).json(commentData);
  } catch (err) {
    // Catch any errors and respond with a server error status code (500) with the error message
    res.status(500).json(err);
  }
});

// Export the router for use in other parts of the application
module.exports = router;

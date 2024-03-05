// Import the Express router to create a new router instance
const router = require('express').Router();

// Import the database connection from the configuration file
const sequelize = require('../../config/connection');

// Import specific models from the models directory
const { Brag, User, Comment } = require('../../models');

const withAuth = require('../../utils/auth');

// Create new comment with content, brag_id and commenter_id
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      comment_date: new Date().toJSON(),
      brag_id: req.body.post_id,
      commenter_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Edit comment by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const comment = await Comment.update(
      {
        content: req.body.content,
        comment_date: new Date().toJSON(),
        user_id: req.session.user_id,
      },
      {
        where: {
          id: req.params.id,
          commenter_id: req.session.user_id,
        },
      },
    );
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete comment by id - it this necessary?
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router for use in other parts of the application
module.exports = router;

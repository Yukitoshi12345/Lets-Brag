// Import the Express router to create a new router instance
const router = require('express').Router();

// Import the database connection from the configuration file
const sequelize = require('../../config/connection');

// Import specific models from the models directory
const { Brag, User, Comment } = require('../../models');

// Create new comment with description, category_name...
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      // username: req.body.username,
      description: req.body.description,
      category_name: req.body.category_name,
      date_time: new Date().toJSON(),
      user_id: req.session.user_id,
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
        description: req.body.description,
        category_name: req.body.category_name,
        date_time: new Date().toJSON(),
        user_id: req.session.user_id,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      },
    );
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete comment by id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router for use in other parts of the application
module.exports = router;

// Import the Express router to create a new router instance
const router = require('express').Router();

// Import the database connection from the configuration file
const sequelize = require('../../config/connection');

// Import specific models from the models directory
const { Brag, Comment, User, Rating } = require('../../models');

const withAuth = require('../../utils/auth');
// dashboard.js - delete post, get pos by id
// route to get one post/article with given post id for dashboard detail page
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    // if (!req.session.loggedIn) {
    //   res.redirect('/login');
    //   return;
    // }
    const dbPostData = await Brag.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Rating,
        },
      ],
      attributes: {
        include: [
          [
            sequelize.literal(
              `(SELECT AVG(r.rating) As avgRating FROM rating AS r INNER JOIN brag AS b ON r.brag_id = b.id WHERE b.id = ${id})`,
            ),
            'avgRating',
          ],
          [
            sequelize.literal(
              `(SELECT COUNT(r.rating) FROM rating AS r INNER JOIN brag AS b ON r.brag_id = b.id WHERE b.id = ${id})`,
            ),
            'totalRating',
          ],
        ],
      },
    });
    if (!dbPostData) {
      res.status(404).json({ message: `No posts found for given id ${id}!` });
      return;
    }
    const dbCommentData = await Comment.findAll({
      where: {
        brag_id: id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const post = dbPostData.get({ plain: true });
    const comments = dbCommentData.map((comment) =>
      comment.get({ plain: true }),
    );
    post.comments = comments;
    res.render('dashboard', {
      //using spread operator
      ...post,
      // post,
      pageTitle: 'Post',
      // loggedIn: req.session.loggedIn,
      // loggedInUser: req.session.user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//delete brag post by id
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Brag.destroy({
        where: {
          id: req.params.id,
          bragger_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
// Export the router for use in other parts of the application
module.exports = router;

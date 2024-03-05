// Import the Express router to create a new router instance
const router = require('express').Router();

// Import the database connection from the configuration file
const sequelize = require('../../config/connection');

// Import specific models from the models directory
const { Brag, Comment, User, Rating } = require('../../models');

// const withAuth = require('../../utils/auth');

// route to get one post/article with given post id for post detail page
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
    res.render('post-detail', {
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
/*
// Create new brag
router.post('/', withAuth, async (req, res) => {
  try {
    const bragData = await Brag.create({
      title: req.body.title,
      content: req.body.content,
      brag_date: new Date().toJSON(),
      photo: req.body.photo, // link to external URL\file
      user_id: req.session.user_id,
      //category_name: req.body.category_name,
    });

    res.status(200).json(bragData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Edit brag by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const brag = await Brag.update(
      {
        title: req.body.title,
        content: req.body.content,
        brag_date: new Date().toJSON(),
        photo: req.body.photo, // link to external URL\file
        // category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      },
    );
    res.status(200).json(brag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Rate the brag by brags' id
router.post('/rate/:id', withAuth, async (req, res) => {
  try {
    const bragData = await Rating.create({
      rating: req.body.rating,
      brag_id: req.params.id,
      rater_id: req.session.user_id,
    });

    res.status(200).json(bragData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/rate/:id', withAuth, async (req, res) => {
  try {
    const rate = await Rating.update(
      {
        rating: req.body.rating,
      },
      {
        where: {
          //id:  ???, todo find rating by user id
          brag_id: req.params.id,
          rater_id: req.session.user_id,
        },
      },
    );
    res.status(200).json(rate);
  } catch (err) {
    res.status(500).json(err);
  }
});
*/
// Export the router for use in other parts of the application
module.exports = router;

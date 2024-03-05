// Example from class

const router = require('express').Router();
const { Brag, Comment, User, Rating } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all brags for homepage
router.get('/', async (req, res) => {
  try {
    const dbBragData = await Brag.findAll({
      include: [{
          model: User,
          attributes: ['username']
        }]
    });

    const brags = dbBragData.map((brag) =>brag.get({ plain: true }));
    res.render('homepage', {
      brags,
      pageTitle: 'Home',
      // loggedIn: req.session.loggedIn,
      // loggedInUser: req.session.user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Get all brags by the category ??
router.get('/brag?category=category', async (req, res) => {
  try {
    const dbBragData = await Brag.findAll({
      where: {
        category_name: req.params.category,
      },
      include: [
        {
          model: Comment,
          attributes: ['filename', 'description'],
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const brags = dbBragData.map((brag) =>
      brag.get({ plain: true }),
    );

    res.render('homepage', {
      brags,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one brag
// Use the custom middleware before allowing the user to access the brag
router.get('/brag/:id', withAuth, async (req, res) => {
  try {
    const dbBragData = await Brag.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: [
            // 'id',
            'title',
            'description',
            // 'category_name',
            // '',
            // '',
          ],
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const brag = dbBragData.get({ plain: true });
    res.render('brag', { brag, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one comment
// Use the custom middleware before allowing the user to access the comment
router.get('/comment/:id', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.findByPk(req.params.id);

    const comment = dbCommentData.get({ plain: true });

    res.render('comment', { comment, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;

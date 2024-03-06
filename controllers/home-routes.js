// Example from class

const router = require('express').Router();

const { Brag, Comment, User } = require('../models');

// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all brags for homepage
router.get('/', async (req, res) => {
  try {
    const dbBragData = await Brag.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const brags = dbBragData.map((brag) => brag.get({ plain: true }));

    res.render('homepage', {
      brags,
      pageTitle: 'Home',
      loggedIn: req.session.loggedIn,
      loggedInUser: req.session.user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
      if(!req.session.loggedIn){
          res.redirect("/login");
          return;
      }
    // Find the logged in user based on the session ID
      const dbUserData = await User.findByPk(req.session.userId, {
          attributes: { exclude: ["password"] },
          include: [{ model: Brag }],
      });

    const user = dbUserData.get({ plain: true });

      res.render("dashboard", {
          ...user,
          // user,
          loggedIn: true,
          pageTitle: "Dashboard",
          loggedInUser: req.session.user
      });
  } catch (error) {
      console.log(error);
      res.status(500).json(error);
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

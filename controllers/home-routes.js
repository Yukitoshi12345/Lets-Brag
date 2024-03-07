// Import the Router object from Express for defining routes
const router = require('express').Router();

// Import the Brag, Comment, and User models from the models directory
const { Brag, Comment, User } = require('../models');

// Import the custom authentication middleware
const withAuth = require('../utils/auth');

// GET all brags for homepage
// Route handler to retrieve all brag posts for the homepage
router.get('/', async (req, res) => {
  try {
    // Fetch all brag posts, including related user data (username)
    const dbBragData = await Brag.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Convert the fetched data to plain JavaScript objects
    const brags = dbBragData.map((brag) => brag.get({ plain: true }));

    // Render the 'homepage' template with the list of brags and other data
    res.render('homepage', {
      brags,
      pageTitle: 'Home',
      loggedIn: req.session.loggedIn, // Pass login status
      loggedInUser: req.session.user, // Pass logged-in username
      loggedInUserPhoto: req.session.photo
    });
  } catch (error) {
    console.log(error); // Log any errors
    res.status(500).json(error); // Send a 500 error response
  }
});

// Use withAuth middleware to prevent access to route
// Route handler to display the dashboard (protected by withAuth middleware)
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
    }
    // Find the logged in user based on the session ID
    // Fetch the logged-in user's data, excluding the password and including related brags
    const dbUserData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] }, // Exclude password from user data
      include: [{ model: Brag }],
    });

    // Convert the fetched data to a plain JavaScript object
    const user = dbUserData.get({ plain: true });

    // Render the 'dashboard' template with user data, login status, and username
    res.render('dashboard', {
      ...user, // Spread user data into template variables
      // user, // Original line (redundant with spread operator)
      loggedIn: true, // Set explicit login status (optional)
      pageTitle: 'Dashboard',
      loggedInUser: req.session.user,
      loggedInUserPhoto: req.session.photo
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Route handler to render the login page
router.get('/login', (req, res) => {
  // Redirect logged-in users to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // Render the 'login' template for users to log in
  res.render('login');
});

// Export the router object to make the routes available to the main application
module.exports = router;

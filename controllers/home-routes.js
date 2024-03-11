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

// Export the router object to make the routes available to the main application
module.exports = router;

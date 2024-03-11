// Import the Router object from Express for defining routes
const router = require('express').Router();
// Import the Brag and User models from the models directory
const { Brag, User } = require('../../models');
// Import the custom authentication middleware
const withAuth = require('../../utils/auth');

// Route to get one post/article by given post id
// Populates the post data and displays in the form for user to edit it
router.get('/:id', async (req, res) => {
  // router.get('/dashboard/:id', async (req, res) => {
  // Extract the post ID from the URL parameters
  const id = req.params.id;
  try {
    // Fetch the brag post with included user email
    const dbPostData = await Brag.findByPk(id, {
      include: [
        {
          // Include related user data
          model: User,
          // Select only the email attribute from the User model
          attributes: ['email', 'profile_photo'],
        },
      ],
    });

    // Handle post not found
    if (!dbPostData) {
      res
        .status(404)
        .json({ message: `No brag posts found for given id ${id}!` });
      return;
    }

    // Convert the post data to a plain JavaScript object
    const post = dbPostData.get({ plain: true });

    // Render the 'post-update' template with data for editing
    res.render('post-update', {
      // Spread the post data into the template variables using the spread operator
      ...post,
      pageTitle: 'Update Post',
      // Pass login status and username for context
      loggedIn: req.session.loggedIn,
      loggedInUser: req.session.user,
      loggedInUserPhoto: req.session.photo
    });
  } catch (error) {
    console.log(error); // Log any errors
    res.status(500).json(error); // Send a 500 error response
  }
});

// Use withAuth middleware to prevent access to route
// Route handler to display the dashboard (protected by withAuth middleware)
router.get('/', withAuth, async (req, res) => {
  // router.get('/dashboard', withAuth, async (req, res) => {
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
// Export the router object to make the routes available to the main application
module.exports = router;

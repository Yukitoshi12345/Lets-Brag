// Import the Router object from Express for defining routes
const router = require('express').Router();
// Import the Brag and User models from the models directory
const { Brag, User } = require('../models');

// Route to get one post/article by given post id
// Populates the post data and displays in the form for user to edit it
router.get('/dashboard/:id', async (req, res) => {
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

// Export the router object to make the routes available to the main application
module.exports = router;

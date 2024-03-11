// Import the Express router to create a new router instance
const router = require('express').Router();
// Route handler to render the login page
router.get('/', (req, res) => {
  // Redirect logged-in users to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // Render the 'login' template for users to log in
  res.render('login');
});

// Export the router for use in other parts of the application
module.exports = router;
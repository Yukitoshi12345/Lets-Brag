// Import the Router object from Express for defining routes
const router = require('express').Router();
// Import the User model for interacting with user data
const { User } = require('../../models');
// Import a custom authentication middleware for securing routes
const withAuth = require('../../utils/auth');



// Route handler to get a user's data by id (protected by withAuth middleware)
router.get('/:id', withAuth, async (req, res) => {
  const id = req.params.id; // Extract the user id from the URL
  try {
    // If the user isn't logged in, redirect to the login page
    if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
    }

    // Find the user with the given id, selecting only username and email fields
    const dbUserData = await User.findByPk(id, {
      attributes: {
        include: ['username', 'email', 'profile_photo'],
      },
    });

    if (!dbUserData) {
      // If user not found, send a 400 error
      res.status(400).json({ message: 'No user exists.' });
      return;
    }

    // Convert the user data to a plain JavaScript object and render the 'new-post' template
    const user = dbUserData.get({ plain: true });
    res.render('new-post', {
      ...user, // Spread the user data into the template variables
      pageTitle: 'New Post',
      loggedIn: req.session.loggedIn, 
      loggedInUserId: req.session.userId// Pass login status to the template
    });
  } catch (error) {
    console.log(error); // Log any errors
    res.status(500).json(error); // Send a 500 error response
  }
});

// -------------------------------------Sign Up
// Route handler for user signup
router.post('/', async (req, res) => {
  let dbUserData;
  try {
    // Check for duplicate username
    dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (dbUserData) {
      res.status(400).json({ message: 'Username already taken!' });
      return;
    }

    // Create a new user with the provided data
    dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password, // Password is hashed securely
    });

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;

      res
        .status(200)
        .json({ user: dbUserData, message: "Welcome to Let's Brag!" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//------------------------------------------------- Login
// Route handler for user login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      // Find user by email
      where: {
        email: req.body.email,
      },
    });

    // Handle invalid email or password
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    //when the email exists
    //when the query is about email only
    // Handle password validation
    if (!req.body.password) {
      // If no password is provided in the request body:

      // Send a response with status code 200 (OK) indicating success
      res.status(200).json({ message: 'Email address is correct!' });
      // Exit the current function (skip further processing)
      return;
    }

    //when the email exists and
    //the query contains both email and password
    // If password is provided, proceed with password validation
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      // Invalid password, send error response
      res
        .status(400)
        .json({ message: 'Incorrect password. Please try again!' });
      return;
    }

    // If password is valid (or not required), set up session variables and send successful login response
    // Set up session variables and send a successful login response
    // This code block executes only if the password is valid (or not required)
    req.session.save(() => {
      // Set the session variable 'loggedIn' to true to indicate a logged-in state
      req.session.loggedIn = true;
      // Store the user's ID in the session for future use
      req.session.userId = dbUserData.id;
      // Send a response with status code 200 (OK) and a JSON object containing the user data and a success message
      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
    // Catch any errors that occur during the login process
  } catch (error) {
    console.log(error); // Log the error for debugging purposes
    res.status(500).json(error); // Send a response with status code 500 (Internal Server Error) and the error message
  }
});

//---------------------------------------------- Logout
// Route handler for user logout
router.post('/logout', (req, res) => {
  // Check if the user is currently logged in
  if (req.session.loggedIn) {
    // Destroy the session to log the user out
    req.session.destroy(() => {
      // Send a response with status code 204 (No Content) to indicate successful logout
      res.status(204).end();
    });
  } else {
    // If the user is already logged out, send a response with status code 404 (Not Found)
    res.status(404).end();
  }
});

/*
//get user by id
// where id = session id
//to display user info in the navbar
router.get('/', async(req, res)=>{
  const id= req.session.userId;
  try {
    const dbUserData = await User.findByPk(id, {
      attributes: {
        include: ['username', 'profile_photo'],
      }
    });
    if (!dbUserData) {
      // If user not found, send a 400 error
      res.status(400).json({ message: 'No user exists.' });
      return;
    }
    // Convert the user data to a plain JavaScript object and render the 'new-post' template
    const user = dbUserData.get({ plain: true });
    res.status(200).json(user);
  } catch (error) {
    console.log(error); // Log any errors
    res.status(500).json(error); // Return a 500 error response
  }
});
*/

// Export the router object for use in the main application
module.exports = router;

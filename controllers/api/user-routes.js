const router = require('express').Router();
const { User } = require('../../models');
// Import the custom middleware
const withAuth = require('../../utils/auth');

// route to get the user with a given id
router.get('/:id', withAuth, async (req, res) => {
  const id = req.params.id;
  try {
    if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
    }

    const dbUserData = await User.findByPk(id, {
      attributes: {
        include: ['username', 'email'],
      },
    });

    if (!dbUserData) {
      res.status(400).json({ message: 'No user exists.' });
      return;
    }
    const user = dbUserData.get({ plain: true });
    res.render('new-post', {
      ...user,
      pageTitle: 'New Post',
      loggedIn: req.session.loggedIn,
      loggedInUser: req.session.user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// -------------------------------------Sign Up
router.post('/', async (req, res) => {
  let dbUserData;
  try {
    dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (dbUserData) {
      res.status(400).json({ message: 'Username already taken.!' });
      return;
    }
    dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;
      req.session.user = dbUserData.username;
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
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    //when the email doesn't exist in the system
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    //when the email exists
    //when the query is about email only
    if (!req.body.password) {
      res.status(200).json({ message: 'Email address is correct!' });
      return;
    }
    //when the email exists and
    //the query contains both email and password
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;
      req.session.user = dbUserData.username;
      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//---------------------------------------------- Logout
router.post('/logout', (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

// Middleware function to enforce authentication for protected routes
const withAuth = (req, res, next) => {
  // Check if the user is logged in by examining the `loggedIn` boolean flag in the session
  if (!req.session.loggedIn) {
    // User is not authenticated, redirect to the login page
    console.log(
      'User attempted to access protected route without authentication.',
    );
    res.redirect('/login');
  } else {
    // User is authenticated, proceed to the protected route
    console.log(
      'User is authenticated and authorized to access the protected route.',
    );
    next();
  }
};

// Export the `withAuth` middleware for use in protected routes
module.exports = withAuth;

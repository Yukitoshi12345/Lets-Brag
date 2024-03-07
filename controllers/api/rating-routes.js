// Import the Router object from Express to create routes
const router = require('express').Router();

// Import the database connection from the configuration file
const {  Rating } = require('../../models');

// Import the withAuth middleware function for authentication
const withAuth = require('../../utils/auth');

// Create a new or update an existing brag post rating
// Route handler for POST requests to the root path of this router
// This route is protected by the withAuth middleware, ensuring only logged-in users can access it.
router.post('/', withAuth, async (req, res) => {
  // Define a route handler for POST requests
  try {
    const [dbRatingData, created] = await Rating.findOrCreate({
      // Attempt to find or create a rating
      where: {
        // Conditions for finding or creating a rating
        rater_id: req.session.userId, // Match the rater_id with the logged-in user's ID
        brag_id: req.body.brag_id, // Match the brag_id with the one provided in the request
      },
      defaults: {
        // Default values for the rating record if it's being created
        rating: req.body.rating, // Set the rating value from the request
      },
    });
    console.log(created);

    if (created) {
      // If a new rating was created
      res.status(200).json(dbRatingData); // Respond with status 200 and the created rating data
    } else {
      // If an existing rating was updated
      const dbUpdatedRating = await Rating.update(
        // Update the existing rating
        {
          rating: req.body.rating, // Set the new rating value
        },
        {
          where: {
            // Conditions for updating the rating
            rater_id: req.session.userId, // Match the rater_id and brag_id
            brag_id: req.body.brag_id,
          },
        },
      );
      res.status(200).json(dbUpdatedRating); // Respond with status 200 and the updated rating data
    }
  } catch (err) {
    // Handle errors
    console.error(err); // Log the error for debugging
    res.status(400).json(err); // Respond with status 400 (Bad Request) and the error message
  }
});

// Export the router object for use in the main application
module.exports = router;

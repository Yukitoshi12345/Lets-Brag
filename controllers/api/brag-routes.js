// Import the Express router to create a new router instance
const router = require('express').Router();

// Import the database connection from the configuration file
const sequelize = require('../../config/connection');

// Import specific models from the models directory
const { Brag, Comment, User, Rating } = require('../../models');

// Import a middleware for authentication
const withAuth = require('../../utils/auth');

// Routes for handling posts (Brags)

// Route to get a single post with given ID
// route to get one post/article with given post id for post detail page
router.get('/:id', withAuth, async (req, res) => {
  const id = req.params.id;
  try {
    // Check if the user is logged in, redirect to login if not
    if (!req.session.loggedIn) {
      res.redirect('/login');
      // End the request processing
      return;
    }

    // Retrieve the post data from the database, including related models
    const dbPostData = await Brag.findByPk(id, {
      include: [
        {
          model: User, // Include the author's username
          attributes: ['username', 'profile_photo']
        }
        // {
        //   model: Rating, // Include associated ratings
        // },
      ],
      attributes: {
        include: [
          [
            sequelize.literal(
              `(SELECT AVG(r.rating) As avgRating FROM rating AS r INNER JOIN brag AS b ON r.brag_id = b.id WHERE b.id = ${id})`,
            ),
            'avgRating',
          ],
          [
            sequelize.literal(
              `(SELECT COUNT(r.rating) FROM rating AS r INNER JOIN brag AS b ON r.brag_id = b.id WHERE b.id = ${id})`,
            ),
            'totalRating',
          ],
        ], // Include calculated average and total ratings
      },
    });

    // If no post is found, return a 404 error
    if (!dbPostData) {
      res.status(404).json({ message: `No posts found for given id ${id}!` });
      return;
    }

    // Retrieve rating for the post
    const dbRatingData = await Rating.findOne({
      where: {
        brag_id: id, // Filter comments for the specific post
        rater_id: req.session.userId
      }
    });

    // Retrieve comments for the post
    const dbCommentData = await Comment.findAll({
      where: {
        brag_id: id, // Filter comments for the specific post
      },
      include: [
        {
          model: User, // Include the commenter's username
          attributes: ['username', 'profile_photo', 'id'],
        }
      ],
    });

    // Get plain objects for rendering
    const post = dbPostData.get({ plain: true });
    let rating;
    if(dbRatingData){
      rating = dbRatingData.get({ plain: true });
    }else{
      rating = null;
    }
    
    const comments = dbCommentData.map((comment) =>
      comment.get({ plain: true }),
    );

    // Add comments to the post object
    post.rating= rating;
    post.comments = comments;
 
    res.render('post-detail', {
      //using spread operator
      ...post, // Spread post data for easy access in the template
      // post,
      pageTitle: 'Post',
      loggedIn: req.session.loggedIn,
      loggedInUserId:  req.session.userId // Include user information for context
     
      
    });
  } catch (error) {
    console.log(error); // Log any errors
    res.status(500).json(error); // Return a 500 error response
  }
});

// Route to create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new post in the database, associating it with the current user
    const newPost = await Brag.create({
      ...req.body, // Use data from request body
      bragger_id: req.session.userId, // Set the author's ID
    });

    // Respond with the created post
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Route to update a post
router.put('/:id', withAuth, async (req, res) => {
  // Extract title and content from the request body
  const { title, content } = req.body;
  try {
    // Update the post in the database with the provided title and content
    // for the post matching the ID in the request parameter
    const dbUpdatedPost = await Brag.update(
      {
        title,
        content,
      },
      {
        where: {
          id: req.params.id, // Update the post with this specific ID
        },
      },
    );

    // Respond with a success status code (200) and the updated post data
    res.status(200).json(dbUpdatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Route to delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete the post from the database, ensuring the user is authorized
    // (i.e., the post's author) by matching the post ID and user ID
    const dbPostData = await Brag.destroy({
      where: {
        id: req.params.id, // Delete the post with this specific ID
        bragger_id: req.session.userId, // Only allow deletion by the post's author
      },
    });

    // If no post is found, return a 404 error
    if (!dbPostData) {
      res.status(404).json({ message: 'No brag post found with this id!' });
      return;
    }

    // Respond with a success status code (200) and the deleted post data
    // (optional: for confirmation purposes)
    res.status(200).json(dbPostData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
// Export the router for use in other parts of the application
module.exports = router;

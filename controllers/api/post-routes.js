// Import the Express router to create a new router instance
const router = require('express').Router();

// Import the database connection from the configuration file
const sequelize = require('../../config/connection');

// Import specific models from the models directory
const { Brag} = require('../../models');

const withAuth = require('../../utils/auth');

// Create new post
router.post('/', withAuth, async (req, res) => {
  try {
    const bragData = await Brag.create({
      title: req.body.title,
      content: req.body.content,
      brag_date: new Date().toJSON(),
      //photo: req.body.photo, // link to external URL\file
      bragger_id: req.session.user_id,
      //category_name: req.body.category_name,
    });

    res.status(200).json(bragData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Edit brag by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const brag = await Brag.update(
      {
        title: req.body.title,
        content: req.body.content,
        brag_date: new Date().toJSON(),
        //photo: req.body.photo, // link to external URL\file
        // category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
          bragger_id: req.session.user_id,
        },
      },
    );
    res.status(200).json(brag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Rate the brag by brags' id
// router.post('/rate/:id', withAuth, async (req, res) => {
//   try {
//     const bragData = await Rating.create({
//       rating: req.body.rating,
//       brag_id: req.params.id,
//       rater_id: req.session.user_id,
//     });

//     res.status(200).json(bragData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.put('/rate/:id', withAuth, async (req, res) => {
//   try {
//     const rate = await Rating.update(
//       {
//         rating: req.body.rating,
//       },
//       {
//         where: {
//           //id:  ???, todo find rating by user id
//           brag_id: req.params.id,
//           rater_id: req.session.user_id,
//         },
//       },
//     );
//     res.status(200).json(rate);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Export the router for use in other parts of the application
module.exports = router;

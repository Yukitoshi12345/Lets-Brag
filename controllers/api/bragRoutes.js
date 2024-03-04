// Import the Express router to create a new router instance
const router = require('express').Router();

// Import the database connection from the configuration file
const sequelize = require('../../config/connection');

// Import specific models from the models directory
const { Brag, Comment, User } = require('../../models')

router.post('/', async (req, res) => {
    try {
        const bragData = await Brag.create({
            title: req.body.title,
            content: req.body.content,
            photo: req.body.photo,
            category_name: req.body.category_name,
          });

          res.status(200).json(bragData);

    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.put('/:id', async (req, res) => {
    try {
      const brag = await Brag.update(
        {
            title: req.body.title,
            content: req.body.content,
            photo: req.body.photo,
            category_name: req.body.category_name,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json(dish);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
// Export the router for use in other parts of the application
module.exports = router;
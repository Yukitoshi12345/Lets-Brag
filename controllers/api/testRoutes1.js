// Import the Express router to create a new router instance
const router = require('express').Router();

// Import the database connection from the configuration file
const sequelize = require('../../config/connection');

// Import specific models from the models directory
const { testEg1, testEg2, testEg3 } = require('../../models')




router.get('/', async (req, res) => {

});



// Export the router for use in other parts of the application
module.exports = router;
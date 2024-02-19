const router = require('express').Router();
const sequelize = require('../../config/connection');

const { testEg1, testEg2, testEg3 } = require('../../models')




router.get('/', async (req, res) => {

});



// Export the router for use in other parts of the application
module.exports = router;
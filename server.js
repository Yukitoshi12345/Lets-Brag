// Import required modules
// TODO: Add more modules
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');

// Create an Express application instance
const app = express();
// Set the port for the server
const PORT = process.env.PORT || 3001; // Use PORT from environment variable or default to 3001

// TODO: add stuff here

// Middleware to parse incoming request bodies in JSON format
app.use(express.json());
// Middleware to parse URL-encoded data with extended options
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

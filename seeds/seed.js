// Import Sequelize connection from the configuration file
const sequelize = require('../config/connection');

// Import model definitions from the 'models' directory
const { User, Brag, Comment, Rating } = require('../models');

// Import sample data from JSON files
const userData = require('./userData.json');
const bragData = require('./bragData.json');
const commentData = require('./commentData.json');
const ratingData = require('./ratingData.json');

// Function to seed the database with sample data
const seedDatabase = async () => {
  // Synchronize database schema (drop and recreate all tables)
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  // Seed the User table with sample user data
  await User.bulkCreate(userData, {
    individualHooks: true, // Run individual table hooks for each user
    returning: true, // Return the created user instances
  });

  console.log('\n----- USERS SEEDED -----\n');

  // Seed the Brag table with sample brag data
  await Brag.bulkCreate(bragData, {
    individualHooks: true, // Run individual table hooks for each brag
    returning: true, // Return the created brag instances
  });
  console.log('\n----- BRAGS SEEDED -----\n');

  // Seed the Comment table with sample comment data
  await Comment.bulkCreate(commentData);
  console.log('\n----- COMMENTS SEEDED -----\n');

  // Seed the Rating table with sample rating data
  await Rating.bulkCreate(ratingData);
  console.log('\n----- RATINGS SEEDED -----\n');

  // Exit the process with successful exit code (0)
  process.exit(0);
};

// Call the seedDatabase function to initiate the seeding process
seedDatabase();

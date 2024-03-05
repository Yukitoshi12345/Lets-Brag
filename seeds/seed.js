const sequelize = require('../config/connection');
const { User, Brag, Comment, Rating } = require('../models');

const userData = require('./userData.json');
const bragData = require('./bragData.json');
const commentData = require('./commentData.json');
const ratingData = require('./ratingData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  console.log('\n----- USERS SEEDED -----\n');

  await Brag.bulkCreate(bragData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n----- BRAGS SEEDED -----\n');

  await Comment.bulkCreate(commentData);
  console.log('\n----- COMMENTS SEEDED -----\n');

  await Rating.bulkCreate(ratingData);
  console.log('\n----- RATINGS SEEDED -----\n');

  process.exit(0);
};

seedDatabase();

// Import required modules
const { Model, DataTypes } = require('sequelize'); // Sequelize model and data types
const sequelize = require('../config/connection.js'); // Sequelize connection instance

// Define the Rating model
class Rating extends Model {}

// Initialise the Rating model schema
Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Set default rating to 0
      validate: {
        isInt: true, // Ensure rating is an integer
        max: 5, // Set maximum rating value
        min: 1, // Set minimum rating value
      },
    },

    brag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'brag', // Foreign key referencing the Brag model
        key: 'id',
      },
    },
    rater_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // Foreign key referencing the User model
        key: 'id',
      },
    },
  },
  {
    // Define model configuration options
    sequelize, // Specify the Sequelize connection instance
    timestamps: false, // Disable automatic timestamp columns (createdAt, updatedAt)
    freezeTableName: true, // Prevent Sequelize from pluralising the table name
    underscored: true, // Convert camelCase column names to snake_case
    modelName: 'rating', // Define the model name
  },
);

// Export the Rating model
module.exports = Rating;

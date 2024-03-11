const { Model, DataTypes } = require('sequelize'); // Sequelize model and data types
const sequelize = require('../config/connection'); // Sequelize connection instance
const dayjs = require('dayjs'); // Library for date/time manipulation

// Define the Comment model
class Comment extends Model {}

// Initialise the Comment model schema
Comment.init(
  {
    // Define model attributes (columns)
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: dayjs().format('YYYY-MM-DD hh:mm:ss'), // Set default date to current timestamp
    },
    brag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'brag', // Foreign key referencing the Brag model
        key: 'id',
      },
    },
    commenter_id: {
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
    modelName: 'comment', // Define the model name
  },
);

// Export the Comment model
module.exports = Comment;

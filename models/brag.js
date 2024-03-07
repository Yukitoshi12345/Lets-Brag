// Import required modules
const { Model, DataTypes } = require('sequelize'); // Sequelise model and data types
const sequelize = require('../config/connection'); // Sequelise connection instance
const { titleize } = require('../utils/helpers'); // Utility function for title capitalisation
const dayjs = require('dayjs'); // Library for date/time manipulation

// Define the Brag model
class Brag extends Model {}

// Initialise the Brag model schema
Brag.init(
  {
    id: {
      // Define model attributes (columns)
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    brag_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: dayjs().format('YYYY-MM-DD hh:mm:ss'), // Set default date to current timestamp
    },
    post_photo: {
      type: DataTypes.STRING,
      defaultValue: null, // Allow null value for post_photo
    },
    bragger_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // Foreign key referencing the User model
        key: 'id',
      },
    },
  },
  {
    // Define model hooks (lifecycle events)
    hooks: {
      beforeCreate: async (newBragData) => {
        // Use the 'beforeCreate' hook to capitalise the brag title before creation
        newBragData.title = await titleize(newBragData.title);
        return newBragData; // Return the modified data
      },
      beforeUpdate: async (updatedBragData) => {
        // Use the 'beforeUpdate' hook to capitalise the brag title before update
        updatedBragData.title = await titleize(updatedBragData.title);
        return updatedBragData; // Return the modified data
      },
    },
    // Define model configuration options
    sequelize, // Specify the Sequelize connection instance
    timestamps: false, // Disable automatic timestamp columns (createdAt, updatedAt)
    freezeTableName: true, // Prevent Sequelize from pluralising the table name
    underscored: true, // Convert camelCase column names to snake_case
    modelName: 'brag', // Define the model name
  },
);

// Export the Brag model
module.exports = Brag;

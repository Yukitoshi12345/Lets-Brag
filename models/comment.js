const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}
// We dont rate comments out of 5
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    [username]: {
      // Insert information
    },
    [description]: {
      // Insert information
    },
    [date/time]: {
      // Insert information
    },
    [maybe upvote/downvote]: {
      // Insert information
    },
    [category_name]: {
      // Insert information
    },
    // Rename Category 2
    Category2_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'comment',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    // timestamps true or false?
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    // Update category2 name
    modelName: 'comment',
  },
);

// Rename Category2
module.exports = Comment;

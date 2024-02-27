const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Category2 extends Model {}

Category2.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    [category_name]: {
      // Insert information
    },
    [category_name]: {
      // Insert information
    },
    [category_name]: {
      // Insert information
    },
    [category_name]: {
      // Insert information
    },
    [category_name]: {
      // Insert information
    },
    // Rename Category 2
    Category2_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category2',
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
    modelName: 'category2',
  },
);

// Rename Category2
module.exports = Category2;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Rename Category 2 and category_name
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
  },
  {
    sequelize,
    // timestamps true or false?
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    // Update category2 name
    modelName: 'Category2',
  }
);

// Rename Category2
module.exports = Category2;

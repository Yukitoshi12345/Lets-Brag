const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Rename Category 1 and category_name
class Category1 extends Model {}

Category1.init(
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
    // Update category1 name
    modelName: 'Category1',
  }
);

// Rename Category1
module.exports = Category1;

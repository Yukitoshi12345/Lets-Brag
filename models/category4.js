const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Rename Category 3 and category_name
class Category3 extends Model {}

Category3.init(
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
    // Rename Category 3
    Category3_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category3',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    // timestamps true or false?
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    // Update category3 name
    modelName: 'Category3',
  },
);

// Rename Category3
module.exports = Category3;

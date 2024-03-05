const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Rating extends Model {}

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
      defaultValue: 0,
      validate: {
        isInt: true,
        max: 5,
        min: 1,
      },
    },

    brag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'brag',
        key: 'id',
      },
    },
    rater_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'rating',
  },
);

module.exports = Rating;

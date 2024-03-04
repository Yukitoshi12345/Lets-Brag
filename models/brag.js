const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const {titleize} = require('../utils/helpers');
const dayjs = require("dayjs");

class Brag extends Model {}

Brag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    brag_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: dayjs().format('YYYY-MM-DD hh:mm:ss')
    },
    photo: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    bragger_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    hooks: {
        // Use the beforeCreate hook to work with data before a new instance is created
        beforeCreate: async (newBragData) => {
            //titleize capitalized the first letter of every word
            newBragData.title = await titleize(newBragData.title);
            return newBragData;
        },
        beforeUpdate: async (updatedBragData) => {
            updatedBragData.title = await titleize(updatedBragData.title);
            return updatedBragData;
        },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'brag',
  }
);

module.exports = Brag;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// schema diagrams
// One user can have many brag
// One brag belongs to one user only
// Comments relating to brag
// One comment belongs to one user
// One user can have many comments
// One brag can have many rating
// one rating can have one brag
// {any others I missed or need to add}


// Brag is kinda equivalent to post
// Change brag to post for readers???
// Rename Category 1 and category_name
class Brag extends Model {}

Brag.init(
  {
    id: {
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
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'user',
          key: 'id'
      }
    }
  },
  {
    sequelize,
    // timestamps true or false?
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    // Update category1 name
    modelName: 'Brag',
  },
);

// Rename Category1
module.exports = Brag;

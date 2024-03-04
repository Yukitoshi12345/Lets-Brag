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
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    brag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'brag',
        key: 'id',
        unique: false
      },
    },
    commenter_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        unique: false
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);


// Rename Category2
module.exports = Comment;

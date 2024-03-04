const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const saltRounds = 3;

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
// username unique
// email unique
// password not unique
// we go for minimum -> no first name and last name.
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(35),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isAlphanumeric :true
      }
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        is: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/i,
      },
    },
  },
  {
    hooks: {
      beforeCreate: async(newUserData) =>{
        //username first letter capitalizing
        newUserData.username = await capitalize(newUserData.username);
        // In this case, we are taking the user's email address, and making all letters lower case before adding it to the database.
        newUserData.email = await newUserData.email.toLowerCase();
        //storing password in hashed format
        newUserData.password = await bcrypt.hash(newUserData.password, saltRounds);
        return newUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;

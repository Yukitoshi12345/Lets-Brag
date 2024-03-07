// Import required modules
const { Model, DataTypes } = require('sequelize'); // Sequelize model and data types
const bcrypt = require('bcrypt'); // Password hashing library
const sequelize = require('../config/connection'); // Sequelize connection instance
const { capitalize } = require('../utils/helpers'); // Utility function for capitalisation

// Define the salt rounds for password hashing
const saltRounds = 3; // Higher rounds take longer to compute but are more secure

class User extends Model {
  // Instance method to check a user's password against a provided login password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password); // Compare hashed password with login password
  }
}

// Initialise the User model schema
User.init(
  {
    // Define model attributes (columns)
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensure email is a valid email format
        notNull: true, // Email cannot be null
        notEmpty: true, // Email cannot be empty
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true, // Password cannot be null
        notEmpty: true, // Password cannot be empty
        is: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/i, // Regular expression for password complexity
      },
    },
    username: {
      type: DataTypes.STRING(35),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true, // Username cannot be null
        notEmpty: true, // Username cannot be empty
        isAlphanumeric: true, // Username must only contain letters and numbers
      },
    },
    profile_photo: {
      type: DataTypes.STRING,
      defaultValue: null, // Allow null value for profile_photo
    },
  },
  {
    // Define model hooks (lifecycle events)
    hooks: {
      beforeCreate: async (newUserData) => {
        // Capitalise the first letter of the username before creation
        newUserData.username = await capitalize(newUserData.username);

        // In this case, we are taking the user's email address, and making all letters lower case before adding it to the database.
        // Convert the email address to lowercase before storage
        newUserData.email = await newUserData.email.toLowerCase();

        // Storing password in hashed format
        // Hash the user's password before storing it in the database
        newUserData.password = await bcrypt.hash(
          newUserData.password,
          saltRounds,
        );
        return newUserData; // Return the modified user data
      },
    },

    // Define model configuration options
    sequelize, // Specify the Sequelize connection instance
    timestamps: false, // Disable automatic timestamp columns (createdAt, updatedAt)
    freezeTableName: true, // Prevent Sequelize from pluralising the table name
    underscored: true, // Convert camelCase column names to snake_case
    modelName: 'user', // Define the model name
  },
);

// Export the User model
module.exports = User;

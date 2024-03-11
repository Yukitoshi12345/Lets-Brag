// Import model definitions
const Brag = require('./Brag');
const Comment = require('./Comment');
const Rating = require('./Rating');
const User = require('./User');

// Define Model Associations (Relationships)

// Brag - Comment Association (One-to-Many)
Brag.hasMany(Comment, {
  foreignKey: 'brag_id', // Foreign key in the Comment table referencing the Brag model
  onDelete: 'CASCADE', // Delete associated comments when a brag is deleted
});
Comment.belongsTo(Brag, {
  foreignKey: 'brag_id', // Foreign key in the Comment table referencing the Brag model
});

// Brag - User Association (One-to-Many)
User.hasMany(Brag, {
  foreignKey: 'bragger_id', // Foreign key in the Brag table referencing the User model
  onDelete: 'CASCADE', // Delete associated brags when a user is deleted
});

Brag.belongsTo(User, {
  foreignKey: 'bragger_id', // Foreign key in the Brag table referencing the User model
});

// Brag - Rating Association (One-to-One)
Brag.hasOne(Rating, {
  foreignKey: 'brag_id', // Foreign key in the Rating table referencing the Brag model
  onDelete: 'CASCADE', // Delete associated rating when a brag is deleted
});

Rating.belongsTo(Brag, {
  foreignKey: 'brag_id', // Foreign key in the Rating table referencing the Brag model
});

// User - Rating Association (One-to-One)
User.hasOne(Rating, {
  foreignKey: 'rater_id', // Foreign key in the Rating table referencing the User model
  onDelete: 'CASCADE', // Delete associated rating when a user is deleted
});

Rating.belongsTo(User, {
  foreignKey: 'rater_id', // Foreign key in the Rating table referencing the User model
});

// User - Comment Association (One-to-Many)
User.hasMany(Comment, {
  foreignKey: 'commenter_id', // Foreign key in the Comment table referencing the User model
  onDelete: 'CASCADE', // Delete associated comments when a user is deleted
});
Comment.belongsTo(User, {
  foreignKey: 'commenter_id', // Foreign key in the Comment table referencing the User model
});

// Export all models for use in other parts of the application
module.exports = { Brag, Comment, Rating, User };

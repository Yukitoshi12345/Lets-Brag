const Brag = require('./Brag');
const Comment = require('./Comment');
const Rating = require('./Rating');
const User = require('./User');

//defining Model associations

//Brag<>Comment
Brag.hasMany(Comment, {
  foreignKey: 'brag_id',
  onDelete: 'CASCADE',
});
Comment.belongsTo(Brag, {
  foreignKey: 'brag_id',
});

//Brag<>User
User.hasMany(Brag, {
  foreignKey: 'bragger_id',
  onDelete: 'CASCADE',
});
Brag.belongsTo(User, {
  foreignKey: 'bragger_id',
});

//Brag<>Rating
Brag.hasOne(Rating, {
  foreignKey: 'brag_id',
  onDelete: 'CASCADE',
});
Rating.belongsTo(Brag, {
  foreignKey: 'brag_id',
});

//User<>Rating
User.hasOne(Rating, {
  foreignKey: 'rater_id',
  onDelete: 'CASCADE',
});
Rating.belongsTo(User, {
  foreignKey: 'rater_id',
});

//User<>Comment
User.hasMany(Comment, {
  foreignKey: 'commenter_id',
  onDelete: 'CASCADE',
});
Comment.belongsTo(User, {
  foreignKey: 'commenter_id',
});

module.exports = { Brag, Comment, Rating, User };

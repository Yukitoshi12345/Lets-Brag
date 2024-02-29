const Brag = require('./brag');
const Comment = require('./comment');
const Category3 = require('./category3');
const Category4 = require('./category4');
const Category5 = require('./category5');
const Category6 = require('./category6');

// Examples which we can edit:
Brag.hasOne(Comment, {
  foreignKey: 'brag_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Brag, {
  foreignKey: 'brag_id',
});

Brag.hasMany(Category3, {
  foreignKey: 'brag_id',
  onDelete: 'CASCADE',
});

Category3.belongsTo(Brag, {
  foreignKey: 'brag_id',
});

module.exports = { Brag, Comment, Category3, Category4, Category5, Category6 };

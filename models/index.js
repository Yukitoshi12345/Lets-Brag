const Category1 = require('./category1');
const Category2 = require('./category2');
const Category3 = require('./category3');

// Examples which we can edit:
Category1.hasOne(Category2, {
  foreignKey: 'category1_id',
  onDelete: 'CASCADE',
});

Category2.belongsTo(Category1, {
  foreignKey: 'category1_id',
});

Category1.hasMany(Category3, {
  foreignKey: 'category1_id',
  onDelete: 'CASCADE',
});

Category3.belongsTo(Category1, {
  foreignKey: 'category1_id',
});

module.exports = { Category1, Category2, Category3 };

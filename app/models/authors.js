'use strict';

module.exports = (sequelize, DataTypes) => {

  const Authors = sequelize.define('Authors', {
    name: DataTypes.STRING,
    no_of_books: DataTypes.INTEGER,
    place: DataTypes.STRING,
    genre : DataTypes.STRING,
    likes : DataTypes.INTEGER,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    classMethods: {
      associate: (models) => {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  });
  return Authors;
};


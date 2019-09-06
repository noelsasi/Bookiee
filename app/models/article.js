// Example model

'use strict';

module.exports = (sequelize, DataTypes) => {

  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    text: DataTypes.STRING,
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

  return Article;
};


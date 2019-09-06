'use strict';

module.exports = (sequelize, DataTypes) => {

  const Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
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
  return Users;
};


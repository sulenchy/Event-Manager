'use strict';
module.exports = (sequelize, DataTypes) => {
  var Centers = sequelize.define('Centers', {
    email: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Centers;
};
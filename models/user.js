"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fullName: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: true,
      freezeTableName: true,
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    }
  );
  User.associate = function(models) {
    User.belongsToMany(models.Film, {
      through: "UserFilm",
      as: 'films',
      foreignKey: 'userId',
      otherKey: "filmId"
    });
  };
  return User;
};

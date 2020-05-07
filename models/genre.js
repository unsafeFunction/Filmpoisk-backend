"use strict";

module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    "Genre",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
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
  return Genre;
};

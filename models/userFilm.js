'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserFilm = sequelize.define(
    'UserFilm',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      filmId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    }
  );
  UserFilm.associate = function(models) {};
  return UserFilm;
};

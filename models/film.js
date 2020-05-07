'use strict';

module.exports = (sequelize, DataTypes) => {
  const Film = sequelize.define(
    'Film',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      genreId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      poster: {
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
  Film.associate = function(models) {
    Film.belongsToMany(models.User, {
      through: 'UserFilm',
      as: "users",
      foreignKey: "filmId",
      otherKey: 'userId'
    });
    Film.belongsTo(models.Genre, {
      as: "filmGenre",
      foreignKey: "id"
    });
  };
  return Film;
};

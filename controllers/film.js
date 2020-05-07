const Sequelize = require("sequelize");
const faker = require("faker");
const { Film, User, UserFilm, Genre } = require("../models");

const { Op } = Sequelize;

module.exports = {
  async create(req, res) {
    try {
      const film = await Film.create(req.body);

      return res.status(201).send(film);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async findAll(req, res) {
    const { name, genreId, isFeatured, limit, offset } = req.query;

    let searchQuery = {};

    if (name) {
      searchQuery = Object.assign({}, searchQuery, {
        name: {
          [Op.iLike]: `%${name}%`
        }
      });
    }

    if (genreId) {
      searchQuery = Object.assign({}, searchQuery, {
        genreId
      });
    }

    if (isFeatured && isFeatured !== "false") {
      searchQuery = Object.assign({}, searchQuery, {
        isFeatured
      });
    }

    try {
      const films = await Film.findAndCountAll({
        where: searchQuery,
        limit: limit || 10,
        offset,
        include: [
          {
            model: User,
            as: "users",
            through: {
              model: UserFilm,
              as: 'userFilm',
              attributes: ['rating']
            }
          },
          {
            model: Genre,
            as: "filmGenre"
          }
        ]
      });

      return res.status(201).send(films);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },
  async get(req, res) {
    const { id } = req.params;

    try {
      const films = await Film.findOne({
        where: {
          id
        },
        include: [
          {
            model: User,
            as: "users",
            through: {
              model: UserFilm,
              as: 'userFilm',
              attributes: ["rating"]
            }
          },
          {
            model: Genre,
            as: "filmGenre"
          }
        ]
      });

      return res.status(201).send(films);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },
  async setRating(req, res) {
    const { rating } = req.body;
    const { id } = req.params;

    try {
      const filmRating = await UserFilm.update(
        { rating },
        {
          where: {
            id
          },
          plain: true,
          returning: true
        }
      );

      return res.status(201).send(filmRating[1]);
    } catch (error) {
      return error;
    }
  },
  async createRating(req, res) {
    const { body } = req;
    try {
      const user = await User.create({
        isFeatured: false,
        fullName: faker.name.findName()
      });
      const filmRating = await UserFilm.create({
        filmId: +body.filmId,
        rating: +body.rating,
        userId: user.id
      });
      return res.status(201).send({
        ...filmRating.dataValues,
        user
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};

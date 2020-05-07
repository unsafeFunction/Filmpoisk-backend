const { User, Film, UserFilm } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const user = await User.create(req.body);

      return res.status(201).send(user);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async get(req, res) {
    const { id } = req.params;
    const query = {};

    try {
      const user = await User.findOne({
        where: {
          id
        },
        include: [
          {
            model: Film,
            as: "films",
            where: {
              isFeatured: true
            },
            through: {
              model: UserFilm,
              as: 'userFilm'
              // attributes: ["rating"]
            }
          }
        ]
      });

      return res.status(201).send(user);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

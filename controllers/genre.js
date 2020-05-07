const { Genre } = require('../models');

module.exports = {
  async findAll(req, res) {
    try {
      const genres = await Genre.findAll();
      return res.status(201).send(genres);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

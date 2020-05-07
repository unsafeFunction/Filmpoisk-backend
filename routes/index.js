const express = require('express');

const router = express.Router();

const controllers = require("../controllers");

const { user, film, genre } = controllers;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/users", user.create);
router.get("/users/:id", user.get);

router.post("/films", film.create);
router.get("/films", film.findAll);
router.get("/films/recommendations", film.findRecommendations);
router.get("/films/:id", film.get);
router.patch("/films/rating/:id", film.setRating);
router.post("/films/rating", film.createRating);
router.get("/genres", genre.findAll);

module.exports = router;

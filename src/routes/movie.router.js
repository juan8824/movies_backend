const { getAll, create, getOne, remove, update, setGenres, setActors, setDirectors } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);

movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRouter.route('/:id/genres')
    .post(setGenres)

movieRouter.route('/:id/actors')
    .post(setActors)

movieRouter.route('/:id/directors')
    .post(setDirectors)

module.exports = movieRouter;
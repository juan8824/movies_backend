const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Actor = require('./Actor');
const Genre = require('./Genre');
const Director = require('./Director');

const Movie = sequelize.define('movie', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    synopsis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

Movie.hasMany(Actor);
Actor.belongsTo(Movie);

Movie.hasMany(Genre);
Genre.belongsTo(Movie);

Movie.hasMany(Director);
Director.belongsTo(Movie);

module.exports = Movie;
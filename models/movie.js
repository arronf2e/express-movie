var mongoose = require('mongoose');
var MovieSchema = require('../schmas/movie');
var Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie;
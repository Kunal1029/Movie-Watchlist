// models/movie.js
const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    watchStatus: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    reviews: {
        type: String
    }
});

const Movie = mongoose.model("WatchList", movieSchema);
module.exports = Movie;

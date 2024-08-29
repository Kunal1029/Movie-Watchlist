const express = require("express");
const webrouter = express.Router();
const moviesController = require("../controller/Controller");
// const MovieM = require("../Model/movie.js")
// const validation = require("./Validation.js")

// MoviesLists
webrouter.get("/", moviesController.getAllMovies);

// movie details
webrouter.get("/:id", moviesController.getOneMovie);

// insert new movie
webrouter.post("/", moviesController.insertMovie);

// edit and Update movie
webrouter.post("/:id", moviesController.updateMovie);

// Delete any movie
webrouter.delete("/:id/del", moviesController.deleteMovie);

// Movie status
webrouter.put("/:id/status",moviesController.IsWatch);

// Rating and review
webrouter.put("/comment/:id",moviesController.commentUpdate);

module.exports = webrouter;

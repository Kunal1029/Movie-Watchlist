const Watchlist = require("../Model/movie");
const MovieModel = require("../Model/movie");

exports.getAllMovies = async (req, res) => {
  try {
    const allmovies = await Watchlist.find();
    res.json(allmovies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneMovie = async (req, res) => {
  try {
    const movie = await MovieModel.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.insertMovie = async (req, res) => {
  const {
    title,
    description,
    imageUrl,
    releaseYear,
    genre,
    watchStatus,
    rating,
    reviews,
  } = req.body;

  try {
    const InsertMovie = new MovieModel({
      title,
      description,
      imageUrl,
      releaseYear,
      genre,
      watchStatus,
      rating,
      reviews,
    });

    const movie = await InsertMovie.save();
    res.status(201).json(movie);
    // console.log(movie)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movie = await MovieModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res.status(404).json({ message: "Movie don't exist" });
    }
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await MovieModel.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie don't exist" });
    }
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.IsWatch = async (req, res) => {
  try {
    // const { id } = req.params;
    const { watchStatus } = req.body;
    const movie = await MovieModel.findByIdAndUpdate(
      req.params.id,
      { watchStatus },
      { new: true, runValidators: true }
    );
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.commentUpdate = async (req, res) => {
  try {
    const { rating, reviews } = req.body;
    const movie = await MovieModel.findByIdAndUpdate(
      req.params.id,
      { rating, reviews },
      { new: true, runValidators: true }
    );

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
    // console.log(req.params.id, rating, reviews)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


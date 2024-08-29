/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMovie, movieDetail } from "../features/watchlist/watchListSlice";
import { useNavigate } from "react-router-dom";

function EditForm({ mid}) {
  const movieId = mid;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { watchLists } = useSelector((state) => state.watchlist);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    releaseYear: 0,
    genre: "",
    watchStatus: false,
    rating: 5,
    reviews: "",
  });

  useEffect(() => {
    dispatch(movieDetail(movieId));
  }, [dispatch, movieId]);

  const movie = watchLists.find((movie) => movie._id === movieId);

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        description: movie.description,
        imageUrl: movie.imageUrl,
        releaseYear: movie.releaseYear,
        genre: movie.genre,
        watchStatus: movie.watchStatus,
        rating: movie.rating,
        reviews: movie.reviews,
        
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        updateMovie({ id: movieId, updatedData: formData })
      );
      if (updateMovie.fulfilled.match(result)) {
        setFormData({
          title: "",
          description: "",
          imageUrl: "",
          releaseYear: 0,
          genre: "",
          watchStatus: false,
          rating: 5,
          reviews: "",
          
        });

        navigate("/");
      } else {
        console.error("Failed to update movie:", result.payload);
      }
    } catch (error) {
      console.error("Failed to update movie:", error);
    }
  };

  // if (loading === "loading") return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}  className="text-center">
        <div className="edForm mb-4">
          <label htmlFor="title">Title</label><br/>
          <input className="mt-2"
            type="text"
            value={formData.title}
            onChange={handleChange}
            id="title"
          />
        </div>
        <div className="edForm mb-4">
          <label htmlFor="description">Description</label><br/>
          <input className="mt-2"
            type="text"
            value={formData.description}
            onChange={handleChange}
            id="description"
          />
        </div>
        <div className="edForm mb-4">
          <label htmlFor="imageUrl">Image URL</label><br/>
          <input className="mt-2"
            type="text"
            value={formData.imageUrl}
            onChange={handleChange}
            id="imageUrl"
          />
        </div>
        <div className="edForm mb-4 " >
          <label htmlFor="releaseYear">Release Year</label><br/>
          <input className="mt-2"
            type="number"
            value={formData.releaseYear}
            onChange={handleChange}
            id="releaseYear"
          />
        </div>
        <div className="edForm mb-4">
          <label htmlFor="genre">Genre</label><br/>
          <input className="mt-2"
            type="text"
            value={formData.genre}
            onChange={handleChange}
            id="genre"
          />
        </div>

        <div className="edForm mb-4">
          <label htmlFor="rating">Rating</label><br/>
          <input className="mt-2"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            id="rating"
            min="1"
            max="5"
          />
        </div>
        <div className="edForm mb-4">
          <label htmlFor="reviews">Reviews</label><br/>
          <textarea
            value={formData.reviews}
            onChange={handleChange}
            id="reviews"
          />
        </div>
        


        <div className=" form-check">
          {/* <label htmlFor="watchStatus" className="form-check-label">Watch Status</label><br/> */}
          <input hidden
            type="checkbox"
            checked={formData.watchStatus}
            onChange={handleChange}
            id="watchStatus"
            className="form-check-input "
          />
        </div>
        <button type="submit" className="adBtn btn">Update Movie</button>
      </form>
    </div>
  );
}

export default EditForm;

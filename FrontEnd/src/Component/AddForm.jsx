import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewMovie } from "../features/watchlist/watchListSlice";
import { useNavigate } from "react-router-dom";


function AddForm() {
  const [mov, setMov] = useState({
    title: "",
    description: "",
    imageUrl: "",
    releaseYear: 0,
    genre: "",
    watchStatus: false,
    rating: 5,
    reviews: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (evt) => {
    evt.preventDefault();
    // console.log(mov)
    try {
      const actionResult = await dispatch(addNewMovie(mov));
      if (addNewMovie.fulfilled.match(actionResult)) {
        setMov({
          title: "",
          description: "",
          imageUrl: "",
          releaseYear: 0,
          genre: "",
          watchStatus: false,
          rating: 5,
          reviews: "",
        })
        
        navigate("/");
      } else {
        console.error('Failed to add movie:', actionResult.payload);
      }
    } catch (error) {
      console.error('Failed to add movie:', error);
    }
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setMov((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
    // console.log(id,value,type,checked)
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="col-md-10">
        <div className="mb-3 adForm">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={mov.title}
            onChange={handleChange}
            id="title"
            className="form-control"
          />
        </div>

        <div className="mb-3 adForm">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            value={mov.description}
            onChange={handleChange}
            id="description"
            className="form-control"
          />
        </div>

        <div className="mb-3 adForm">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            value={mov.imageUrl}
            onChange={handleChange}
            id="imageUrl"
            className="form-control"
          />
        </div>

        <div className="mb-3 adForm">
          <label htmlFor="releaseYear">Release Year</label>
          <input
            type="number"
            value={mov.releaseYear}
            onChange={handleChange}
            id="releaseYear"
            className="form-control"
          />
        </div>

        <div className="mb-3 adForm">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            value={mov.genre}
            onChange={handleChange}
            id="genre"
            className="form-control"
          />
        </div>

        <div className="mb-3 adForm">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            value={mov.rating}
            onChange={handleChange}
            id="rating"
            min="1"
            max="5"
            className="form-control"
          />
        </div>

        <div className="mb-3 adForm">
          <label htmlFor="reviews">Reviews</label>
          <textarea
            value={mov.reviews}
            onChange={handleChange}
            id="reviews"
            className="form-control"
          />
        </div>

        <div className="mb-3 form-check">
          <label className="form-check-label" htmlFor="watchStatus">Watch Status</label>
          <input
            type="checkbox"
            checked={mov.watchStatus}  
            onChange={handleChange}
            id="watchStatus"
            className="form-check-input"
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn adBtn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddForm;

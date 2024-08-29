import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import {
  movieDetail,
  commentMovie,
} from "../features/watchlist/watchListSlice";
// import { useNavigate } from "react-router-dom";
// import CommentForm from "./CommentForm";

// eslint-disable-next-line react/prop-types
function MovieDetails({ mid }) {
  const movieId = mid;
  const dispatch = useDispatch();
  const { watchLists, loading, error } = useSelector(
    (state) => state.watchlist
  );
  const [isEdit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    rating: "",
    reviews: "",
  });

  useEffect(() => {
    dispatch(movieDetail(movieId));
  }, [dispatch, movieId]);

  if (loading === "loading") {
    <div>Looking...</div>;
  }

  if (loading === "failed") {
    <div>Error: {error}</div>;
  }

  const movie = watchLists.find((movie) => movie._id === movieId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      commentMovie({
        id: movieId,
        rating: formData.rating,
        reviews: formData.reviews,
      })
    );
    setEdit(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          key={i}
          className={i < rating ? "fa-solid fa-star" : "fa-regular fa-star"}
          style={{ color: "#FFD43B" }}
        ></i>
      );
    }
    return stars;
  };

  const editC = () => {
    setEdit(!isEdit); // Toggle edit mode
    // Set initial form data when switching to edit mode
    if (!isEdit) {
      setFormData({
        rating: movie.rating.toString(),
        reviews: movie.reviews,
      });
    }
  };

  // const nv = useNavigate();
  // const RR = (ids)=>{
  //   nv(`/comment/${ids}`)
  // }

  return (
    <div className="mb-5">
      {movie ? (
        <div className="d-flex flex-column container align-item-center justify-content-center mt-1">
          {/* Display movie details */}
          <div className="card bg-transparent text-dark  p-0">
            <img
              src="/m1.jpg"
              className=""
              style={{
                borderTopRightRadius: "14px",
                borderTopLeftRadius: "14px",
              }}
              alt="..."
            />
            <div className="card-body">
              <h2 className="text-danger text-center">{movie.title}</h2>
              <h5 className="mt-3">Description : {movie.description}</h5>
            </div>
          </div>

          {/* Edit review and rating */}
          <div className="text-dark  d-flex flex-column align-item-center justify-content-center">
            <h5 className="">
              <span className="text-danger">Genre : </span>
              {movie.genre}
            </h5>

            <h5 className="mt-2">
              <span className="text-danger">Released in </span>{" "}
              {movie.releaseYear}
            </h5>

            {/* <div>
              <button onClick={()=>RR(movie._id)}>RR</button>
            </div> */}

            <div className="">
              {isEdit ? (
                <form onSubmit={handleSubmit}>
                  <div className="edForm">
                    <label htmlFor="rating">Rating:</label>
                    <input
                      type="number"
                      id="rating"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      min="1"
                      max="5"
                    />
                  </div>
                  <div className="edForm mt-3">
                    <label htmlFor="reviews">Reviews:</label>
                    <input
                      id="reviews"
                      name="reviews"
                      value={formData.reviews}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="adBtn btn mt-3 mb-1">
                    Submit
                  </button>
                  {/* {loading === "loading" && <p>Updating...</p>}
                {error && <p>Error: {error}</p>} */}
                </form>
              ) : (
                <>
                  <h6 className="mt-3">
                    <span className="text-danger">Your Review</span> <br />{" "}
                    &nbsp;
                    {movie.reviews}
                  </h6>

                  <div>
                    <p className="text-danger">
                      Rating: {renderStars(movie.rating)}
                    </p>
                  </div>
                </>
              )}
              <button
                className="adBtn btn mt-2"
                onClick={() => editC(movie._id)}
              >
                {isEdit ? "Cancel" : "Edit Your Review"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MovieDetails;

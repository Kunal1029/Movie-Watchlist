/* eslint-disable react-hooks/exhaustive-deps */
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import {
  updateWatchStatus,
  getAllMovies,
  deltMovie,
} from "../features/watchlist/watchListSlice";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import AddForm from "./AddForm";
import MovieDetails from "./MovieDetail";
import EditForm from "./EditForm";
import WatchListed from "./WatchListed";

function Home() {
  const [show, setShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [showOne, setShowOne] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const { watchLists, loading } = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    if (loading === "idle") {
      dispatch(getAllMovies());
    }
  }, [loading, dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseEdit = () => setShowEdit(false);

  const handleToggleWatchStatus = (movie) => {
    dispatch(
      updateWatchStatus({ id: movie._id, watchStatus: !movie.watchStatus })
    );
  };

  const deleteMovie = async () => {
    if (!selectedMovie) return;

    try {
      const actionResult = await dispatch(deltMovie(selectedMovie._id));
      if (deltMovie.fulfilled.match(actionResult)) {
        await dispatch(getAllMovies());
        setSmShow(false);
      } else {
        console.error("Failed to delete movie:", actionResult.payload);
      }
    } catch (error) {
      console.error("Failed to delete movie:", error);
    }
  };

  const showOneMovie = (movie) => {
    setSelectedMovie(movie);
    setShowOne(true);
  };
  

  useEffect(()=>{
    if(selectedMovie !== null){
      const ksg = watchLists.filter((z)=> z._id === selectedMovie._id)
      if(JSON.stringify(ksg[0]) !== JSON.stringify(selectedMovie)){
        setShowEdit(false)
      }
      // if(JSON.stringify(ksg[0]) === JSON.stringify(selectedMovie)){
      //   console.log("hi")
      // }
    }
  
  },[selectedMovie,watchLists])


  const editMovie = (movie) => {
    setSelectedMovie(movie);
    setShowEdit(true);
  };



  const count = watchLists.length;
  useEffect(() => {
    setShow(false);
  }, [count]);

  const [option, setOption] = useState(1);

  return (
    <>
      <div className="mt-5">
        <div className="">
          <h1 className="text-center text-white mb-4">Movie WatchLists</h1>
          <div className="btn d-flex align-item-center justify-content-center gap-5">
            <button
              onClick={handleShow}
              className="btn btn-warning text-dark mb-3 border"
            >
              Add New Movie
            </button>

            <Modal show={show} onHide={handleClose} className="modalForm">
              <Modal.Header closeButton>
                <Modal.Title>Add new one</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <AddForm />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button onClick={() => setOption(1)} className={`btn  me-2 ${option === 1 ? "btn-info" : "btn-secondary"}`}>
          All Movies
        </button>
        <button onClick={() => setOption(2)} className={`btn me-2  ${option === 2 ? "btn-info" : "btn-secondary"}`}>
          WatchList
        </button>
      </div>

      {option === 2 ? (
        <WatchListed />
      ) : option === 1 ? (
        <div className="container mt-5">
          <div className="d-flex row justify-content-center gap-1">
            {watchLists.map((movi) => (
              <div
                key={movi._id}
                className="card bg-transparent text-white col-lg-3 col-md-5 col-9 ms-md-5 p-0"
              >
                <img
                  src="/m1.jpg"
                  className="w-100 "
                  style={{
                    borderTopRightRadius: "14px",
                    borderTopLeftRadius: "14px",
                  }}
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{movi.title}</h5>
                  <p className="card-text">{movi.description}</p>
                </div>

                <div className="card-body d-flex flex-column text-center align-item-center justify-content-center">
                  <div>
                    <button
                      className="btn text-primary"
                      onClick={() => editMovie(movi)}
                    >
                      <i className="fa-regular fa-pen-to-square fa-lg"></i>
                    </button>

                    <Modal
                      className="modalForm"
                      show={showEdit}
                      onHide={handleCloseEdit}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>
                          Movie: {selectedMovie ? selectedMovie.title : null}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="text-center">
                        <EditForm
                          mid={selectedMovie ? selectedMovie._id : null}
                        />
                        <Button
                          variant="secondary"
                          className="adBtn text-center mt-2"
                          onClick={handleCloseEdit}
                        >
                          Cancel
                        </Button>
                      </Modal.Body>
                      {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                      Close
                    </Button>
                  </Modal.Footer> */}
                    </Modal>

                    <button
                      onClick={() => {
                        setSelectedMovie(movi);
                        setSmShow(true);
                      }}
                      className="btn text-danger"
                    >
                      <i className="fa-solid fa-lg fa-trash"></i>
                    </button>

                    <Modal
                      show={smShow}
                      size="md"
                      centered
                      onHide={() => setSmShow(false)}
                      aria-labelledby="aa"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="aa">
                          <h5>Are you sure?</h5>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <h5 className="mt-2 mb-4">
                          Do you want to delete movie{" "}
                          <b> {selectedMovie ? selectedMovie.title : ""}</b> ?
                        </h5>
                        <div className="d-flex justify-content-between">
                          <button
                            onClick={deleteMovie}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>

                          <button
                            className="btn btn-success"
                            onClick={() => setSmShow(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </Modal.Body>
                    </Modal>

                    <button
                      className="btn text-white"
                      onClick={() => showOneMovie(movi)}
                    >
                      <i className="fa-solid fa-circle-info fa-lg"></i>
                    </button>

                    <Modal
                      className="modalForm"
                      show={showOne}
                      size=""
                      onHide={() => setShowOne(false)}
                      // backdrop="static"
                      // keyboard={false}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>
                          Movie {selectedMovie ? selectedMovie.title : null}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <MovieDetails
                          mid={selectedMovie ? selectedMovie._id : null}
                        />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={() => setShowOne(false)}
                        >
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>

                  <div>
                    <button
                      className={`btn btn-success mt-3 ${
                        movi.watchStatus ? "bg-success" : "bg-secondary"
                      }`}
                      onClick={() => handleToggleWatchStatus(movi)}
                    >
                      {movi.watchStatus ? (
                        <>
                          {" "}
                          <i className="fa-solid fa-check"></i> Watchlist{" "}
                        </>
                      ) : (
                        "Add to Watclist"
                      )}
                    </button>
                  </div>
                  <br />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Home;


import "./App.css";
import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddForm from "./Component/AddForm";
import MovieDetail from "./Component/MovieDetail";
// import CommentForm from "./Component/WatchListed";
import EditForm from "./Component/EditForm";
import Home from "./Component/Home";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addmovie" element={<AddForm />} />
          <Route path="/movieDetails/:movieId" element={<MovieDetail />} />
          <Route path="/editMovie/:movieId" element={<EditForm />} />
          {/* <Route path="/comment/:movieId" element={<CommentForm />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

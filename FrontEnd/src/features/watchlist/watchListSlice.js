import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  watchLists: [],
  loading: "idle",
  error: null,
};

export const getAllMovies = createAsyncThunk(
  "movies/getAllMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      return result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
); //fine

export const addNewMovie = createAsyncThunk(
  "movies/addNewMovie",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create movie");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
); //fine

export const deltMovie = createAsyncThunk(
  "movies/deltMovie",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/${movieId}/del`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete movie");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
); //fine

export const updateWatchStatus = createAsyncThunk(
  "watchlist/updateWatchStatus",
  async ({ id, watchStatus }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ watchStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update watch status");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
); //fine



export const movieDetail = createAsyncThunk(
  "movies/movieDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
); //fine

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error("Failed to update movie");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
); //fine

export const commentMovie = createAsyncThunk(
  'watchlist/commentMovie',
  async ({ id, rating, reviews }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/comment/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, reviews }),
      });

      if (!response.ok) {
        throw new Error('Failed to update watch status');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
); //fine

const watchListSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllMovies.pending, (state) => {//fine
        state.loading = "loading";
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {//fine
        state.loading = "succeeded";
        state.watchLists = action.payload;
      })
      .addCase(getAllMovies.rejected, (state, action) => {//fine
        state.loading = "failed";
        state.error = action.payload;
      })
      .addCase(addNewMovie.pending, (state) => {//fine
        state.loading = "loading";
      })
      .addCase(addNewMovie.fulfilled, (state, action) => {//fine
        state.loading = "succeeded";
        state.watchLists.push(action.payload);
      })
      .addCase(addNewMovie.rejected, (state, action) => {//fine
        state.loading = "failed";
        state.error = action.payload;
      })
      .addCase(deltMovie.pending, (state) => {//fine
        state.loading = "loading";
      })
      .addCase(deltMovie.fulfilled, (state, action) => {//fine
        state.loading = "succeeded";
        state.watchLists = state.watchLists.filter(
          (movi) => movi.id !== action.payload.id
        );
      })
      .addCase(deltMovie.rejected, (state, action) => {//fine
        state.loading = "failed";
        state.error = action.payload;
      })


      .addCase(movieDetail.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(movieDetail.fulfilled, (state, action) => {
        state.watchLists = state.watchLists.map((movie) =>
          movie._id === action.payload._id ? action.payload : movie
        );
      })
      .addCase(movieDetail.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })


      .addCase(updateMovie.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const index = state.watchLists.findIndex(
          (movie) => movie._id === action.payload._id
        );
        if (index !== -1) {
          state.watchLists[index] = action.payload;
        }
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })


      .addCase(updateWatchStatus.pending, (state) => {
        state.loading = "loading"; //fine
      })
      .addCase(updateWatchStatus.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const index = state.watchLists.findIndex(
          (movie) => movie._id === action.payload._id //fine
        );
        if (index !== -1) {
          state.watchLists[index] = action.payload;
        }
      })
      .addCase(updateWatchStatus.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;//fine
      })


      .addCase(commentMovie.pending, (state) => {
        state.loading = 'loading';
        // state.error = null;
      })
      .addCase(commentMovie.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.watchLists = state.watchLists.map((movie) =>
          movie._id === action.payload._id ? action.payload : movie
        );
      })
      
      .addCase(commentMovie.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });

  },
});

export default watchListSlice.reducer;

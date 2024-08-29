import { configureStore } from "@reduxjs/toolkit";
import watchListSlice from '../features/watchlist/watchListSlice';

const store = configureStore({
  reducer: {
    watchlist: watchListSlice,
  }
});

export default store;

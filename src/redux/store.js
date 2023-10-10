import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import flightReducer from "./reducers/flightSlice";
import bookingReducer from "./reducers/bookingSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    flights: flightReducer,
    bookings: bookingReducer
  },
  devTools: process.env.NODE_ENV !== "production"
});

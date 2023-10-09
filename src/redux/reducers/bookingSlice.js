import { createSlice } from "@reduxjs/toolkit";
// import { nanoid } from "nanoid";

const initialState = {
  bookings: [],
};

export const bookingSLice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action) => {
      const updatedBooking = action.payload;
      state.bookings = state.bookings.map((booking) =>
        booking.bookingId === updatedBooking.bookingId
          ? updatedBooking
          : booking
      );
    },
    addSeatsToBooking: (state, action) => {
      const { bookingId, seats } = action.payload;

      const bookingIndex = state.bookings.findIndex(
        (booking) => booking.bookingId === bookingId
      );

      if (bookingIndex !== -1) {
        const updatedBooking = {
          ...state.bookings[bookingIndex],
          seats: seats,
        };
        const updatedBookings = [
          ...state.bookings.slice(0, bookingIndex),
          updatedBooking,
          ...state.bookings.slice(bookingIndex + 1),
        ];

        state.bookings = updatedBookings;
      }
    },
    addMealsToBooking: (state, action) => {
      const { bookingId, meals } = action.payload;

      const bookingIndex = state.bookings.findIndex(
        (booking) => booking.bookingId === bookingId
      );

      if (bookingIndex !== -1) {
        const updatedBooking = {
          ...state.bookings[bookingIndex],
          meals: meals,
        };
        const updatedBookings = [
          ...state.bookings.slice(0, bookingIndex),
          updatedBooking,
          ...state.bookings.slice(bookingIndex + 1),
        ];

        state.bookings = updatedBookings;
      }
    },
  },
});

export const { addBooking, updateBooking, addSeatsToBooking , addMealsToBooking} =
  bookingSLice.actions;

export default bookingSLice.reducer;

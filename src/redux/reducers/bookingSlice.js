import { createSlice } from "@reduxjs/toolkit";

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
    addLuggageToBooking: (state, action) => {
      const { bookingId, luggage } = action.payload;

      const bookingIndex = state.bookings.findIndex(
        (booking) => booking.bookingId === bookingId
      );

      if (bookingIndex !== -1) {
        const updatedBooking = {
          ...state.bookings[bookingIndex],
          luggage: luggage,
        };
        const updatedBookings = [
          ...state.bookings.slice(0, bookingIndex),
          updatedBooking,
          ...state.bookings.slice(bookingIndex + 1),
        ];

        state.bookings = updatedBookings;
      }
    },
    clearBookings: (state) => {
      state.bookings = [];
    },
  },
});

export const {
  addBooking,
  addSeatsToBooking,
  addMealsToBooking,
  addLuggageToBooking,
  clearBookings
} = bookingSLice.actions;

export default bookingSLice.reducer;

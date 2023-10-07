import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from 'nanoid'

const initialState = {
  bookings: [],
};

export const bookingSLice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (state, action) => {
      const {
      } = action.payload;
      const booking = {
        id: nanoid(),
      };
      state.bookings.push(booking);
    },
  },
});

export const { addBooking } = bookingSLice.actions;

export default bookingSLice.reducer;

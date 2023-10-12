import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  flights: [],
};

export const flightSLice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    addFlight: (state, action) => {
      const {
        name,
        selectedTakeoffTime,
        selectedLandingTime,
        price,
        locationFrom,
        locationTo,
      } = action.payload;
      const flight = {
        id: nanoid(),
        name,
        selectedTakeoffTime,
        selectedLandingTime,
        price,
        locationFrom,
        locationTo,
      };
      state.flights.push(flight);
    },
  },
});

export const { addFlight } = flightSLice.actions;

export default flightSLice.reducer;

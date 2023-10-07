import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  flights: [
    {
      id: "a8jBKXQF5nhDbJN2FviYi",
      name: "IndiGo",
      selectedLandingTime: "Thu, 12 Oct 2023 18:30:00 GMT",
      selectedTakeoffTime: "Wed, 11 Oct 2023 18:30:00 GMT",
      locationFrom: {
        code: "CCU",
        lat: "22.6572",
        lon: "88.4506",
        name: "Netaji Subhash Chandra Bose International Airport",
        city: "Kolkata",
        state: "West Bengal",
        country: "India",
        woeid: "12513561",
        tz: "Asia/Kolkata",
        phone: "",
        type: "Airports",
        email: "",
        url: "",
        runway_length: "11900",
        elev: "19",
        icao: "VECC",
        direct_flights: "42",
        carriers: "24",
      },
      locationTo: {
        code: "DEL",
        lat: "28.5603",
        lon: "77.1027",
        name: "Indira Gandhi International Airport",
        city: "New Delhi",
        state: "Madhya Pradesh",
        country: "India",
        woeid: "12513599",
        tz: "Asia/Kolkata",
        phone: "",
        type: "Airports",
        email: "",
        url: "",
        runway_length: "12500",
        elev: "776",
        icao: "VIDP",
        direct_flights: "95",
        carriers: "70",
      },
      price: "1200",
    },
  ],
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

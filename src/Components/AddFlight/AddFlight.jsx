import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Select from "react-select";
import airports from "../../api/airports.json";

const AddFlight = () => {
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [locationFrom, setLocationFrom] = useState({
    code: "CCU",
    lat: "22.6572",
    lon: "88.4506",
    name: "Netaji Subhash Chandra Bose International Airpor",
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
  });

  const [locationTo, setLocationTo] = useState({
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
  });

  const [flightType, setFlightType] = useState("oneWay");

  const handleFlightTypeChange = (event) => {
    setFlightType(event.target.value);
  };

  return (
    <div className="container mx-auto mt-10 h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Flight Details</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Flight Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Flight Name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="time"
            >
              Flight Takeoff Time
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Select Date Time"
                  value={selectedDateTime}
                  onChange={(newValue) => setSelectedDateTime(newValue)}
                  error={false}
                />
              </DemoContainer>
            </LocalizationProvider>

            {/* {selectedDateTime && (
              <p>Selected Date and Time: {selectedDateTime.toString()}</p>
            )} */}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="time"
            >
              Flight Landing Time
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Select Date Time"
                  value={selectedDateTime}
                  onChange={(newValue) => setSelectedDateTime(newValue)}
                  error={false}
                />
              </DemoContainer>
            </LocalizationProvider>

            {/* {selectedDateTime && (
              <p>Selected Date and Time: {selectedDateTime.toString()}</p>
            )} */}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              placeholder="Price"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Location
            </label>
            <Select
              className="basic-single w-full"
              classNamePrefix="select"
              options={airports}
              value={locationFrom}
              onChange={setLocationFrom}
              getOptionLabel={(option) => `${option.city}, ${option.country}`}
              getOptionValue={(option) => option.name}
              name="color"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Destination
            </label>
            <Select
              className="basic-single w-full"
              classNamePrefix="select"
              options={airports}
              value={locationTo}
              onChange={setLocationTo}
              getOptionLabel={(option) => `${option.city}, ${option.country}`}
              getOptionValue={(option) => option.name}
              name="color"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Flight Type
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="flightType"
                  value="oneWay"
                  checked={flightType === "oneWay"}
                  onChange={handleFlightTypeChange}
                />
                <span className="ml-2">One Way</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="flightType"
                  value="twoWay"
                  checked={flightType === "twoWay"}
                  onChange={handleFlightTypeChange}
                />
                <span className="ml-2">Two Way</span>
              </label>
            </div>
            </div>
          <div>
            {/* <p>Selected Country: {selectedCountry}</p> */}
            {/* <p>Selected State: {selectedState}</p> */}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="py-3 px-4 bg-gray-800 rounded-sm
              font-medium text-white uppercase
              focus:outline-none hover:bg-gray-700 hover:shadow-none"
              type="submit"
            >
              Add Flight
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlight;

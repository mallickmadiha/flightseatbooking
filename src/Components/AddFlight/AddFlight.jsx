import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Select from "react-select";
import airports from "../../api/airports.json";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";
import useLocalStorage from "../../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addFlight } from "../../redux/reducers/flightSlice";
import { useNavigate } from "react-router-dom";

const AddFlight = ({ setShowadd }) => {
  const [flights, setFlights] = useLocalStorage("flights", []);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [selectedTakeoffTime, setSelectedTakeoffTime] = useState("");
  const [selectedLandingTime, setSelectedLandingTime] = useState("");
  const [price, setPrice] = useState("");
  const [luggageCapacity, setLuggageCapacity] = useState();
  const [locationFrom, setLocationFrom] = useState({
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

  const customStyles = {
    option: (provided) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  const formatOptionLabel = ({ city, country, name }) => (
    <div>
      <div>{`${city}, ${country}`}</div>
      <div style={{ fontSize: "12px", color: "gray" }}>{name}</div>
    </div>
  );

  useEffect(() => {
    setFlights(flights);
  }, [flights, setFlights]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = uuidv4()
    if (
      name &&
      selectedLandingTime &&
      selectedLandingTime &&
      locationFrom &&
      locationTo &&
      price &&
      luggageCapacity
    ) {
      dispatch(
        addFlight({
          id: id,
          name: name,
          selectedLandingTime: selectedLandingTime.toString(),
          selectedTakeoffTime: selectedTakeoffTime.toString(),
          locationFrom: locationFrom,
          locationTo: locationTo,
          price: price,
          luggageCapacity: luggageCapacity,
        })
      );
      setFlights([
        ...flights,
        {
          id: id,
          name: name,
          selectedLandingTime: selectedLandingTime.toString(),
          selectedTakeoffTime: selectedTakeoffTime.toString(),
          locationFrom: locationFrom,
          locationTo: locationTo,
          price: price,
          luggageCapacity: luggageCapacity,
        },
      ]);
      Swal.fire({
        title: "Successful",
        text: "Flight Details Added Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() =>
        setTimeout(() => {
          setShowadd(false);
          navigate("/admin");
        }, 500)
      );
    } else {
      Swal.fire({
        title: "Info!",
        text: "Please fill up all required fields",
        icon: "info",
        confirmButtonText: "Try again",
      }).then(() => setLoading(false));
      return;
    }
  };

  return (
    <div className="flight-container pt-8" data-testid="addflight">
      <Loader active={loading} />
      <div className="md:px-10 px-3 pt-3 md:w-2/4 mx-auto bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
        <div className="flex justify-evenly">
          <h2 className="md:text-2xl text-sm font-bold text-white mt-2 text-center">
            Add Flight Details
            <i className="fa fa-solid fa-plane-departure mx-3 text-blue-500"></i>
          </h2>
          <button
            className="bg-greyblue py-2.5 text-sm md:text-lg md:px-4 px-2 text-white"
            onClick={() => setShowadd(false)}
          >
            View All Flights
          </button>
        </div>
        <form>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="name"
            >
              Flight Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Flight Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="time"
            >
              Flight Takeoff Time
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={selectedTakeoffTime}
                onChange={(newValue) => setSelectedTakeoffTime(newValue)}
                required
              />
            </LocalizationProvider>
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="time"
            >
              Flight Landing Time
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={selectedLandingTime}
                onChange={(newValue) => setSelectedLandingTime(newValue)}
                required
              />
            </LocalizationProvider>
          </div>
          <div className="mb-6">
            <label
              htmlFor="airport"
              className="block text-white text-sm font-bold mb-2"
            >
              Location
            </label>
            <Select
              className="basic-single w-full"
              classNamePrefix="select"
              options={airports}
              value={locationFrom}
              onChange={setLocationFrom}
              getOptionLabel={formatOptionLabel}
              getOptionValue={(option) => option.city}
              styles={customStyles}
              name="airport"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="airport"
              className="block text-white text-sm font-bold mb-2"
            >
              Destination
            </label>
            <Select
              className="basic-single w-full"
              classNamePrefix="select"
              options={airports}
              value={locationTo}
              onChange={setLocationTo}
              getOptionLabel={formatOptionLabel}
              getOptionValue={(option) => option.city}
              styles={customStyles}
              name="airport"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-700">
                ₹
              </span>
              <input
                className="pl-8 shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="text"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="luggage"
            >
              Luggage Capacity (kg)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="luggage"
              type="number"
              placeholder="Luggage Capacity"
              value={luggageCapacity}
              onChange={(e) => setLuggageCapacity(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={handleSubmit}
              className="py-3 px-4 mb-6 bg-greyblue rounded-sm
              font-medium text-white uppercase
              focus:outline-none hover:bg-greyblue hover:shadow-none"
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

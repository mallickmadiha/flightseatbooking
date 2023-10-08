import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import flyingplanenobg from "../../assets/flyingplanenobg.png";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Select from "react-select";
import Swal from "sweetalert2";
import airports from "../../api/airports.json";
import useLocalStorage from "../../hooks/useLocalStorage";
import FlightCard from "../../Components/FlightCard/FlightCard";
import Navbar from "../../Components/Navbar/Navbar";
import Loader from "../../Components/Loader/Loader";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [flights, setFlights] = useLocalStorage("flights", []);
  const [fliteredFlights, setFliteredFlights] = useState([]);
  const storedFlights = useSelector((state) => state.flights);

  console.log(storedFlights);

  const [selectedTakeoffTime, setSelectedTakeoffTime] = useState("");
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

  // const users = useSelector(state => state.users)
  const storedData = localStorage.getItem("user");
  const userData = JSON.parse(storedData) || {};

  console.log("User", storedData);

  useEffect(() => {
    if (userData.islogged === false || !storedData) {
      navigate("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, storedData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTakeoffTime && locationTo && locationFrom) {
      setLoading(true);
      const filteredFlights = flights.filter(
        (flight) =>
          flight.locationFrom.code === locationFrom.code &&
          flight.locationTo.code === locationTo.code
      );

      if (storedFlights.flights) {
        const storedFilteredFlights = storedFlights.flights.filter(
          (flight) =>
            flight.locationFrom.code === locationFrom.code &&
            flight.locationTo.code === locationTo.code
        );
        setFliteredFlights(storedFilteredFlights);
      } else {
        setFliteredFlights(filteredFlights);
      }

      setTimeout(() => {
        setLoading(false);
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth',
        });
      }, 1000);
    } else {
      Swal.fire({
        title: "Info!",
        text: "Please fill up all required fields",
        icon: "info",
        confirmButtonText: "Try again",
      }).then(() => setLoading(false));
    }
  };

  return (
    <>
      <Navbar name={userData?.name} />
      <Loader active={loading} />
      <div className="container mx-auto flex justify-center flex-col">
        <h1 className="text-3xl mt-5 text-center">Search for Your Flight</h1>
        <img
          src={flyingplanenobg}
          className="w-[600px] h-[580px] mx-auto relative"
          alt="flyingplanenobg"
        />
        <div className="container absolute mt-20 lg:mt-40">
          <form className="flex items-center flex-wrap gap-6 py-5 justify-center bg-white lg:w-9/12 mx-auto shadow-xl">
            <div className="mb-6">
              <label
                htmlFor="airport"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Location
              </label>
              <Select
                className="basic-single w-[270px]"
                classNamePrefix="select"
                options={airports}
                value={locationFrom}
                onChange={setLocationFrom}
                getOptionLabel={formatOptionLabel}
                getOptionValue={(option) => option.city}
                styles={customStyles}
                name="airport"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="airport"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Destination
              </label>
              <Select
                className="basic-single w-[270px]"
                classNamePrefix="select"
                options={airports}
                value={locationTo}
                onChange={setLocationTo}
                getOptionLabel={formatOptionLabel}
                getOptionValue={(option) => option.city}
                styles={customStyles}
                name="airport"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="time"
              >
                Departure Date
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    value={selectedTakeoffTime}
                    onChange={(newValue) => setSelectedTakeoffTime(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="mb-6">
              <button
                onClick={(e) => handleSubmit(e)}
                className="py-3 px-4 mt-8 bg-greyblue rounded-sm
              font-medium text-white uppercase
              focus:outline-none hover:bg-greyblue hover:shadow-none"
                type="submit"
              >
                Search Flights
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        {fliteredFlights &&
          fliteredFlights.map((flight, index) => {
            return <FlightCard key={flight.id} flight={flight} />;
          })}
      </div>
    </>
  );
};

export default Home;

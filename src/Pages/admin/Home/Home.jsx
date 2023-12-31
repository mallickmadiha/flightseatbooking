import React, { useEffect, useState } from "react";
import AddFlight from "../../../Components/AddFlight/AddFlight";
import { useSelector } from "react-redux";
import useLocalStorage from "../../../hooks/useLocalStorage";
import FlightCard from "../../../Components/FlightCard/FlightCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const storedFlights = useSelector((state) => state.flights?.flights);
  // eslint-disable-next-line no-unused-vars
  const [flights, setFlights] = useLocalStorage("flights", storedFlights);
  const [showadd, setShowadd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("admin") !== "true") {
      navigate("/admin/signin");
    }
  }, [navigate]);

  return (
    <>
      {showadd ? (
        <AddFlight setShowadd={setShowadd} />
      ) : (
        <div className="my-6">
          <div className="flex justify-evenly mb-2 items-center flex-wrap">
            <h1 className="text-2xl font-bold text-center">All Flights</h1>
            <div>
              <button
                className="bg-greyblue py-2 text-sm px-4 text-white"
                onClick={() => setShowadd(true)}
              >
                <i className="fa fa-plus mr-2" />
                Add More Flights
              </button>
              <i
                onClick={() => window.location.reload()}
                className="fa fa-solid fa-rotate-right text-greyblue text-2xl mx-3 cursor-pointer"
              ></i>
            </div>
          </div>
          {storedFlights &&
            storedFlights.map((flight, index) => {
              return <FlightCard key={index} flight={flight} />;
            })}
          {flights
            ?.filter(
              (flight) =>
                !storedFlights.find(
                  (storedFlight) => storedFlight.id === flight.id
                )
            )
            .map((flight, index) => {
              return <FlightCard key={index} flight={flight} />;
            })}
        </div>
      )}
    </>
  );
};

export default Home;

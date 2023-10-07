import React, { useState } from "react";
import AddFlight from "../../../Components/AddFlight/AddFlight";
import { useSelector } from "react-redux";
import useLocalStorage from "../../../hooks/useLocalStorage";
import FlightCard from "../../../Components/FlightCard/FlightCard";

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [flights, setFlights] = useLocalStorage("flights", []);
  const storedFlights = useSelector((state) => state.flights);
  const [showadd, setShowadd] = useState(false);

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
                class="fa fa-solid fa-rotate-right text-greyblue text-2xl mx-3 cursor-pointer"
              ></i>
            </div>
          </div>
          {flights.map((flight, index) => {
            return <FlightCard key={flight.id} flight={flight} />;
          })}
          {storedFlights.flights.map((flight, index) => {
            return <FlightCard key={flight.id} flight={flight} />;
          })}
        </div>
      )}
    </>
  );
};

export default Home;

import React from "react";
import airlineblack from "../../assets/airlineblack.png";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addBooking, clearBookings } from "../../redux/reducers/bookingSlice";
import { useLocation } from "react-router-dom";

const FlightCard = ({ flight }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);

  const landing = new Date(flight.selectedLandingTime);
  const takeoff = new Date(flight.selectedTakeoffTime);

  const landingdate = landing.toDateString();
  const takeoffdate = takeoff.toDateString();

  const timeDifferenceInMilliseconds = landing - takeoff;

  const handleticketclick = (e) => {
    if (location.pathname !== "/admin") {
      if (flight) {
        const flightWithExtras = {
          ...flight,
          bookingId: uuidv4(),
          meals: [],
          luggage: [],
          seats: {
            booked: [],
          },
        };
        localStorage.setItem("booking", JSON.stringify(flightWithExtras));
        if (bookings?.length > 0) {
          dispatch(clearBookings());
        }
        dispatch(addBooking(flightWithExtras));
      }
      navigate("/flighbook");
    } else {
      alert(JSON.stringify(flight));
    }
  };

  return (
    <div className="flex items-center justify-center py-5">
      <div
        className="lg:w-[67rem] md:w-8/12 w-full mx-2 cursor-pointer"
        onClick={(e) => handleticketclick(e)}
      >
        <div className="bg-lightgrey rounded-2xl lg:flex pb-5">
          <span className="lg:relative bg-white rounded-full invisible lg:visible mt-[4rem] -ml-[0.5rem] w-[30px] h-[30px]"></span>
          <div className="w-full flex justify-evenly items-center flex-wrap">
            <div className="flex w-full justify-evenly">
              <h2 className="text-2xl py-3 font-bold">{flight.name}</h2>
              <h2 className="text-2xl py-3 font-bold">₹ {flight.price}</h2>
            </div>
            <div className="py-3 text-center">
              <span>
                {flight.locationFrom.city}, {flight.locationFrom.country}
              </span>
              <h1 className="text-xl font-semibold">
                {flight.locationFrom.code}
              </h1>
              <span>{takeoffdate}</span>
            </div>
            <div className="py-3 text-center">
              <img
                src={airlineblack}
                className="w-[13rem]"
                alt="airlineblack"
              />
              <span>
                {Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60))} h
              </span>
            </div>
            <div className="py-3 text-center">
              <span>
                {flight.locationTo.city}, {flight.locationTo.country}
              </span>
              <h1 className="text-xl font-semibold">
                {flight.locationTo.code}
              </h1>
              <span>{landingdate}</span>
            </div>
          </div>
          <span className="lg:relative bg-white rounded-full invisible lg:visible mt-[4rem] -mr-[0.5rem] w-[30px] h-[30px]"></span>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;

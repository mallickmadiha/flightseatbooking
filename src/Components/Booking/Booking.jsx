import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSeatsToBooking } from "../../redux/reducers/bookingSlice";
import FlightSeat from "../FlightSeat/FlightSeat";
import Swal from "sweetalert2";
import Meal from "../Meal/Meal";
import Luggage from "../Luggage/Luggage";

const Booking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showMeal, setShowMeal] = useState(false);
  const [showSeat, setShowSeat] = useState(true);
  const [showLuggage, setShowLuggage] = useState(false);

  const bookings = useSelector((state) => state.bookings?.bookings[0]);

  const dispatch = useDispatch();
  const storedBooking = JSON.parse(localStorage.getItem("booking"));

  const [disableBookings, setDisabledBookings] = useState(
    bookings?.seats?.booked || []
  );

  const handleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleSubmit = () => {
    console.log(selectedSeats);
    selectedSeats &&
      dispatch(
        addSeatsToBooking({
          bookingId: storedBooking.bookingId,
          seats: { booked: selectedSeats },
        })
      );
    Swal.fire({
      title: "Success!",
      text: "Seats Added Successfully",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      setDisabledBookings([...disableBookings, ...selectedSeats]);
      storedBooking.seats.booked = selectedSeats;
      localStorage.setItem("booking", JSON.stringify(storedBooking));
    });
  };

  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="mt-5">
      <h1 className="text-lg xl:text-3xl lg:text-3xl md:text-3xl text-center">
        {storedBooking.name} ({storedBooking.locationFrom.code}
        <span>
          <i className="fa fa-arrow-circle-o-right mx-2" />
        </span>
        {storedBooking.locationTo.code} )
      </h1>
      {showMeal && (
        <Meal
          storedBooking={storedBooking}
          setShowLuggage={setShowLuggage}
          setShowMeal={setShowMeal}
          setShowSeat={setShowSeat}
        />
      )}
      {showSeat && (
        <div className="theatre">
          <ol className="cabin">
            {rows.map((value, index) => {
              return (
                <FlightSeat
                  key={index}
                  seatNo={value}
                  disabledseats={disableBookings}
                  handleSeatSelection={handleSeatSelection}
                />
              );
            })}
          </ol>
          <div className="screen-side pt-5">
            <div className="screen">Screen</div>
          </div>
          <div className="flex items-center justify-center gap-10">
            <button
              onClick={handleSubmit}
              className="py-2 px-4 mb-6 bg-greyblue rounded-sm
              font-medium text-white uppercase
              focus:outline-none hover:bg-greyblue hover:shadow-none"
              type="submit"
            >
              Add Seats
            </button>
            <button
              onClick={() => {
                setShowMeal(true);
                setShowLuggage(false);
                setShowSeat(false);
              }}
              className="py-2 px-4 mb-6 bg-greyblue rounded-sm
              font-medium text-white uppercase
              focus:outline-none hover:bg-greyblue hover:shadow-none"
              type="submit"
            >
              <i className="fa fa-solid fa-forward"></i>
            </button>
          </div>
        </div>
      )}
      {showLuggage && (
        <Luggage
          storedBooking={storedBooking}
          setShowLuggage={setShowLuggage}
          setShowMeal={setShowMeal}
          setShowSeat={setShowSeat}
        />
      )}
    </div>
  );
};

export default Booking;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSeatsToBooking } from "../../redux/reducers/bookingSlice";
import FlightSeat from "../FlightSeat/FlightSeat";
import Swal from "sweetalert2";
import Meal from "../Meal/Meal";
import Luggage from "../Luggage/Luggage";
import useLocalStorage from "../../hooks/useLocalStorage";

const Booking = () => {
  const dispatch = useDispatch();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showMeal, setShowMeal] = useState(false);
  const [showSeat, setShowSeat] = useState(true);
  const [showLuggage, setShowLuggage] = useState(false);
  const [bookSeat, setBookSeat] = useLocalStorage(
    "bookSeat",
    JSON.parse(localStorage.getItem("bookSeat")) || []
  );

  const storedBooking = JSON.parse(localStorage.getItem("booking"));

  const currFlightBookedSeat = bookSeat.filter(
    (bookSeat) => bookSeat.id === storedBooking.id
  );

  const [disableBookings, setDisabledBookings] = useState(
    currFlightBookedSeat[0]?.booked || []
  );

  const handleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleSubmit = () => {
    if (selectedSeats.length > 0) {
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
        const updatedItem = {
          id: storedBooking.id,
          booked: [...disableBookings, ...selectedSeats],
        };

        const itemIndex = bookSeat.findIndex(
          (item) => item.id === updatedItem.id
        );

        const updatedBookSeat = [...bookSeat];

        if (itemIndex !== -1) {
          updatedBookSeat[itemIndex] = updatedItem;
        } else {
          updatedBookSeat.push(updatedItem);
        }

        setBookSeat(updatedBookSeat);
        setShowMeal(true);
        setShowLuggage(false);
        setShowSeat(false);
      });
    } else {
      Swal.fire({
        title: "Info!",
        text: "Please select some seats",
        icon: "info",
        confirmButtonText: "OK",
      });
    }
  };

  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="mt-5" data-testid="booking">
      <h1 className="text-lg xl:text-3xl lg:text-3xl md:text-3xl text-center">
        {storedBooking?.name} ({storedBooking?.locationFrom.code}
        <span>
          <i className="fa fa-arrow-circle-o-right mx-2" />
        </span>
        {storedBooking?.locationTo.code} )
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
            <div className="screen">Cockpit</div>
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
            {/* <button
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
            </button> */}
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

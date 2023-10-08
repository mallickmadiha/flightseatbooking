import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSeatsToBooking } from "../../redux/reducers/bookingSlice";
import FlightSeat from "../FlightSeat/FlightSeat";
import Swal from "sweetalert2";

const Booking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [disableBookings, setDisabledBookings] = useState([]);
  // const bookings = useSelector((state) => state.bookings);
  const dispatch = useDispatch();
  const storedBooking = JSON.parse(localStorage.getItem("booking"));

  const handleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
    // console.log("statte", bookings)
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
      }).then(()=>{
        setDisabledBookings([...disableBookings, ...selectedSeats])
        console.log("disabled bookings", disableBookings);
      })
  };

  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // console.log("Booking", JSON.parse(localStorage.getItem("booking")));
  return (
    <div className="mt-5">
      <h1 className="text-3xl text-center">{storedBooking.name} ({storedBooking.locationFrom.code}
        <span><i className="fa fa-arrow-circle-o-right mx-2"/></span>
       {storedBooking.locationTo.code} )</h1>
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
          {/* <h3 className="select-text">Please select a seat</h3> */}
        </div>
        <div className="flex items-center justify-center">
            <button
              onClick={handleSubmit}
              className="py-2 px-4 mb-6 bg-greyblue rounded-sm
              font-medium text-white uppercase
              focus:outline-none hover:bg-greyblue hover:shadow-none"
              type="submit"
            >
              Add Seats
            </button>
          </div>
        <div className="selected-seats">
          {selectedSeats.length > 0 && (
            <div>
              Selected Seats:{" "}
              {selectedSeats.map((seat) => (
                <span key={seat}>{seat} </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;

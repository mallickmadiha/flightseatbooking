import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addLuggageToBooking } from "../../redux/reducers/bookingSlice";
import { useNavigate } from "react-router-dom";

const Luggage = ({
  setShowLuggage,
  setShowMeal,
  setShowSeat,
  storedBooking,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookings = useSelector((state) => state.bookings?.bookings);
  const [luggageList, setLuggageList] = useState(bookings?.luggage || []);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [totalweight, setTotalweight] = useState(0);

  const handleLuggageAdd = (e) => {
    e.preventDefault();
    if (name && weight) {
      if (totalweight + parseFloat(weight) > storedBooking.luggageCapacity) {
        Swal.fire({
          title: "Info!",
          text: `Your Luggage Increased the Luggage Capacity (${storedBooking.luggageCapacity} Kg)`,
          icon: "info",
          confirmButtonText: "Try again",
        });
        return;
      }
      setLuggageList([
        ...luggageList,
        {
          name: name,
          weight: weight,
        },
      ]);
      setTotalweight(totalweight + parseFloat(weight));
    } else {
      Swal.fire({
        title: "Info!",
        text: "Please enter all fields",
        icon: "info",
        confirmButtonText: "Try again",
      });
    }
    setName("");
    setWeight("");
  };

  const handleSubmit = (e) => {
    luggageList &&
      dispatch(
        addLuggageToBooking({
          bookingId: storedBooking.bookingId,
          luggage: luggageList,
        })
      );
    Swal.fire({
      title: "Success!",
      text: "Luggage Details Added Successfully",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      storedBooking.luggage = luggageList;
      localStorage.setItem("booking", JSON.stringify(storedBooking));
      setShowMeal(false);
      setShowLuggage(false);
      setShowSeat(false);
      navigate("/boarding-pass");
    });
  };

  return (
    <>
      <div>
        <form className="bg-white shadow-md border-gray-100 border flex justify-around items-center md:w-2/4 mx-auto flex-wrap rounded md:px-8 px-2 pt-6 pb-8 my-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name of Luggage
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Name of Luggage"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="weight"
            >
              Weight (Kg)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              placeholder="Weight (kg)"
              type="number"
              value={weight}
              onChange={(e) => {
                const newValue = parseFloat(e.target.value);

                if (!isNaN(newValue) && newValue > 0) {
                  setWeight(newValue);
                }
              }}
              required
            />
          </div>
          <div className="mb-4">
            <button
              className="text-white mx-4 bg-gradient-to-r mt-6 from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:outline-none  dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              onClick={(e) => handleLuggageAdd(e)}
            >
              Add Luggage
            </button>
          </div>
        </form>
        {luggageList.length > 0 &&
          luggageList.map((value, index) => {
            return (
              <div
                key={index}
                className="my-2 md:w-2/4 mx-auto bg-slate-100 shadow-lg py-5 px-10 flex justify-between"
              >
                <div>
                  <span className="font-semibold mx-2">Name:</span> {value.name}
                </div>
                <div>
                  <span className="font-semibold mx-2">Weight:</span>{" "}
                  {value.weight}
                </div>
              </div>
            );
          })}
        {/* <p className="text-xl my-10 text-center">
          Total Weight: {totalweight} Kg
        </p> */}
      </div>
      <div className="flex items-center justify-center gap-10 mt-32">
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
          <i className="fa fa-solid fa-backward"></i>
        </button>
        <button
          onClick={handleSubmit}
          className="py-2 px-4 mb-6 bg-greyblue rounded-sm
              font-medium text-white uppercase
              focus:outline-none hover:bg-greyblue hover:shadow-none"
          type="submit"
        >
          Save Luggage
        </button>
        {/* <button
          onClick={() => {
            setShowMeal(false);
            setShowLuggage(false);
            setShowSeat(false);
            navigate("/boarding-pass");
          }}
          className="py-2 px-4 mb-6 bg-greyblue rounded-sm
          font-medium text-white uppercase
          focus:outline-none hover:bg-greyblue hover:shadow-none"
          type="submit"
        >
          <i className="fa fa-solid fa-forward"></i>
        </button> */}
      </div>
    </>
  );
};

export default Luggage;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addLuggageToBooking } from "../../redux/reducers/bookingSlice";

const Luggage = ({ setShowLuggage, setShowMeal, setShowSeat, storedBooking }) => {
  const dispatch = useDispatch()
  const bookings = useSelector((state) => state.bookings.bookings);
  const [luggageList, setLuggageList] = useState(storedBooking?.luggage || []);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [totalweight, setTotalweight] = useState(0)

  const handleLuggageAdd = (e) => {
    e.preventDefault()
    if ((totalweight + parseFloat(weight)) > storedBooking.luggageCapacity) {
      Swal.fire({
        title: "Info!",
        text: `Your Luggage Increased the Luggage Capacity (${storedBooking.luggageCapacity} Kg)`,
        icon: "info",
        confirmButtonText: "Try again",
      }); return;
    }
    setLuggageList([...luggageList, {
      name: name,
      weight: weight
    }])
    luggageList &&
    dispatch(
      addLuggageToBooking({
        bookingId: storedBooking.bookingId,
        luggage: luggageList,
      })
    );
    setName('')
    setWeight('')
    setTotalweight(totalweight + parseFloat(weight))
    Swal.fire({
      title: "Success!",
      text: "Luggage Details Added Successfully",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      storedBooking.luggage = luggageList;
      localStorage.setItem("booking", JSON.stringify(storedBooking));
    });
  }

  console.log(luggageList)

  return (
    <>
      <div>
        <form class="bg-white flex justify-around items-center w-2/4 mx-auto rounded px-8 pt-6 pb-8 my-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
              Name of Luggage
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Name of Luggage"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="weight">
              Weight (Kg)
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" placeholder="Weight (kg)"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
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
        {luggageList.length > 0 && (
          luggageList.map((value, index) => {
            return (
              <div className="my-2 w-1/3 mx-auto bg-slate-100 shadow-lg p-5">
                <span className="mx-20"><span className="font-semibold mx-2">Name:</span> {value.name}</span>
                <span><span className="font-semibold">Weight:</span> {value.weight}</span>
              </div>
            )
          }))}
        <p className="text-xl my-10 text-center">Total Weight: {totalweight} Kg</p>
      </div>
      <div className="flex items-center justify-center gap-10 mt-32">
        <button
          onClick={() => {
            setShowMeal(true);
            setShowLuggage(false);
            setShowSeat(false);
          }} className="py-2 px-4 mb-6 bg-greyblue rounded-sm
          font-medium text-white uppercase
          focus:outline-none hover:bg-greyblue hover:shadow-none"
          type="submit"
        >
          <i className="fa fa-solid fa-backward"></i>
        </button>
        <button
          // onClick={() => {
          //   setShowMeal(false);
          //   setShowLuggage(false);
          //   setShowSeat(true);
          // }}
          className="py-2 px-4 mb-6 bg-greyblue rounded-sm
          font-medium text-white uppercase
          focus:outline-none hover:bg-greyblue hover:shadow-none"
          type="submit"
        >
          Get My Pass
        </button>
      </div>
    </>
  );
};

export default Luggage;

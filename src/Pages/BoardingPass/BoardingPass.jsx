import React from "react";
import Pass from "../../Components/Pass/Pass";
import { useNavigate } from "react-router-dom";
import { clearBookings } from "../../redux/reducers/bookingSlice";
import { useDispatch } from "react-redux";

const BoardingPass = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="container w-100 mx-auto justify-center items-center flex flex-col">
      <h1 className="text-3xl font-semibold my-5">Your Boarding Passes</h1>
      <Pass />
      <button
        className="text-white mx-4 bg-gradient-to-r mt-2 from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={() => {
          localStorage.removeItem("booking");
          dispatch(clearBookings());
          navigate("/");
        }}
      >
        Go Home
      </button>
    </div>
  );
};

export default BoardingPass;

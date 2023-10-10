import React from "react";

const Luggage = () => {
  return (
    <div>
      Luggage
      <div className="flex items-center justify-around">
        
        <button
          //   onClick={handleSubmit}
          className="py-2 px-4 mb-6 bg-greyblue rounded-sm
          font-medium text-white uppercase
          focus:outline-none hover:bg-greyblue hover:shadow-none"
          type="submit"
        >
          Go Back
        </button>
        <button
          //   onClick={() => {
          //     setShowMeal(true);
          //     setShowLuggage(false);
          //     setShowSeat(false);
          //   }}
          className="py-2 px-4 mb-6 bg-greyblue rounded-sm
          font-medium text-white uppercase
          focus:outline-none hover:bg-greyblue hover:shadow-none"
          type="submit"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Luggage;

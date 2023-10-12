import React from "react";
import Pass from "../../Components/Pass/Pass";

const BoardingPass = () => {
  return (
    <div className="container xl:ml-36 lg:ml-36 md:ml-20 ml-5">
      <h1 className="text-3xl font-semibold text-center my-5">Your Boarding Passes</h1>
        <Pass/>
    </div>
  );
};

export default BoardingPass;

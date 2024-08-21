import React from "react";
import arrow from "../../assets/images/icons/arrow_long_right.png";
import woodworker from "../../assets/images/Woodworker.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-rows-2 grid-flow-col gap-4 md:grid-rows-1 md:grid-cols-2 w-5/6 h-4/5">
        <div
          className="bg-cover bg-center w-full"
          style={{ backgroundImage: `url(${woodworker})` }}
        ></div>
        <div className="flex justify-center items-center flex-col">
          <h1 className="font-bold text-4xl">Elevate your </h1>
          <h1 className="font-bold text-4xl">craftsmanship</h1>
          <p className="text-sm mt-3 text-[#415371]">Perfect cut lists at your fingertips</p>
          <Link to='/login' className="flex items-center bg-[#F2C94C] p-2 rounded-xl mt-8 px-6 text-sm">
            Continue <img src={arrow} alt="arrow" className="w-4 ml-3"/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

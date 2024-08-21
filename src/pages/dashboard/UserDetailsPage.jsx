import React from "react";
import { useParams, useLocation } from "react-router-dom";
import no_data from "../../assets/images/icons/no_data.png";
import coin from "../../assets/images/icons/coin.png";
import wallet from "../../assets/images/icons/wallet.png";
import red_bin from "../../assets/images/icons/red_bin.png";
import policy from "../../assets/images/icons/policy.png";

const UserDetailsPage = () => {
  const location = useLocation();
  const { record } = location.state || {};

  return (
    <div className="relative top-14">
      <div className="bg-white rounded p-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="rounded-full w-10 h-10 bg-slate-800 mr-2"></div>
            <div>
              <h2 className="font-bold">Manuel Ugate</h2>
              <div className="flex items-center justify-between w-48">
                <p className="text-[.8rem]">+234 7998902227</p>
                <div className="flex items-center">
                  <img src={no_data} alt="" className="w-3 mr-1" />
                  <span className="italic text-[.8rem]">Unverified</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p>Credit Balance</p>
            <div className="flex items-center mt-1 pl-2">
              <img src={coin} alt="" className="w-7" />
              <span className="font-bold text-lg">15</span>
            </div>
            <div className="flex items-center mt-1">
              <img src={wallet} alt="" className="w-4 mr-2" />
              <span>Purchase credit</span>
            </div>
          </div>
        </div>
        <div className="w-2/3 mt-4 flex justify-between items-center">
          <div className="">
            <div className="flex items-center">
              <h2 className="font-bold mr-2">Name:</h2>
              <h2 className="">Manuel Ugate</h2>
            </div>
            <div className="flex items-center mt-4">
              <h2 className="font-bold mr-2">Email:</h2>
              <h2 className="">emanuelUgate@utd.org</h2>
            </div>
          </div>
          <div className="">
            <div className="flex items-center text-left">
              <h2 className="font-bold mr-2">User name:</h2>
              <div>
                <h2 className="">Manuel Ugate</h2>
              </div>
            </div>
            <div className="flex items-center text-left mt-4">
              <h2 className="font-bold mr-2">Location:</h2>
              <h2 className="">Carrington, old Trafford</h2>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-between items-center w-3/4">
          <div>
            <div className="flex items-center">
              <h2 className="font-bold mr-2">Project Created:</h2>
              <span>12</span>
            </div>
            <div className="flex items-center mt-3">
              <h2 className="font-bold mr-2">Cutlist Created:</h2>
              <span>26</span>
            </div>
          </div>
          <div>
          <div className="flex items-center">
              <h2 className="font-bold mr-2">Project Completed:</h2>
              <span>7</span>
            </div>
            <div className="flex items-center mt-3">
              <h2 className="font-bold mr-2">Cutlist Completed:</h2>
              <span>18</span>
            </div>
          </div>
          <div>
          <div className="">
              <h2 className="font-bold mr-2">Recent work:</h2>
              <div className="shadow-lg flex items-center  p-3 rounded">
                <div>
                    <img src={policy} alt="" className="mr-2 w-5"/>
                 </div>
                <div>
                    <h2 className="font-bold">Dane’s Lounge</h2>
                    <p className="text-[.7rem]">3 flush doors and a small wind..</p>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-3">
             
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-20 w-3/4">
            <div className="flex justify-between items-center w-[330px]">
                <button className="flex items-center rounded-full bg-[#ff000054] text-[#FF3D00] px-6 h-9 font-semibold">
                    <img src={red_bin} alt=""  className="mr-2 w-4"/>
                    Delete User
                </button>
                <button className="flex items-center rounded-full text-[#B0B2C3] px-6 h-9 font-semibold border">
                    <img src={no_data} alt=""  className="mr-2 w-4"/>
                    Block User
                </button>
            </div>
            <div>
                <button className="rounded-full px-6 h-9 font-semibold bg-[#F1B31C]">Save Changes</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;

{
  /* <h1>{record.user}'s Profile</h1>
        <p>Status: {record.status}</p>
        <p>Phone Number: {record.phone_number}</p>
        <p>{record.isVerified}</p> */
}

import React, { useContext, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaMapPin } from "react-icons/fa";
import { IoIosCash } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ConfirmRidePopup({ ride, setConfirmRidePanel, setRidePopupPanel }) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/ride/start-ride`,
      {
        params: {
          rideId: ride._id,
          otp: otp,
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      setConfirmRidePanel(false);
      setRidePopupPanel(false);
      navigate("/captain-riding", { state: { ride: ride } });
    }
  };

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          setConfirmRidePanel(false);
        }}
      >
        <IoIosArrowDown size={22} />
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm this ride to Start
      </h3>
      <div className="flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">
            {ride?.user.fullname.firstname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">
          {Math.round(ride?.distance) / 1000} KM
        </h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <FaLocationDot size={25} />
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <FaMapPin size={25} />
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <IoIosCash size={25} />
            <div>
              <h3 className="text-lg font-medium">₹{ride?.fare} </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <form>
            <input
              type="text"
              className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={submithandler}
              className="w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setConfirmRidePanel(false);
                setRidePopupPanel(false);
              }}
              className="w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConfirmRidePopup;

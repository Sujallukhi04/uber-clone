import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaMapPin } from "react-icons/fa";
import { IoIosCash } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function FinishRide({ ride, setCompleteRide }) {
  const navigate = useNavigate();

  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/ride/end-ride`,
      {
        rideId: ride._id,
      },
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      setCompleteRide(false);
      navigate("/captain-home");
    }
  }
  return (
    <div className="">
      <h5
        className="p-1 flex justify-center ite text-center w-[93%] absolute top-0"
        onClick={() => {
          setCompleteRide(false);
        }}
      >
        <IoIosArrowDown size={25} />
      </h5>
      <h3 className="text-2xl font-semibold mb-5 mt-4">Finish this Ride</h3>
      <div className="flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3 justify-evenly">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            alt=""
          />
          <p className="text-sm -mt-1 text-gray-600">{ride?.pickup}</p>
        </div>
        <h5 className="text-md font-semibold">
          {Math.round(ride?.distance) / 1000} KM
        </h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <FaLocationDot size={25} />
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
          <div className="mt-10 w-full">
            <button
              onClick={endRide}
              className="w-full mt-5 flex  text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
            >
              Finish Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinishRide;

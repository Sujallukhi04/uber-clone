import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaMapPin } from "react-icons/fa";
import { IoIosCash } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
function RidePopup({
  ride,
  setRidePopupPanel,
  setConfirmRidePanel,
  confirmRide,
}) {
  return (
    <div>
      <h5
        className="flex justify-center items-center mt-[-15px] mb-[15px]"
        onClick={() => {
          setRidePopupPanel(false);
        }}
      >
        <IoIosArrowDown size={25} color="gray" />
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            alt=""
          />
          <h2 className="text-lg font-medium">
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
            <FaLocationDot size={20} />
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <FaMapPin size={20} />
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <IoIosCash size={25} />
            <div>
              <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-5 w-full ">
          <button
            onClick={async () => {
              await confirmRide();
              setConfirmRidePanel(true);
            }}
            className="flex justify-center items-center bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg"
          >
            Accept
          </button>

          <button
            onClick={() => {
              setRidePopupPanel(false);
            }}
            className="mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
}

export default RidePopup;

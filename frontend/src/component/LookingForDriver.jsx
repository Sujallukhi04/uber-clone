import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaMapPin } from "react-icons/fa";
import { IoIosCash } from "react-icons/io";

function LookingForDriver({
  destination,
  pickup,
  vehicleType,
  fare,
  lookingForDriver,
  setLookingForDriver,
  setWaitFordriver,
}) {
  return (
    <div className="">
      <h5
        className="flex justify-center items-center mt-[-15px] mb-[15px]"
        onClick={() => {
          setLookingForDriver(false);
        }}
      >
        <IoIosArrowDown size={30} color="gray" />
      </h5>
      <h2 className="text-2xl font-bold mb-5">Looking for Driver</h2>
      <div className="flex flex-col gap-2  w-full justify-between items-center">
        <img
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png"
          alt=""
          className="h-32"
        />
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b">
            <h4 className="">
              <FaLocationDot size={20} />
            </h4>
            <div className="">
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm   text-gray-600">{pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b">
            <h4 className="">
              <FaMapPin size={20} />
            </h4>
            <div className="">
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm   text-gray-600">{destination}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LookingForDriver;

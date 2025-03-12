import React, { useContext } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaMapPin } from "react-icons/fa";
import { IoIosCash } from "react-icons/io";
function WaitforDriver({ ride, setWaitFordriver, waitfordriver }) {
  return (
    <div>
      <h5
        className="flex justify-center items-center mt-[-15px] mb-[15px]"
        onClick={() => {
          setWaitFordriver(false);
        }}
      >
        <IoIosArrowDown size={25} color="gray" />
      </h5>

      <div className="flex items-center justify-between">
        <img
          className="h-12"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-medium capitalize">
            {ride?.captain.fullname.firstname}
          </h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">
            {ride?.captain.vehicle.plate}
          </h4>
          <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          <h1 className="text-lg font-semibold"> {ride?.otp} </h1>
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center gap-5 p-3 border-b">
          <h4 className="">
            <FaLocationDot size={20} />
          </h4>
          <div className="">
            <h3 className="text-lg font-medium">Pickup</h3>
            <p className="text-sm -mt-1 text-gray-600">{ride?.pickup}</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-b">
          <h4 className="">
            <FaMapPin size={20} />
          </h4>
          <div className="">
            <h3 className="text-lg font-medium">Destination</h3>
            <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 ">
          <h4 className="">
            <IoIosCash size={20} />
          </h4>
          <div className="">
            <h3 className="text-lg font-medium">₹{ride?.fare} </h3>
            <p className="text-sm   text-gray-600">Cash Cash</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitforDriver;

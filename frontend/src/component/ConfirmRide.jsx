import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaMapPin } from "react-icons/fa";
import { IoIosCash } from "react-icons/io";

function ConfirmRide({
  destination,
  pickup,
  createride,
  loading,
  confirmVehice,
  setconfirmVehice,
  setLookingForDriver,
  setVehiclePanel,
  fare,
  vehicleType,
}) {
  return (
    <div>
      <h5
        className=" flex justify-center items-center mt-[-15px] mb-[15px] pt-2"
        onClick={() => {
          setconfirmVehice(false);
        }}
      >
        <IoIosArrowDown size={25} color="gray" />
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-20"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <h4 className="">
              <FaLocationDot size={20} />
            </h4>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm  text-gray-600">{pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <h4 className="">
              <FaMapPin size={20} />
            </h4>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm  text-gray-600">{destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <h4>
              <IoIosCash size={25} />
            </h4>
            <div>
              <h3 className="text-lg font-medium">
                ₹{vehicleType && fare ? fare[vehicleType] : "N/A"}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={async () => {
            await createride();
            setVehiclePanel(false);
            setconfirmVehice(false);
          }}
          className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
          disabled={loading}
        >
          {loading ? (
            <div className="spinner-border animate-spin border-4 border-white border-t-transparent w-5 h-5 mx-auto"></div>
          ) : (
            "Confirm Ride"
          )}
        </button>
      </div>
    </div>
  );
}

export default ConfirmRide;

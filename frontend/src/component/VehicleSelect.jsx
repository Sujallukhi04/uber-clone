import React from "react";
import { FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

function VehicleSelect({
  fare,
  setVehiclePanel,
  vehiclePanel,
  setconfirmVehice,
  setVehicleType,
}) {
  return (
    <div>
      <h5
        className={`absolute top-9 right-10 ${vehiclePanel ? "" : "hidden"}`}
        onClick={() => setVehiclePanel(false)}
      >
        <IoIosArrowDown size={22} />
      </h5>
      <h2 className="text-2xl font-bold mb-5">Choose the Vehicle</h2>

      <div
        onClick={() => {
          setconfirmVehice(true);
          setVehiclePanel(false);
          setVehicleType("car");
        }}
        className="flex items-center justify-between border-2 mb-2 active:border-black  rounded-xl w-full p-3"
      >
        <img
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png"
          alt=""
          className="h-12"
        />
        <div className="w-1/2  ">
          <h4 className="font-[600] text-base  flex items-center gap-1">
            UberGo{" "}
            <span className="flex text-md">
              <FaUser size={12} />
            </span>
            4
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-medium text-xs text-gray-500">
            Affordable, compact riders
          </p>
        </div>
        <div className="text-lg font-semibold">{`₹${fare?.car}`}</div>
      </div>
      <div
        onClick={() => {
          setconfirmVehice(true);
          setVehiclePanel(false);
          setVehicleType("moto");
        }}
        className="flex items-center justify-between border-2 mb-2 active:border-black  rounded-xl w-full p-3"
      >
        <img
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
          className="h-12"
        />
        <div className="w-1/2  ">
          <h4 className="font-[600] text-base  flex items-center gap-1">
            Moto{" "}
            <span className="flex text-md">
              <FaUser size={12} />
            </span>
            1
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-medium text-xs text-gray-500">
            Affordable, motorcycle ride
          </p>
        </div>
        <div className="text-lg font-semibold">{`₹${fare?.moto}`}</div>
      </div>
      <div
        onClick={() => {
          setconfirmVehice(true);
          setVehiclePanel(false);
          setVehicleType("auto");
        }}
        className="flex items-center justify-between border-2 mb-2 active:border-black  rounded-xl w-full p-3"
      >
        <img
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
          className="h-12"
        />
        <div className="w-1/2  ">
          <h4 className="font-[600] text-base  flex items-center gap-1">
            UberAuto{" "}
            <span className="flex text-md">
              <FaUser size={12} />
            </span>
            3
          </h4>
          <h5 className="font-medium text-sm">5 mins away</h5>
          <p className="font-medium text-xs text-gray-500">
            Affordable, autoride
          </p>
        </div>
        <div className="text-lg font-semibold">{`₹${fare?.auto}`}</div>
      </div>
    </div>
  );
}

export default VehicleSelect;

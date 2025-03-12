import React, { useContext, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { LuHouse } from "react-icons/lu";
import { SocketDataContext } from "../context/SocketContext";
import { IoIosCash } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Map from "../component/Map";

function Riding() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketDataContext);

  socket.on("ride-ended", (data) => {
    navigate("/home");
  });

  return (
    <div className="h-screen relative">
      {/* Live Tracking - Full screen map background */}
      <div className="fixed inset-0 z-0">
        <Map ride={ride} />
      </div>

      {/* Header */}
      <div className="fixed top-0 p-6 left-2 flex justify-between items-center w-screen z-20">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Logo"
          className="w-20"
        />
        <Link
          to={"/home"}
          className="flex justify-center items-center p-3 bg-white rounded-full"
        >
          <LuHouse size={23} />
        </Link>
      </div>

      {/* Ride Details Section */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-white z-20">
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt="Captain"
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">
              {ride?.captain.fullname.firstname}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {ride?.captain.vehicle.plate}
            </h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
            <h1 className="text-lg font-semibold">12034</h1>
          </div>
        </div>

        {/* Location and Payment Details */}
        <div className="w-full mt-3">
          <div className="flex items-center gap-5 p-3 border-b">
            <h4>
              <FaLocationDot size={20} />
            </h4>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 ">
            <h4>
              <IoIosCash size={20} />
            </h4>
            <div>
              <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
              <p className="text-sm text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button
          className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg"
          onClick={() => setPaymentPanel(true)}
        >
          Make Payment
        </button>
      </div>
    </div>
  );
}

export default Riding;

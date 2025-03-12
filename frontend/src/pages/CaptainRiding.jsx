import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { CiLogout } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa6";
import FinishRide from "../component/FinishRide";
import Map from "../component/Map";

function CaptainRiding() {
  const [completeRide, setCompleteRide] = useState(false);
  const location = useLocation();
  const { ride } = location.state || {};
  const completeRideRef = useRef(null);

  // Handle GSAP animation for the panel
  useEffect(() => {
    if (completeRide) {
      gsap.to(completeRideRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(completeRideRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [completeRide]);

  return (
    <div className="h-screen relative">
      {/* Map Section */}
      <div className="fixed inset-0 z-0">
        <Map ride={ride} />
      </div>

      {/* Header */}
      <div className="fixed top-0 p-6 flex justify-between items-center w-screen z-20">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Logo"
          className="w-20"
        />
        <Link
          to="/logout"
          className="flex justify-center items-center p-3 bg-white rounded-full"
        >
          <CiLogout size={23} />
        </Link>
      </div>

      {/* Ride Info Section */}
      <div
        className="absolute bottom-0 left-0 w-full p-6 bg-yellow-400 z-10"
        onClick={() => setCompleteRide(true)}
      >
        <div className="flex justify-center w-full">
          <FaChevronUp size={20} color="gray" />
        </div>
        <div className="mt-3 flex justify-between items-center">
          <h4 className="text-2xl text-center font-semibold">
            {Math.round(ride?.distance) / 1000} KM
          </h4>
          <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
            Complete Ride
          </button>
        </div>
      </div>

      {/* Complete Ride Panel */}
      <div
        ref={completeRideRef}
        className="fixed bottom-0 left-0 w-full bg-white p-6 transform translate-y-full z-20 shadow-lg"
      >
        <FinishRide ride={ride} setCompleteRide={setCompleteRide} />
      </div>
    </div>
  );
}

export default CaptainRiding;

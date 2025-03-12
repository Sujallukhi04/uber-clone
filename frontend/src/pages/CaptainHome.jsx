import React, { useRef, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import CaptainDetails from "../component/CaptainDetails";
import gsap from "gsap";
import axios from "axios";
import RidePopup from "../component/RidePopup";
import ConfirmRidePopup from "../component/ConfirmRidePopup";
import { SocketDataContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function CaptainHome() {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const ridePopupRef = useRef(null);
  const confirmRideRef = useRef(null);
  const { sendMeassage, socket } = useContext(SocketDataContext);
  const { captain } = useContext(CaptainDataContext);
  const [ride, setRide] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 21.2485032,
    lng: 72.8434031,
  });

  useEffect(() => {
    sendMeassage("join", { userType: "captain", userId: captain._id });

    // const updateLocation = () => {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //       socket.emit("update-location-captain", {
    //         userId: captain._id,
    //         location: {
    //           ltd: position.coords.latitude,
    //           lng: position.coords.longitude,
    //         },
    //       });
    //       setCurrentPosition({
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude,
    //       });
    //     });
    //   }
    // };

    // const locationInterval = setInterval(updateLocation, 10000);
    // updateLocation();
  }, [captain._id, socket]);

  socket.on("new-ride", (data) => {
    console.log("New Ride:", data);
    setRide(data);
    setRidePopupPanel(true);
  });

  useEffect(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(ridePopupRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [ridePopupPanel]);

  // Handle ConfirmRide Panel Animation
  useEffect(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRideRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(confirmRideRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [confirmRidePanel]);

  async function confirmRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/ride/confirm`,
        { rideId: ride._id },
        { withCredentials: true }
      );
      setRidePopupPanel(false);
      setConfirmRidePanel(true);
    } catch (error) {
      console.error("Error confirming ride:", error);
    }
  }

  return (
    <div className="h-screen relative">
      {/* Map Section */}
      <div className="fixed inset-0 z-0">
        <MapContainer
          center={currentPosition}
          zoom={13}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={currentPosition}>
            <Popup>Your current location</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Header */}
      <div className="fixed top-0 p-3 left-2 flex justify-between items-center w-screen z-20">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Logo"
          className="w-20"
        />
        <Link
          to="/logout"
          className="flex justify-center items-center p-3 bg-gray-200 rounded-full"
        >
          <CiLogout size={23} />
        </Link>
      </div>

      {/* Captain Details - Positioned at the bottom */}
      <div className="absolute bottom-0 left-0 w-full bg-white z-20 p-6">
        <CaptainDetails />
      </div>

      {/* Ride Popup Panel */}
      <div
        ref={ridePopupRef}
        className="fixed bottom-0 left-0 w-full bg-white p-6 transform translate-y-full shadow-lg z-20"
      >
        <RidePopup
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePanel={setConfirmRidePanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* Confirm Ride Panel */}
      <div
        ref={confirmRideRef}
        className="fixed bottom-0 left-0 w-full bg-white p-6 transform translate-y-full shadow-lg z-20"
      >
        <ConfirmRidePopup
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>
    </div>
  );
}

export default CaptainHome;

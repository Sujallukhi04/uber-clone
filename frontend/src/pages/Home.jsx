import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IoIosArrowDown } from "react-icons/io";
import LocalSearchPanel from "../component/LocalSearchPanel";
import VehicleSelect from "../component/VehicleSelect";
import ConfirmRide from "../component/ConfirmRide";
import LookingForDriver from "../component/LookingForDriver";
import WaitforDriver from "../component/WaitforDriver";
import { SocketDataContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [openPanel, setOpenPanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmVehice, setconfirmVehice] = useState(false);
  const [lookingForDriver, setLookingForDriver] = useState(false);
  const [waitfordriver, setWaitFordriver] = useState(false);
  const [fare, setFare] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 21.2485032,
    lng: 72.8434031,
  });
  const [loading, setLoading] = useState(false);
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const [loadingRide, setLoadingRide] = useState(false);
  const panelRef = useRef(null);
  const vechicleRef = useRef(null);
  const confirmVehicleRef = useRef(null);
  const lookingForDrivereRef = useRef(null);
  const waitfordriverRef = useRef(null);

  const navigate = useNavigate();
  const { sendMeassage, socket } = useContext(SocketDataContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    sendMeassage("join", { userType: "user", userId: user._id });

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
  }, [user]);

  useEffect(() => {
    socket.on("ride-confirmed", (data) => {
      setVehiclePanel(false);
      setWaitFordriver(true);
      setLookingForDriver(false);
      setRide(data);
    });

    socket.on("ride-started", (data) => {
      setWaitFordriver(false);
      navigate("/riding", { state: { ride: data } });
    });

    return () => {
      socket.off("ride-confirmed");
      socket.off("ride-started");
    };
  }, [socket, navigate]);

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    setLoadingSuggestion(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          withCredentials: true,
        }
      );
      setPickupSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching pickup suggestions");
    } finally {
      setLoadingSuggestion(false);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    setLoadingSuggestion(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          withCredentials: true,
        }
      );
      setDestinationSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching destination suggestions");
    } finally {
      setLoadingSuggestion(false);
    }
  };

  const findTrip = async () => {
    if (!pickup || !destination) {
      return;
    }
    setLoading(true);
    setOpenPanel(false);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/ride/fares`,
        { params: { pickup, destination }, withCredentials: true }
      );
      setFare(response.data);
      setVehiclePanel(true);
    } catch (error) {
      console.error("Error fetching fare:", error);
    } finally {
      setLoading(false); // Set loading state to false when request completes
    }
  };

  const createride = async () => {
    setLoadingRide(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/ride/create`,
        { pickup, destination, vehicleType },
        { withCredentials: true }
      );
      setconfirmVehice(false);
      setLookingForDriver(true);
    } catch (error) {
      console.error("Error creating ride:", error);
    } finally {
      setLoadingRide(false);
    }
  };

  // GSAP Animations
  useGSAP(() => {
    if (openPanel) {
      gsap.to(panelRef.current, {
        height: "100%",
        zIndex: 20,
        duration: 0.3,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        zIndex: -1,
        duration: 0.3,
      });
    }
  }, [openPanel]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vechicleRef.current, {
        y: "0%",
        duration: 0.3,
      });
    } else {
      gsap.to(vechicleRef.current, {
        y: "100%",
        duration: 0.3,
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmVehice) {
      gsap.to(confirmVehicleRef.current, {
        y: "0%",
        duration: 0.3,
      });
    } else {
      gsap.to(confirmVehicleRef.current, {
        y: "100%",
        duration: 0.3,
      });
    }
  }, [confirmVehice]);

  useGSAP(() => {
    if (lookingForDriver) {
      gsap.to(lookingForDrivereRef.current, {
        y: "0%",
        duration: 0.3,
      });
    } else {
      gsap.to(lookingForDrivereRef.current, {
        y: "100%",
        duration: 0.3,
      });
    }
  }, [lookingForDriver]);

  useGSAP(() => {
    if (waitfordriver) {
      gsap.to(waitfordriverRef.current, {
        y: "0%",
        duration: 0.3,
      });
    } else {
      gsap.to(waitfordriverRef.current, {
        y: "100%",
        duration: 0.3,
      });
    }
  }, [waitfordriver]);

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="z-10 h-screen flex justify-end flex-col absolute bottom-0 w-full bg-white">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
          className="w-20 absolute left-5 top-5"
        />
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

        <div className="p-7 bg-white relative top-0">
          <h5
            className={`absolute top-9 right-10 ${openPanel ? "" : "hidden"}`}
            onClick={() => setOpenPanel(false)}
          >
            <IoIosArrowDown size={22} />
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <div className="flex flex-col gap-3 mt-4 relative">
            <div className="line absolute h-16 left-5 top-3 w-1 bg-gray-500"></div>
            <input
              type="text"
              value={pickup}
              onClick={() => {
                setOpenPanel(true);
                setActiveField("pickup");
              }}
              onChange={handlePickupChange}
              className="bg-[#eee] px-12 py-2 w-full text-base rounded-lg outline-none"
              placeholder="Add a pickup location"
            />
            <input
              type="text"
              value={destination}
              onClick={() => {
                setOpenPanel(true);
                setActiveField("destination");
              }}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-12 py-2 text-base w-full rounded-lg outline-none"
              placeholder="Enter Your Destination"
            />
          </div>
          <button
            onClick={findTrip}
            className="bg-black w-full text-white py-2 rounded-lg mt-4"
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border animate-spin border-4 border-white border-t-transparent w-5 h-5 mx-auto"></div>
            ) : (
              "Find a ride"
            )}
          </button>
        </div>

        <div
          ref={panelRef}
          className="bg-white overflow-hidden"
          style={{ height: 0 }}
        >
          <LocalSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setOpenPanel}
            loading={loadingSuggestion}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
            setLookingForDriver={setLookingForDriver}
          />
        </div>

        <div
          ref={vechicleRef}
          className="fixed z-20 bottom-0 w-full bg-white shadow-lg transform translate-y-full"
        >
          <div className="px-3 py-8">
            <VehicleSelect
              fare={fare}
              setVehicleType={setVehicleType}
              vehiclePanel={vehiclePanel}
              setVehiclePanel={setVehiclePanel}
              setconfirmVehice={setconfirmVehice}
            />
          </div>
        </div>

        <div
          ref={confirmVehicleRef}
          className="fixed z-30 bottom-0 w-full bg-white shadow-lg transform translate-y-full"
        >
          <div className="px-3 py-3">
            <ConfirmRide
              createride={createride}
              fare={fare}
              vehicleType={vehicleType}
              confirmVehice={confirmVehice}
              pickup={pickup}
              destination={destination}
              setconfirmVehice={setconfirmVehice}
              setVehiclePanel={setVehiclePanel}
              setLookingForDriver={setLookingForDriver}
              loading={loadingRide}
            />
          </div>
        </div>

        <div
          ref={lookingForDrivereRef}
          className="fixed z-40 bottom-0 w-full bg-white shadow-lg transform translate-y-full"
        >
          <div className="px-3 py-6">
            <LookingForDriver
              destination={destination}
              pickup={pickup}
              fare={fare}
              vehicleType={vehicleType}
              lookingForDriver={lookingForDriver}
              setLookingForDriver={setLookingForDriver}
              setWaitFordriver={setWaitFordriver}
            />
          </div>
        </div>

        <div
          ref={waitfordriverRef}
          className="fixed z-50 bottom-0 w-full bg-white shadow-lg transform translate-y-full"
        >
          <div className="px-3 py-6">
            <WaitforDriver
              ride={ride}
              waitfordriver={waitfordriver}
              setWaitFordriver={setWaitFordriver}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

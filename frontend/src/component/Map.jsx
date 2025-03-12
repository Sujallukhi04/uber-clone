import React, { useEffect, useState, useContext } from "react";
import LiveTracking from "../component/LiveTracking";
import { UserDataContext } from "../context/UserContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

function Map({ ride }) {
  const [coordinates, setCoordinates] = useState(null);

  // Get user and captain data from contexts
  const { user } = useContext(UserDataContext);
  const { captain } = useContext(CaptainDataContext);

  // Check if a user or a captain is logged in
  const isUserLoggedIn = user && user._id; // Assuming user data has an `id`
  const isCaptainLoggedIn = captain && captain._id; // Assuming captain data has an `id`

  useEffect(() => {
    async function fetchDestinationCoordinates() {
      try {
        let response;

        // Choose the API based on whether the logged-in user is a normal user or captain
        if (isCaptainLoggedIn) {
          response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/maps/get-coordinate`,
            {
              params: {
                address: ride.destination,
              },
              withCredentials: true,
            }
          );
        } else if (isUserLoggedIn) {
          response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/maps/get-coordinates`,
            {
              params: {
                address: ride.destination,
              },
              withCredentials: true,
            }
          );
        }

        // If response exists, update coordinates
        if (response) {
          setCoordinates({
            lat: response.data.ltd, // Assuming the API returns `lat` and `lng`
            lng: response.data.lng,
          });
        }
      } catch (error) {
        console.error("Error fetching destination coordinates:", error);
      }
    }

    // Make sure to call the API if the ride destination exists
    if (ride && ride.destination) {
      fetchDestinationCoordinates();
    }
  }, [ride, isUserLoggedIn, isCaptainLoggedIn]); // Depend on the user or captain's login status

  return (
    <div>
      <LiveTracking destination={coordinates} />
    </div>
  );
}

export default Map;

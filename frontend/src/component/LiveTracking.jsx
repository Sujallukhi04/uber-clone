import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine"; // Import leaflet-routing-machine

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

const driverIcon = new L.Icon({
  iconUrl: "https://example.com/driver-icon.png", // Replace with your own driver icon URL
  iconSize: [32, 32], // Customize size as needed
  iconAnchor: [16, 32], // Anchor to the bottom center of the icon
  popupAnchor: [0, -32], // Adjust popup anchor if needed
});

function LiveTracking({ destination }) {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 21.228125, // default location
    lng: 72.833771, // default location
  });



  const mapRef = useRef(null);
  const routeRef = useRef(null); // Reference to the route for later updates

  // Get initial location and continuously watch for changes
  // useEffect(() => {
  //   const success = (position) => {
  //     const { latitude, longitude } = position.coords;
  //     setCurrentPosition({
  //       lat: latitude,
  //       lng: longitude,
  //     });
  //   };

  //   const error = (err) => {
  //     console.error("Error getting location", err);
  //   };

  //   // Get current position on load
  //   navigator.geolocation.getCurrentPosition(success, error);

  //   // Watch for position changes
  //   const watchId = navigator.geolocation.watchPosition(success, error);
  //   return () => {
  //     // Clear the watch when the component unmounts
  //     navigator.geolocation.clearWatch(watchId);
  //   };
  // }, []);

  useEffect(() => {
    if (mapRef.current) {
      // Update the route when the position or destination changes
      mapRef.current.setView([currentPosition.lat, currentPosition.lng]);

      // Update markers and route only if destination is provided
      if (destination) {
        // Add markers
        const currentMarker = L.marker([currentPosition.lat, currentPosition.lng]).addTo(mapRef.current);
        currentMarker.bindPopup("Your current location").openPopup();

        const destinationMarker = L.marker([destination.lat, destination.lng]).addTo(mapRef.current);
        destinationMarker.bindPopup("Destination").openPopup();

        // Remove the previous route if it exists
        if (routeRef.current) {
          mapRef.current.removeControl(routeRef.current);
        }

        // Create the new route
        routeRef.current = L.Routing.control({
          waypoints: [
            L.latLng(currentPosition.lat, currentPosition.lng),
            L.latLng(destination.lat, destination.lng),
          ],
          createMarker: () => null, // Prevent adding extra markers on the route
          routeWhileDragging: true, // Update the route while dragging
        }).addTo(mapRef.current);
      }
    }
  }, [currentPosition, destination]); // Run whenever currentPosition or destination changes

  useEffect(() => {
    // Initialize the map if not initialized
    if (!mapRef.current) {
      mapRef.current = L.map("liveMap").setView([currentPosition.lat, currentPosition.lng], 13);

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }
  }, []); // This effect runs once on component mount to initialize the map

  return (
    <div
      id="liveMap"
      style={{
        height: "100%",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
}

export default LiveTracking;

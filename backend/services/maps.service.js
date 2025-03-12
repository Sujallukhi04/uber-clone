import axios from "axios";
import Captain from "../models/captain.js";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getAddressCoordinate = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    address
  )}&format=json`;

  try {
    const response = await axios.get(url);

    if (response.data && response.data.length > 0) {
      const location = response.data[0];
      return {
        ltd: location.lat,
        lng: location.lon,
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getDistanceTime = async (originAddress, destinationAddress) => {
  if (!originAddress || !destinationAddress) {
    throw new Error("Origin and destination addresses are required");
  }

  try {


    const origin = await getAddressCoordinate(originAddress);


    const destination = await getAddressCoordinate(destinationAddress);

    const originFormatted = `${origin.lng},${origin.ltd}`;
    const destinationFormatted = `${destination.lng},${destination.ltd}`;

    const url = `https://router.project-osrm.org/table/v1/driving/${originFormatted};${destinationFormatted}?annotations=duration,distance`;

    const response = await axios.get(url);
    if (response.data && response.data.durations && response.data.distances) {
      const duration = response.data.durations[0][1];
      const distance = response.data.distances[0][1];

      if (duration === null || distance === null) {
        throw new Error("No routes found");
      }

      return {
        duration,
        distance,
      };
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Query is required");
  }

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    input
  )}&format=json&addressdetails=1`;

  try {
    const response = await axios.get(url);
    if (response.data && response.data.length > 0) {
      return response.data.map((prediction) => prediction.display_name);
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCaptainsInRadius = async (ltd, lng, radius) => {
  const captains = await Captain.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 3963.2],
      },
    },
  });

  return captains;
};

export {
  getAddressCoordinate,
  getDistanceTime,
  getAutoCompleteSuggestions,
  getCaptainsInRadius,
};

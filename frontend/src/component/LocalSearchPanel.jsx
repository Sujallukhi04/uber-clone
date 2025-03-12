import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon

function LocalSearchPanel({
  setVehiclePanel,
  setOpenPanel,
  suggestions,
  setPickup,
  setDestination,
  activeField,
  setLookingForDriver,
  loading, // Add loading prop to track the loading state
}) {
  const [fadeInSuggestions, setFadeInSuggestions] = useState(false);

  // Trigger fade-in effect when suggestions are updated
  useEffect(() => {
    if (!loading) {
      setFadeInSuggestions(true);
    }
  }, [suggestions, loading]);

  const handleSuggestionClick = (location) => {
    if (activeField === "pickup") {
      setPickup(location);
    } else {
      setDestination(location);
    }
  };

  return (
    <div className="h-full bg-white p-6 flex flex-col gap-3 overflow-y-auto z-20">
      <div className="max-h-[450px] overflow-y-auto flex flex-col gap-3">
        {loading ? (
          // Display loading spinner when loading is true
          <div className="flex justify-center items-center py-4">
            <FaSpinner className="animate-spin text-gray-500" size={24} />
          </div>
        ) : suggestions?.length === 0 ? (
          // If no suggestions are found, show a "No suggestions" message
          <div className="flex justify-center items-center py-4 text-gray-500">
            No suggestions found.
          </div>
        ) : (
          <div
            className={`transition-opacity duration-500 flex gap-2 flex-col ${
              fadeInSuggestions ? "opacity-100" : "opacity-0"
            }`}
          >
            {suggestions?.map((location, index) => (
              <div
                key={index}
                className="flex items-center border-2 p-3 gap-2 border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer"
                onClick={() => handleSuggestionClick(location)}
              >
                <div className="bg-gray-200 p-3 rounded-full">
                  <FaLocationDot size={16} />
                </div>
                <div className="font-medium text-sm overflow-hidden text-ellipsis line-clamp-2">
                  {location}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LocalSearchPanel;

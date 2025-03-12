import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
function CaptainProtect({ children }) {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaptain = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/captain/proflie`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          const data = response.data.captain;
          console.log(data);
          setCaptain({
            _id: data._id,
            fullname: {
              firstname: data.fullname.firstname,
              lastName: data.fullname.lastname,
            },
            email: data.email,
            status: data.status,
            vehicle: {
              color: data.vehicle.color,
              plate: data.vehicle.plate,
              capacity: data.vehicle.capacity,
              vehicleType: data.vehicle.vehicleType,
            },
          });
        }
      } catch (error) {
        setCaptain({
          _id: "",
          fullname: {
            firstname: "",
            lastName: "",
          },
          email: "",
          vehicle: {
            color: "",
            plate: "",
            capacity: "",
            vehicleType: "",
          },
          status: "",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCaptain();
  }, [setCaptain]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (captain.email === "") {
    return <Navigate to="/captain-login" />;
  }

  return <div>{children}</div>;
}

export default CaptainProtect;

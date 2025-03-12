import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
function UserProtect({ children }) {
  const { user, setUser } = useContext(UserDataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/user/proflie`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          const data = response.data.user;

          setUser({
            _id: data._id,
            fullname: {
              firstname: data?.fullname.firstname,
              lastName: data?.fullname.lastname,
            },
            email: data?.email,
          });
        }
      } catch (error) {
        setUser({
          _id: "",
          fullname: {
            firstname: "",
            lastName: "",
          },
          email: "",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user.email === "") {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
}

export default UserProtect;

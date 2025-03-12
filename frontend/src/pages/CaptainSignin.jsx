import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

function CatainSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submit = async (e) => {
    e.preventDefault();

    const captaindata = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/captain/login`,
        captaindata,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const data = response.data.captain;
        setCaptain({
          _id: data._id,
          fullname: {
            firstname: data.fullname.firstname,
            lastName: data.fullname.lastname,
          },
          email: data.email,
          vehicle: {
            color: data.vehicle.color,
            plate: data.vehicle.plate,
            capacity: data.vehicle.capacity,
            vehicleType: data.vehicle.vehicleType,
          },
          status: data.status,
        });

        navigate("/captain-home");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div className="">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
          className="w-20 mb-10"
        />
        <form className="" onSubmit={submit}>
          <h3 className="text-lg font-medium mb-2">What's Your Email</h3>
          <input
            type="email"
            placeholder="exmple@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#eeee] mb-7 rounded outline-none px-4 py-2 border w-full placeholder:text-base text-lg"
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*******"
            className="bg-[#eeee] mb-7 rounded outline-none px-4 py-2 border w-full placeholder:text-base text-lg"
          />
          <button className="bg-[#111] text-white mb-3 font-semibold rounded outline-none px-4 py-2 border w-full placeholder:text-base text-lg">
            Login
          </button>
        </form>
        <p className="text-md text-center font-400]">
          New fleet?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Create New Account
          </Link>
        </p>
      </div>
      <div className="">
        <Link
          to="/login"
          className="bg-[#10b461] flex justify-center items-center text-white font-semibold mb-7 rounded outline-none px-4 py-2 border w-full placeholder:text-base text-lg"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
}

export default CatainSignin;

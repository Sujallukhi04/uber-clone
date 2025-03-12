import React from "react";
import { Link } from "react-router-dom";

function Start() {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1680430094293-728b61a2bd8c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 w-full bg-red-400 flex-col flex justify-between">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
          className="w-24 ml-8"
        />
        <div className="bg-white px-4 pb-7 py-3">
          <h2 className="font-[700] text-3xl">Get Started With Uber</h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-full py-4 text-lg font-semibold mt-5 bg-black text-white rounded-md"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Start;

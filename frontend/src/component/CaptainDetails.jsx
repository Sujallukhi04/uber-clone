import React, { useContext } from "react";
import { IoTimerOutline } from "react-icons/io5";
import { MdOutlineSpeed } from "react-icons/md";
import { LuNotebookTabs } from "react-icons/lu";
import { CaptainDataContext } from "../context/CaptainContext";

function CaptainDetails() {
  const { captain } = useContext(CaptainDataContext);
  console.log(captain);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-start justify-between">
          <img
            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-lg font-medium">
            {captain.fullname.firstname}
          </span>
        </div>
        <div className="">
          <h4 className="text-xl font-semibold">₹30.90</h4>
          <p className="text-sm  text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex p-3 mt-6 bg-gray-100 rounded-lg justify-center gap-4 items-center">
        <div className="text-center">
          <span className="flex justify-center items-center w-full">
            <IoTimerOutline size={35} className="" />
          </span>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <span className="flex justify-center items-center w-full">
            <MdOutlineSpeed size={35} />
          </span>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <span className="flex justify-center items-center w-full">
            <LuNotebookTabs size={35} />
          </span>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
}

export default CaptainDetails;

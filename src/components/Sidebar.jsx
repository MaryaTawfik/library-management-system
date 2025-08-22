import React from "react";
import { IoMdHome } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { GiBookshelf } from "react-icons/gi";
import { RiHandCoinLine } from "react-icons/ri";
import { Link } from "react-router-dom";



const Sidebar = ({ SidebarToggle, userRole }) => {
  return (
    <div
      className={`${
        SidebarToggle ? "flex" : "hidden"
      } m:w-56 min-h-screen bg-gray-100 shadow-md flex-col justify-between`}
    >
      {/* --- Top Section --- */}
      <div className="flex flex-col">
        <div className="p-1">
          <h1 className="lg:text-3xl text-left mb-6 font-[Merriweather]">
            <span className="text-black">My </span>
            <span className="text-[#FA7C54]">Book </span>
            <br />
            <span className="text-black ml-5">Shelf</span>
          </h1>
        </div>

        {/* Shared Nav Links */}
        <div className="flex flex-col">
          <Link to="/home" className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]">
            <IoMdHome /> Home
          </Link>
          <Link to="/search" className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]">
            <CiSearch /> Search
          </Link>
          <Link to="/my-shelf" className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]">
            <GiBookshelf /> My Shelf
          </Link>
          <Link to="/contribute" className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]">
            <RiHandCoinLine /> Contribute
          </Link>

          {/* Role-based Links */}
          {userRole === "student" && (
            <>
              <Link to="/borrow-history" className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]">
                📚 Borrow History
              </Link>
              <Link to="/payment" className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]">
                💳 Payment
              </Link>
            </>
          )}

          {userRole === "admin" && (
            <Link to="/admin-dashboard" className="flex items-center gap-2 p-2 hover:bg-gray-200 font-[Inter]">
              🛠 Admin Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* --- Bottom Section --- */}
      <div className="flex flex-col p-1 space-y-2 font-[open_sans]">
        <p className="p-1 hover:bg-gray-200 cursor-pointer gap-0">About</p>
        <p className="p-1 hover:bg-gray-200 cursor-pointer gap-0">Support</p>
        <p className="p-1 hover:bg-gray-200 cursor-pointer gap-0">Terms & Conditions</p>
      </div>
    </div>
  );
};

export default Sidebar;

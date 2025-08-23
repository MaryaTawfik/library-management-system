import React from "react";
import { CiSearch } from "react-icons/ci";
import { MdArrowDropDown } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";


const Navbar = ({ SidebarToggle, setSidebarToggle }) => {
  return (
    <header className="fixed w-full bg-white shadow-sm z-20">
      <nav className="max-w-screen-2xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        
        {/* Left: Brand & Sidebar Toggle */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <HiMiniBars3CenterLeft
            onClick={() => setSidebarToggle(!SidebarToggle)}
            className="cursor-pointer text-xl"
          />
          <p className="text-base lg:text-lg font-bold font-[Roboto]">E-library</p>
        </div>

        {/* Search bar */}
        <div className="flex-1 min-w-0 mx-2 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <div className="flex items-center gap-2 w-full">
            <p className="flex items-center bg-[#F7F7FA] px-2 py-1 rounded-md text-sm shrink-0">
              All <MdArrowDropDown className="ml-1" />
            </p>
            <div className="flex items-center border rounded-md overflow-hidden flex-1">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-2 outline-none text-sm sm:text-sm md:text-base"
              />
              <button className="px-3 text-gray-600 hover:text-black">
                <CiSearch className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Nav Items */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Additional icons can be added here safely */}
        </div>
        
      </nav>

    </header>
  );
};

export default Navbar;

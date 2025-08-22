import React from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdArrowDropDown } from "react-icons/md";
import { FaBars } from "react-icons/fa";

const Navbar = ({ SidebarToggle, setSidebarToggle }) => {
  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="max-w-screen-2xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
        
        {/* Left: Brand & Sidebar Toggle */}
        <div className="flex items-center gap-3">
          <FaBars
            onClick={() => setSidebarToggle(!SidebarToggle)}
            className="cursor-pointer text-xl"
          />
          <p className="text-base lg:text-lg font-bold font-[Roboto]">E-library</p>
        </div>

        {/* Search bar */}
        <div className="flex flex-1 items-center gap-2 min-w-[200px] max-w-md">
          <p className="flex items-center bg-[#F7F7FA] px-2 py-1 rounded-md text-sm">
            All <MdArrowDropDown className="ml-1" />
          </p>
          <div className="flex items-center border rounded-md overflow-hidden w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 outline-none text-sm"
            />
            <button className="px-3 text-gray-600 hover:text-black">
              <CiSearch className="text-xl" />
            </button>
          </div>
        </div>

        {/* Nav Items */}
        <div className="flex flex-wrap items-center gap-6">
      
          <Link to="/history" className="text-sm font-medium hover:text-blue-600">
            History
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

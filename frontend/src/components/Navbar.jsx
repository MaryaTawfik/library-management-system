// import React from "react";
// import { CiSearch } from "react-icons/ci";
// import { MdArrowDropDown } from "react-icons/md";
// import { FaBars } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { HiMiniBars3CenterLeft } from "react-icons/hi2";

// const Navbar = ({ SidebarToggle, setSidebarToggle }) => {
//   return (
//     <header className="fixed w-full bg-white-200 shadow-sm z-20">
//       <nav className="max-w-screen-2xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
//         {/* Left: Brand & Sidebar Toggle */}
//         <div className="flex items-center gap-3 flex-shrink-0">
//           <HiMiniBars3CenterLeft
//             onClick={() => setSidebarToggle(!SidebarToggle)}
//             className="cursor-pointer text-xl"
//           />
//           <p className="text-base lg:text-lg font-bold font-[Roboto]">
//             E-library
//           </p>
//         </div>

//         {/* Search bar */}
//         <div className="flex-1 min-w-0 mx-2 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
//           <div className="flex items-center gap-2 w-full">
//             <p className="flex items-center bg-[#F7F7FA] px-2 py-1 rounded-md text-sm shrink-0">
//               All <MdArrowDropDown className="ml-1" />
//             </p>
//             <div className="flex items-center border rounded-md overflow-hidden flex-1">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="w-full px-3 py-2 outline-none text-sm sm:text-sm md:text-base"
//               />
//               <button className="px-3 text-gray-600 hover:text-black">
//                 <CiSearch className="text-xl" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right: Nav Items */}
//         <div className="flex items-center gap-4 flex-shrink-0">
//           {/* Additional icons can be added here safely */}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdArrowDropDown } from "react-icons/md";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CgEnter } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";

const Navbar = ({ SidebarToggle, setSidebarToggle }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setDropdownOpen(false);
    navigate("/welcome");
  };

  const firstLetter = (user?.firstName || user?.lastName || "")
    .charAt(0)
    .toUpperCase();

  return (
    <header className="fixed w-full bg-white shadow-sm z-20">
      <nav className=" flex-shirink-0 max-w-screen-2xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Left: Brand & Sidebar Toggle */}
        <div className="flex items-center gap-3 ">
          <HiMiniBars3CenterLeft
            onClick={() => setSidebarToggle(!SidebarToggle)}
            className="cursor-pointer text-xl"
          />
          <p className="text-base lg:text-lg font-bold font-[Roboto]">
            ASTUMSJ Library
          </p>
        </div>

        {/* Right: Nav Items */}
        <div className="relative flex-shirink-0 items-center gap-4 flex-shrink-0">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                {/* Avatar */}
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-300 text-black font-semibold">
                  {firstLetter}
                </div>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border-none rounded-md shadow-lg py-2 z-30">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium">{user.username}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaRegUser /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-center w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
                  >
                    <CgEnter />
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/welcome" className="flex items-center gap-1">
              <FaUserCircle className="text-2xl" /> Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

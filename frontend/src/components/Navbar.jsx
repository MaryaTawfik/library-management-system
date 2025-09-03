// import React from "react";
// import { CiSearch } from "react-icons/ci";
// import { MdArrowDropDown } from "react-icons/md";
// import { FaBars } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { HiMiniBars3CenterLeft } from "react-icons/hi2";

// const Navbar = ({ SidebarToggle, setSidebarToggle }) => {
//   return (
//     <header className="fixed w-full bg-white shadow-sm z-20">
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
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdArrowDropDown } from "react-icons/md";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Navbar = ({ SidebarToggle, setSidebarToggle }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="fixed w-full bg-white shadow-sm z-20">
      <nav className="max-w-screen-2xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Left: Brand & Sidebar Toggle */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <HiMiniBars3CenterLeft
            onClick={() => setSidebarToggle(!SidebarToggle)}
            className="cursor-pointer text-xl"
          />
          <p className="text-base lg:text-lg font-bold font-[Roboto]">
            E-library
          </p>
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

        {/* Right: User Role / Auth Actions */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {user ? (
            <>
              <span className="text-sm font-medium text-gray-700">
                {user.role === "admin" ? "👑 Admin" : "🎓 Student"}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-700 hover:text-black"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm text-gray-700 hover:text-black"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

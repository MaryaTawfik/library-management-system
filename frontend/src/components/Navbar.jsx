import React, { useState } from "react";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { FaUserCircle, FaRegUser } from "react-icons/fa";
import { CgEnter } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/authAtom"; // ✅ import jotai atom

const Navbar = ({ SidebarToggle, setSidebarToggle }) => {
  const [user, setUser] = useAtom(userAtom);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setDropdownOpen(false);
    setUser(null);
    navigate("/login");
  };

  const firstLetter = (user?.firstName || user?.lastName || "").charAt(0).toUpperCase();
  const profileImage = user?.profileImage || null;

  return (
    <header className="fixed w-full bg-white shadow-sm z-20">
      <nav className="max-w-screen-2xl mx-auto px-4 py-4 flex items-center justify-between gap-4">

        {/* Left: Sidebar toggle + Brand */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <HiMiniBars3CenterLeft
            onClick={() => setSidebarToggle(!SidebarToggle)}
            className="cursor-pointer text-xl"
          />
          <p className="text-base lg:text-lg font-bold font-[Roboto]">
            ASTUMSJ Library
          </p>
        </div>

        {/* Centered Arabic Quote */}
        <div className="flex-1 flex justify-center">
          <p className="arabic-calligraphy hidden md:block text-center">
المكتبة الإلكترونية  </p>      </div>

        {/* Right: User avatar / login */}
        <div className="relative flex items-center gap-4 flex-shrink-0">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                {/* Avatar */}
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-300 text-black font-semibold">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    firstLetter
                  )}
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
                    className="flex items-center gap-1 text-left w-full px-4 py-2 text-sm text-black hover:bg-gray-100"
                  >
                    <CgEnter /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1">
              <FaUserCircle className="text-2xl" /> Login
            </Link>
          )}
        </div>
      </nav>

      {/* CSS for Arabic calligraphy */}
      <style>
        {`
          <style>
@import url('https://fonts.googleapis.com/css2?family=Fustat:wght@200..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Jost:ital,wght@0,100..900;1,100..900&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap');
</style>

          .arabic-calligraphy {
            font-family: 'Fustat', serif;
            font-size: 10px;
            color: #b8860b;
            white-space: nowrap;
            line-height: 1.1;
            animation: fadeIn 1s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </header>
  );
};

export default Navbar;

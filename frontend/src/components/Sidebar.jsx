import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/authAtom"; // ✅ Jotai auth state
import jemealogo from "../assets/jemealogo.jpg";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si"; // Gmail icon
import React, { useState } from "react";

const Sidebar = ({ SidebarToggle ,setSidebarToggle}) => {
  const [user] = useAtom(userAtom);
  const [linkedinDropdownOpen, setLinkedinDropdownOpen] = useState(false);

  const userRole = user?.role;

  return (
    <div
      onClick={() => setSidebarToggle(false)}
      className={`fixed top-0 left-0 h-screen w-40
        bg-white dark:bg-gray-900 text-black dark:text-white
        shadow-sm border-2 border-gray-50 dark:border-gray-800
        z-50 transition-transform duration-300
        ${SidebarToggle ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex flex-col h-full justify-between">
        {/* --- Top Section --- */}
        <div>
          <div className="p-1 mb-4 ml-0 border-b border-gray-200 dark:border-gray-700">
            <img
              src={jemealogo}
              alt="Jemea Logo"
              className="w-20 mx-auto rounded-full"
            />
          </div>


          {/* Nav Links */}
          <div className="flex flex-col">
            {/* Home for everyone except Admin */}
            {userRole !== "Admin" && (
              <Link
                to="/home"
                className="flex items-center gap-1 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-[Poppins]"
              >
                <IoMdHome /> Home
              </Link>
            )}

            {/* Student-only Links */}
            {userRole === "student" && (
              <>
                <Link
                  to="/borrow-history"
                  className="flex items-center gap-1 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-[Poppins]"
                >
                  📚 Borrow History
                </Link>
                <Link
                  to="/borrowed-books"
                  className="flex items-center gap-1 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-[Poppins]"
                >
                  📚 Borrowed Books
                </Link>
                <Link
                  to="/payment-plans"
                  className="flex items-center gap-1 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-[Poppins]"
                >
                  💳 Payment
                </Link>
              </>
            )}

            {/* Admin-only Links */}
            {userRole === "Admin" && (
              <>
                <Link
                  to="/admin-dashboard"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-[Poppins]"
                >
                  🛠 Dashboard
                </Link>
                <Link
                  to="/admin-approvals"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-[Poppins]"
                >
                  📋Borrow Approvals
                </Link>
                <Link
                  to="/admin-payments"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-[Poppins]"
                >
                  📋 Admin Payments
                </Link>
                <Link
                  to="/admin/books"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-[Poppins]"
                >
                  📚 Manage Books
                </Link>
                <Link
                  to="/admin/users"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-[Poppins]"
                >
                  👥 Manage Users
                </Link>
                <Link
                  to="/borrow/records"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-[Poppins]"
                >
                  📖 Borrow Records
                </Link>
              </>
            )}
          </div>
        </div>
        {/* --- Bottom Section --- */}
       {/* --- Bottom Section --- */}
<div className="p-2 border-t border-gray-200 dark:border-gray-700">
  <div className="flex items-center gap-4 relative">
    {/* LinkedIn with dropdown */}
    <div className="relative">
      <FaLinkedin
        size={25}
        className="cursor-pointer text-blue-600 hover:text-blue-800"
        onClick={(e) => {
          e.stopPropagation(); // ✅ prevent closing sidebar
          setLinkedinDropdownOpen(!linkedinDropdownOpen);
        }}
      />
      {linkedinDropdownOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg transition-shadow z-50 shadow-md">
          <a
            href="https://www.linkedin.com/in/fenet-seifudin-b83844356/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3Bjutv86z3RuOP1TqwYlUhhA%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Fenet Seifudin
          </a>
          <a
            href="https://www.linkedin.com/in/hanan-nuru-114545310/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BkSv0eUv%2FRcm5VO63ni1xfA%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Hanan Nuru
          </a>
          <a
            href="https://www.linkedin.com/in/jerusalem-girma-a3771b375/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B4DBeZCiMRZKAbwhBHguqoA%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Jerusalem Girma
          </a>
          <a
            href="https://www.linkedin.com/in/iftu-chala-14b013318/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B2HLZmcDlQOOYIpBk27vkjQ%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Iftu Chala
          </a>
          <a href="https://linkedin.com/in/marya-tawfik" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Marya Tawfik
          </a>
          <a
            href="http://www.linkedin.com/in/fethya-awol-aa4460387"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Fethya Awol
          </a>
        </div>
      )}
    </div>

    {/* Gmail icon */}
    <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=neculerbombs.dev@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 px-3 py-2 shadow-md hover:shadow-lg transition-shadow border-0 border-gray-200"
>
  <SiGmail size={22} className="text-yellow-600" />
</a>

  </div>
</div>

      </div>
    </div>
  );
};

export default Sidebar;

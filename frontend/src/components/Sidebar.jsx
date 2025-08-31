import React from "react";
import { IoMdHome } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { GiBookshelf } from "react-icons/gi";
import { RiHandCoinLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Sidebar = ({ SidebarToggle, userRole }) => {
  // fallback: read role from localStorage in case userRole not yet set
  // normalize role to lowercase so checks like role === 'admin' work
  const rawRole =
    userRole || JSON.parse(localStorage.getItem("user"))?.role || null;
  const role = rawRole ? String(rawRole).toLowerCase() : null;

  return (
    <div
      className={`fixed top-0 left-0 h-full w-40 bg-zinc-100 z-50 transition-transform duration-300 
        ${SidebarToggle ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex flex-col h-full justify-between">
        {/* --- Top Section --- */}
        <div>
          <div className="p-1">
            <h1 className="lg:text-3xl text-left mb-6 font-[Merriweather]-Bold">
              <span className="text-black">My </span>
              <span className="text-yellow-700">Book </span>
              <br />
              <span className="text-black ml-5">Shelf</span>
            </h1>
          </div>

          {/* Shared Nav Links */}
          {role && (
            <div className="flex flex-col">
              <Link
                to="/home"
                className="flex items-center gap-1 p-2 hover:bg-gray-200"
              >
                <IoMdHome /> Home
              </Link>
              <Link
                to="/search"
                className="flex items-center gap-1 p-2 hover:bg-gray-200"
              >
                <CiSearch /> Search
              </Link>
              <Link
                to="/my-shelf"
                className="flex items-center gap-1 p-2 hover:bg-gray-200"
              >
                <GiBookshelf /> My Shelf
              </Link>
              <Link
                to="/contribute"
                className="flex items-center gap-1 p-2 hover:bg-gray-200"
              >
                <RiHandCoinLine /> Contribute
              </Link>
            </div>
          )}

          {/* Student-only Links */}
          {role === "student" && (
            <div className="flex flex-col mt-2 border-t border-gray-300">
              <Link
                to="/borrow-history"
                className="flex items-center gap-1 p-2 hover:bg-gray-200"
              >
                📚 Borrow History
              </Link>
              <Link
                to="/payment"
                className="flex items-center gap-1 p-2 hover:bg-gray-200"
              >
                💳 Payment
              </Link>
            </div>
          )}

          {/* Admin-only Links */}
          {role === "admin" && (
            <div className="flex flex-col mt-2 border-t border-gray-900">
              <Link
                to="/admin-dashboard"
                className="flex items-center gap-2 p-2 hover:bg-gray-200"
              >
                🛠 Admin Dashboard
              </Link>
              <Link
                to="/manage-users"
                className="flex items-center gap-2 p-2 hover:bg-gray-200"
              >
                👥 Manage Users
              </Link>
              <Link
                to="/admin/books"
                className="flex items-center gap-2 p-2 hover:bg-gray-900"
              >
                📚 Manage Books
              </Link>
              <Link
                to="/admin/borrow"
                className="flex items-center gap-2 p-2 hover:bg-gray-900"
              >
                🔄 Borrow Records
              </Link>
            </div>
          )}

          {/* Guest-only Links */}
          {!role && (
            <div className="flex flex-col">
              <Link
                to="/login"
                className="flex items-center gap-1 p-2 hover:bg-gray-900"
              >
                🔑 Login
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-1 p-2 hover:bg-gray-200"
              >
                📝 Register
              </Link>
            </div>
          )}
        </div>

        {/* --- Bottom Section --- */}
        <div className="flex flex-col p-1 space-y-2 font-[open_sans] mb-4">
          <p className="p-1 hover:bg-gray-200 cursor-pointer">About</p>
          <p className="p-1 hover:bg-gray-200 cursor-pointer">Support</p>
          <p className="p-1 hover:bg-gray-200 cursor-pointer">
            Terms & Conditions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

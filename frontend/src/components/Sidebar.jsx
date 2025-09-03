import React from "react";
import { IoMdHome } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { GiBookshelf } from "react-icons/gi";
import { RiHandCoinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import jemealogo from "../assets/jemealogo.jpg";

const Sidebar = ({ SidebarToggle, userRole }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-40 bg-gray-100 z-50 transition-transform duration-300 
        ${SidebarToggle ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Make the whole sidebar a flex column */}
      <div className="flex flex-col h-full justify-between">
        
        {/* --- Top Section --- */}
        <div>
          <div className="p-1 mb-4 ml-0">
            <img src={jemealogo} alt="Jemea Logo" className="w-25 mx-auto rounded-full" />
          </div>

          {/* Shared Nav Links */}
          <div className="flex flex-col">
            <Link to="/home" className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]">
              <IoMdHome /> Home
            </Link>
            
            


            {/* Role-based Links */}
            {userRole === "student" && (
              <>
                <Link to="/borrow-history" className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]">
                  📚 Borrow History
                </Link>
                <Link to="/borrowed-books" className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]">
                  📚 Borrowed Books
                </Link>
                <Link to="/payment" className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]">
                  💳 Payment
                </Link>
              </>
            )}

            {userRole === "Admin" && (
              <>
               <Link to="/admin-dashboard" className="flex items-center gap-2 p-2 hover:bg-gray-200 font-[Inter]">
                🛠 Admin Dashboard
              </Link>
              <Link to="/admin-approvals" className="flex items-center gap-2 p-2 hover:bg-gray-200 font-[Inter]">
                📋 Admin Approvals
              </Link> 
              </>
             
            )}
          </div>
        </div>

        {/* --- Bottom Section --- */}
        <div className="flex flex-col p-1 space-y-2 font-[open_sans] mb-4">
          <p className="p-1 hover:bg-gray-200 cursor-pointer">About</p>
          <p className="p-1 hover:bg-gray-200 cursor-pointer">Support</p>
          <p className="p-1 hover:bg-gray-200 cursor-pointer">Terms & Conditions</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

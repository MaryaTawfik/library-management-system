import React from "react";
import { IoMdHome } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { GiBookshelf } from "react-icons/gi";
import { RiHandCoinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/authAtom"; // ✅ import jotai atom
import jemealogo from "../assets/jemealogo.jpg";

const Sidebar = ({ SidebarToggle }) => {
  const [user] = useAtom(userAtom); 
  const userRole = user?.role; // fallback if no user

  return (
    <div
      className={`fixed top-0 left-0 h-full w-40 bg-white-100 hadow-sm border-2 border-gray-50 z-50 transition-transform duration-300
        ${SidebarToggle ? "translate-x-0" : "-translate-x-full"}`}
    >
=      <div className="flex flex-col h-full justify-between">
        
        {/* --- Top Section --- */}
        <div>
          <div className="p-1 mb-4 ml-0">
            <img src={jemealogo} alt="Jemea Logo" className="w-25 mx-auto rounded-full" />
          </div>

          {/* Shared Nav Links */}
          <div className="flex flex-col">
            <Link
              to="/home"
              className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]"
            >
              <IoMdHome /> Home
            </Link>

            {/* Role-based Links */}
            {userRole === "student" && (
              <>
                <Link
                  to="/borrow-history"
                  className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]"
                >
                  📚 Borrow History
                </Link>
                <Link to="/borrowed-books" className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]">
                  📚 Borrowed Books
                </Link>
                <Link to="/payment-plans" className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]">
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
          {/* <p className="p-1 hover:bg-gray-200 cursor-pointer">About</p>
          <p className="p-1 hover:bg-gray-200 cursor-pointer">Support</p>
          <p className="p-1 hover:bg-gray-200 cursor-pointer">
            Terms & Conditions
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
// import React, { useState } from "react";
// import { IoMdHome } from "react-icons/io";
// import { Link, useNavigate } from "react-router-dom";
// import jemealogo from "../assets/jemealogo.jpg";
// import { FaUserCircle, FaRegUser } from "react-icons/fa";
// import { CgEnter } from "react-icons/cg";

// const Sidebar = ({ SidebarToggle, userRole }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setDropdownOpen(false);
//     navigate("/welcome");
//   };

//   const firstLetter = (user?.firstName || user?.lastName || "")
//     .charAt(0)
//     .toUpperCase();

//   return (
//     <div
//       className={`fixed top-0 left-0 h-full w-40 bg-white hadow-sm border-2 border-gray-50 z-50 transition-transform duration-300
//         ${SidebarToggle ? "translate-x-0" : "-translate-x-full"}`}
//     >
//       <div className="flex flex-col h-full justify-between">
//         {/* --- Top Section --- */}
//         <div>
//           <div className="p-1 mb-4 ml-0">
//             <img
//               src={jemealogo}
//               alt="Jemea Logo"
//               className="w-25 mx-auto rounded-full"
//             />
//           </div>

//           {/* Shared Nav Links */}
//           <div className="flex flex-col">
//             <Link
//               to="/home"
//               className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]"
//             >
//               <IoMdHome /> Home
//             </Link>

//             {/* Student Links */}
//             {userRole === "student" && (
//               <>
//                 <Link
//                   to="/borrow-history"
//                   className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]"
//                 >
//                   📚 Borrow History
//                 </Link>
//                 <Link
//                   to="/borrowed-books"
//                   className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]"
//                 >
//                   📚 Borrowed Books
//                 </Link>
//                 <Link
//                   to="/payment"
//                   className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]"
//                 >
//                   💳 Payment
//                 </Link>
//               </>
//             )}

//             {/* Admin Links */}
//             {userRole === "Admin" && (
//               <>
//                 <Link
//                   to="/admin-dashboard"
//                   className="flex items-center gap-2 p-2 hover:bg-gray-200 font-[Inter]"
//                 >
//                   🛠 Dashboard
//                 </Link>
//                 <Link
//                   to="/admin-approvals"
//                   className="flex items-center gap-2 p-2 hover:bg-gray-200 font-[Inter]"
//                 >
//                   📋 Admin Approvals
//                 </Link>
//                 <Link
//                   to="/admin/books"
//                   className="flex items-center gap-2 p-2 hover:bg-gray-200 font-[Inter]"
//                 >
//                   📚 Manage Books
//                 </Link>
//                 <Link
//                   to="/admin/users"
//                   className="flex items-center gap-2 p-2 hover:bg-gray-200 font-[Inter]"
//                 >
//                   👥 Manage Users
//                 </Link>
//                 <Link
//                   to="/borrow/records"
//                   className="flex items-center gap-2 p-2 hover:bg-gray-200 font-[Inter]"
//                 >
//                   📖 Borrow Records
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>

//         {/* --- Bottom Section --- */}
//         <div className="flex flex-col p-1 space-y-2 font-[open_sans] mb-4">
//           <div className="relative flex items-center gap-4 flex-shrink-0">
//             {user ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   className="flex items-center gap-2 focus:outline-none"
//                 >
//                   <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-300 text-black font-semibold">
//                     {firstLetter}
//                   </div>
//                 </button>
//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-30">
//                     <div className="px-4 py-2 border-b">
//                       <p className="text-sm font-medium">
//                         {user.firstName} {user.lastName}
//                       </p>
//                       <p className="text-xs text-gray-800">{user.email}</p>
//                     </div>
//                     <Link
//                       to="/profile"
//                       className=" gap-2 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       onClick={() => setDropdownOpen(false)}
//                     >
//                       <FaRegUser /> Profile
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center gap-1 w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
//                     >
//                       <CgEnter />
//                       Log out
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link to="/welcome" className="flex items-center gap-1">
//                 <FaUserCircle className="text-2xl" /> Login
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

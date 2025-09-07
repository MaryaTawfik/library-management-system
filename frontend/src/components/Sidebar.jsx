
import { IoMdHome } from "react-icons/io";
import { Link} from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/authAtom"; // ✅ jotai auth state
import jemealogo from "../assets/jemealogo.jpg";


const Sidebar = ({ SidebarToggle }) => {
  const [user,] = useAtom(userAtom);

  const userRole = user?.role;

  
 

  return (
    <div
      className={`fixed top-0 left-0 h-full w-40 bg-white shadow-sm border-2 border-gray-50 z-50 transition-transform duration-300
        ${SidebarToggle ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex flex-col h-full justify-between">
        {/* --- Top Section --- */}
        <div>
          <div className="p-1 mb-4 ml-0">
            <img
              src={jemealogo}
              alt="Jemea Logo"
              className="w-20 mx-auto rounded-full"
            />
          </div>

          {/* Shared Nav Links */}
         {/* Shared Nav Links */} 
<div className="flex flex-col">
  {/* Show Home for everyone EXCEPT Admin */}
  {userRole !== "Admin" && (
    <Link
      to="/home"
      className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]"
    >
      <IoMdHome /> Home
    </Link>
  )}

  {/* Student-only Links */}
  {userRole === "student" && (
    <>
      <Link
        to="/borrow-history"
        className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]"
      >
        📚 Borrow History
      </Link>
      <Link
        to="/borrowed-books"
        className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]"
      >
        📚 Borrowed Books
      </Link>
      <Link
        to="/payment-plans"
        className="flex items-center gap-1 p-2 hover:bg-gray-200 font-[Poppins]"
      >
        💳 Payment
      </Link>
    </>
  )}

            {userRole === "Admin" && (
              <>
                <Link
                  to="/admin-dashboard"
                  className="flex items-center gap-2 p-2 hover:bg-gray-200 font-[Poppins]"
                >
                  🛠 Dashboard
                </Link>
                <Link
                  to="/admin-approvals"
                  className="flex items-center gap-2 p-2 hover:bg-gray-200 font-[Poppins]"
                >
                  📋 Admin Borrow Approvals
                </Link>
                
                <Link
                  to="/admin-payments"
                  className="flex items-center gap-2 p-2 hover:bg-gray-200 font-[Poppins]"
                >
                  📋 Admin Payments
                </Link>
                <Link
                  to="/admin/books"
                  className="flex items-center gap-2 p-2 hover:bg-gray-200 font-[Poppins]"
                >
                  📚 Manage Books
                </Link>
                <Link
                  to="/admin/users"
                  className="flex items-center gap-2 p-2 hover:bg-gray-200 font-[Poppins]"
                >
                  👥 Manage Users
                </Link>
                <Link
                  to="/borrow/records"
                  className="flex items-center gap-2 p-2 hover:bg-gray-200 font-[Poppins]"
                >
                  📖 Borrow Records
                </Link>
              </>
            )}
          </div>

        </div>

        
      </div>
    </div>
  );
};

export default Sidebar;

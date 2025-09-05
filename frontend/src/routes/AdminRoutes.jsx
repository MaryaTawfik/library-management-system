// src/routes/AdminRoutes.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import AdminDashboard from "../pages/AdminDashboard";
import ManageBooks from "../pages/ManageBooks";
import ManageUsers from "../pages/ManageUsers";
import BorrowRecords from "../pages/BorrowRecords";

const AdminRoutes = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="flex">
      <AdminSidebar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />

      <div className="flex-1 ml-0 lg:ml-48">
        {/* Add a toggle button for mobile */}
        <button
          onClick={() => setSidebarToggle(!sidebarToggle)}
          className="p-2 m-2 bg-gray-300 rounded lg:hidden"
        >
          ☰ Menu
        </button>

        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="manage-books" element={<ManageBooks />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="borrow-records" element={<BorrowRecords />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminRoutes;

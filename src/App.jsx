import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import Search from './pages/Search';
import My_shelf from './pages/My_shelf';
import Contribute from './pages/Contribute';

import AdminDashboard from './pages/AdminDashboard';
import PaymentPage from './pages/PaymentPage';
import BorrowHistory from './pages/BorrowHistory';

const App = () => {
  const [SidebarToggle, setSidebarToggle] = useState(true);
  const userRole = "student"; // change to "admin" to test

  return (
    <div className="flex min-h-screen">
        {/* Sidebar on the left */}
        <Sidebar SidebarToggle={SidebarToggle} userRole={userRole} />

        {/* Main content on the right */}
        <div className="flex flex-col flex-1">
          {/* Navbar at the top of content */}
          <Dashboard SidebarToggle={SidebarToggle} setSidebarToggle={setSidebarToggle} />

          {/* Main page content */}
          <main className="flex-1 p-6 font-inter bg-gray-50">
            <Routes>
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/home" replace />} />

                {/* Shared pages */}
                <Route path="/home" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/my-shelf" element={<My_shelf />} />
                <Route path="/contribute" element={<Contribute />} />

                {/* Role-based pages */}
                {userRole === "student" && (
                    <>
                      
                      <Route path="/borrow-history" element={<BorrowHistory />} />
                      <Route path="/payment" element={<PaymentPage />} />
                    </>
                )}
              {userRole === "admin" && (
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
              )}
            </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white text-center py-3">
          footer
        </footer>
      </div>
    </div>
  );
};

export default App;

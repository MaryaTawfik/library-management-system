import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import My_shelf from "./pages/My_shelf";
import Contribute from "./pages/Contribute";
import AdminDashboard from "./pages/AdminDashboard";
import PaymentPage from "./pages/PaymentPage";
import BorrowHistory from "./pages/BorrowHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Guest from "./pages/Guest";
import ForgotPassword from "./pages/ForgotPassword";
import Welcome from "./pages/Welcome";
import BookCatalogPage from "./pages/BookCatalogPage";
import BookDetailsPage from "./pages/BookDetailsPage";

const App = () => {
  const [SidebarToggle, setSidebarToggle] = useState(false);
  const userRole = "admin"; // change to "admin" to test

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        SidebarToggle={SidebarToggle}
        setSidebarToggle={setSidebarToggle}
        userRole={userRole}
      />

      {/* Overlay for mobile */}
      {SidebarToggle && (
        <div
          onClick={() => setSidebarToggle(false)}
          className="fixed inset-0  opacity-50 z-40 "

        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar SidebarToggle={SidebarToggle} setSidebarToggle={setSidebarToggle} />

        {/* Page content */}
        <main className="flex-grow p-6 mt-16">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/my-shelf" element={<My_shelf />} />
            <Route path="/contribute" element={<Contribute />} />

            {userRole === "student" && (
              <>
                <Route path="/borrow-history" element={<BorrowHistory />} />
                <Route path="/payment" element={<PaymentPage />} />
              </>
            )}
            {userRole === "admin" && (
              <Route path="/admin-dashboard" element={<AdminDashboard />} />

            )}
            <Route path="/" element={<Navigate to="/books" />} />
            <Route path="/books" element={<BookCatalogPage />} />
            <Route path="/books/:id" element={<BookDetailsPage />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/guest" element={<Guest />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        
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


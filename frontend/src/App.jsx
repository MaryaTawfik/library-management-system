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
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
  const [SidebarToggle, setSidebarToggle] = useState(false);

  // get user from localStorage (after login, you should save it there)
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role || null;

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
          className="fixed inset-0 opacity-50 z-40"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar SidebarToggle={SidebarToggle} setSidebarToggle={setSidebarToggle} />

        <main className="flex-grow p-6 mt-16">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/my-shelf" element={<My_shelf />} />
            <Route path="/contribute" element={<Contribute />} />

            {/* Student routes */}
            <Route
              path="/borrow-history"
              element={
                <ProtectedRoute role="student">
                  <BorrowHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute role="student">
                  <PaymentPage />
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

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

        <footer className="bg-white text-center py-3">footer</footer>
      </div>
    </div>
  );
};

export default App;

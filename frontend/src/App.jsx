import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "./atoms/authAtom";
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
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ default export
import ManageBooks from "./pages/admin/ManageBooks";
import BookForm from "./pages/admin/BookForm";
import ManageUsers from "./pages/admin/ManageUsers";
import BorrowingRecords from "./pages/admin/BorrowingRecords";

const App = () => {
  const [SidebarToggle, setSidebarToggle] = useState(false);

  // ✅ user comes from global Jotai state (set on login)
  const [user] = useAtom(userAtom);
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
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
        />
      )}

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          SidebarToggle ? "ml-40 lg:ml-40" : "ml-0"
        }`}
      >
        {/* Navbar */}
        <Navbar
          SidebarToggle={SidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />

        <main className="flex-grow p-6 mt-16">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/guest" element={<Guest />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/welcome" element={<Welcome />} />

            {/* Protected: any logged-in user */}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/my-shelf" element={<My_shelf />} />
              <Route path="/contribute" element={<Contribute />} />
              <Route path="/books" element={<BookCatalogPage />} />
              <Route path="/books/:id" element={<BookDetailsPage />} />
            </Route>

            {/* Protected: students only */}
            <Route element={<ProtectedRoute roles={["student"]} />}>
              <Route path="/borrow-history" element={<BorrowHistory />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Route>

            {/* Protected: admins only */}
            <Route element={<ProtectedRoute roles={["admin"]} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/manage-users" element={<ManageUsers />} />
              <Route path="/admin/books" element={<ManageBooks />} />
              <Route path="/admin/books/add" element={<BookForm />} />
              <Route path="/admin/books/edit/:id" element={<BookForm />} />
              <Route path="/admin/borrow" element={<BorrowingRecords />} />
            </Route>

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/books" />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white text-center py-3">footer</footer>
      </div>
    </div>
  );
};

export default App;

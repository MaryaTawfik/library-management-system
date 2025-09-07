import React, { useState, useEffect } from "react";
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
import BorrowingRecords from "./pages/admin/BorrowingRecords";
import Profile from "./pages/Profile";
// import AdminBorrowApproval from "./pages/AdminBorrowApproval";
import BookForm from "./pages/admin/BookForm";
import ManageBooks from "./pages/admin/ManageBooks";
import ManageUsers from "./pages/admin/ManageUsers";
import PaymentPlans from "./pages/PaymentPlans";
import PendingPayment from "./pages/PendingPayment";
import AdminPayments from "./pages/AdminPayments";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BorrowedBooks from "./pages/BorrowedBooks";
import AdminBorrowApproval from "./pages/AdminBorrowApproval";

const App = () => {
  const [SidebarToggle, setSidebarToggle] = useState(false);
  const [user, setUser] = useState(null); // 👈 state for user
  const [userRole, setUserRole] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserRole(parsedUser.role);
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        SidebarToggle={SidebarToggle}
        setSidebarToggle={setSidebarToggle}
        userRole={userRole}
      />

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
        <Navbar
          SidebarToggle={SidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />

        <main className="flex-grow p-6 mt-16">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Navigate to="/books" />} />
            <Route path="/books" element={<BookCatalogPage />} />
            <Route path="/books/:id" element={<BookDetailsPage />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route
              path="/login"
              element={<Login setUser={setUser} setUserRole={setUserRole} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/guest" element={<Guest />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* General pages */}
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/my-shelf" element={<My_shelf />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/profile" element={<Profile />} />

            {/* Student routes */}
            <Route
              path="/borrow-history"
              element={
                <ProtectedRoute role="student" user={user}>
                  <BorrowHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/borrowed-books"
              element={
                <ProtectedRoute role="student" user={user}>
                  <BorrowedBooks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute role="student" user={user}>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment-plans"
              element={
                <ProtectedRoute role="student" user={user}>
                  <PaymentPlans />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pending-payment"
              element={
                <ProtectedRoute role="student" user={user}>
                  <PendingPayment />
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute role="Admin" user={user}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
             <Route path="/admin-approvals" element={
              <ProtectedRoute role="Admin" user={user}>
                <AdminBorrowApproval/>
              </ProtectedRoute>
            } />
            <Route
              path="/admin/books"
              element={
                <ProtectedRoute role="Admin" user={user}>
                  <ManageBooks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/books/add"
              element={
                <ProtectedRoute role="Admin" user={user}>
                  <BookForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/books/edit/:id"
              element={
                <ProtectedRoute role="Admin" user={user}>
                  <BookForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute role="Admin" user={user}>
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/borrow/records"
              element={
                <ProtectedRoute role="Admin" user={user}>
                  <BorrowingRecords />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-payments"
              element={
                <ProtectedRoute role="Admin" user={user}>
                  <AdminPayments />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/admin-approvals"
              element={
                <ProtectedRoute role="Admin" user={user}>
                  <AdminBorrowApproval />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </main>

      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default App;

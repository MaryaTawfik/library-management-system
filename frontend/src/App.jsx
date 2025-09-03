// import React, { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import Home from "./pages/Home";
// import Search from "./pages/Search";
// import My_shelf from "./pages/My_shelf";
// import Contribute from "./pages/Contribute";
// import AdminDashboard from "./pages/AdminDashboard";
// import PaymentPage from "./pages/PaymentPage";
// import BorrowHistory from "./pages/BorrowHistory";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Guest from "./pages/Guest";
// import ForgotPassword from "./pages/ForgotPassword";
// import Welcome from "./pages/Welcome";
// import BookCatalogPage from "./pages/BookCatalogPage";
// import BookDetailsPage from "./pages/BookDetailsPage";
// import { ProtectedRoute } from "./components/ProtectedRoute";
// // import BorrowedBooks from "./pages/BorrowedBooks";
// // import Profile from "./pages/Profile";
// const App = () => {
//   const [SidebarToggle, setSidebarToggle] = useState(false);

//   // const userRole = "admin"; // change as needed

//   // get user from localStorage (after login, you should save it there)
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userRole = user?.role || null;

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <Sidebar
//         SidebarToggle={SidebarToggle}
//         setSidebarToggle={setSidebarToggle}
//         userRole={userRole}
//       />

//       {/* Overlay for mobile */}
//       {SidebarToggle && (
//         <div
//           onClick={() => setSidebarToggle(false)}
//           className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
//         />
//       )}

//       {/* Main content */}
//       <div
//         className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
//           SidebarToggle ? "ml-40 lg:ml-40" : "ml-0"
//         }`}
//       >
//         {/* Navbar */}
//         <Navbar
//           SidebarToggle={SidebarToggle}
//           setSidebarToggle={setSidebarToggle}
//         />

//         <main className="flex-grow p-6 mt-16">
//           <Routes>
//             <Route path="/home" element={<Home />} />
//             <Route path="/search" element={<Search />} />
//             <Route path="/my-shelf" element={<My_shelf />} />
//             <Route path="/contribute" element={<Contribute />} />
//             {/* <Route path="/profile" element={<Profile />} /> */}
//             {userRole === "student" && (
//               <>
//                 <Route path="/borrow-history" element={<BorrowHistory />} />
//                 <Route path="/payment" element={<PaymentPage />} />
//               </>
//             )}
//             {userRole === "admin" && (
//               <Route path="/admin-dashboard" element={<AdminDashboard />} />
//             )}
//             {/* Student routes */}
//             <Route
//               path="/borrow-history"
//               element={
//                 <ProtectedRoute role="student">
//                   <BorrowHistory />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/payment"
//               element={
//                 <ProtectedRoute role="student">
//                   <PaymentPage />
//                 </ProtectedRoute>
//               }
//             />
//             {/* <Route
//               path="/borrowed-books"
//               element={
//                 <ProtectedRoute role="student">
//                   <BorrowedBooks />
//                 </ProtectedRoute>
//               }
//             /> */}
//             {/* Admin routes */}
//             <Route
//               path="/admin-dashboard"
//               element={
//                 <ProtectedRoute role="admin">
//                   <AdminDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/payment-plans"
//               element={
//                 <ProtectedRoute role="student">
//                   <PaymentPlans />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/pending-payment"
//               element={
//                 <ProtectedRoute role="student">
//                   <PendingPayment />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/admin-payments"
//               element={
//                 <ProtectedRoute role="admin">
//                   <AdminPayments />
//                 </ProtectedRoute>
//               }
//             />

//             <Route path="/" element={<Navigate to="/books" />} />
//             <Route path="/books" element={<BookCatalogPage />} />
//             <Route path="/books/:id" element={<BookDetailsPage />} />
//             <Route path="/welcome" element={<Welcome />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/guest" element={<Guest />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//           </Routes>
//         </main>

//         {/* Footer */}
//         <footer className="bg-white text-center py-3">footer</footer>
//       </div>
//     </div>
//   );
// };

// export default App;
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

// 🔹 Import missing pages
import PaymentPlans from "./pages/PaymentPlans";
import PendingPayment from "./pages/PendingPayment";
import AdminPayments from "./pages/AdminPayments";

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
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/guest" element={<Guest />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/books" element={<BookCatalogPage />} />
            <Route path="/books/:id" element={<BookDetailsPage />} />

            {/* Student routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute role="student">
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute role="student">
                  <Search />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-shelf"
              element={
                <ProtectedRoute role="student">
                  <My_shelf />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contribute"
              element={
                <ProtectedRoute role="student">
                  <Contribute />
                </ProtectedRoute>
              }
            />
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
            <Route
              path="/payment-plans"
              element={
                <ProtectedRoute role="student">
                  <PaymentPlans />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pending-payment"
              element={
                <ProtectedRoute role="student">
                  <PendingPayment />
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
            <Route
              path="/admin-payments"
              element={
                <ProtectedRoute role="admin">
                  <AdminPayments />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white text-center py-3">footer</footer>
      </div>
    </div>
  );
};

export default App;

import Login from "./pages/Login";
import Register from "./pages/Register";
import Guest from "./pages/Guest";
import ForgotPassword from "./pages/ForgotPassword";
import Welcome from "./pages/Welcome";
import { Routes, Route, Navigate } from "react-router-dom";
import BookCatalogPage from "./pages/BookCatalogPage";
import BookDetailsPage from "./pages/BookDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/guest" element={<Guest />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<Navigate to="/books" />} />
      <Route path="/books" element={<BookCatalogPage />} />
      <Route path="/books/:id" element={<BookDetailsPage />} />
    </Routes>
  );
}

export default App;





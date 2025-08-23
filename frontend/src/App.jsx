import { Routes, Route, Navigate } from "react-router-dom";
import BookCatalogPage from "./pages/BookCatalogPage";
import BookDetailsPage from "./pages/BookDetailsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/books" />} />
      <Route path="/books" element={<BookCatalogPage />} />
      <Route path="/books/:id" element={<BookDetailsPage />} />
    </Routes>
  );
}

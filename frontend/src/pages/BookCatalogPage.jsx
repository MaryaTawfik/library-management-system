import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { FaFilter } from "react-icons/fa";
import { getAllBooks } from "../services/booksService";

export default function BookCatalogPage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    getAllBooks().then((data) => {
      // if backend returns {status, data}, normalize it
      const normalized = data.data || data;
      setBooks(normalized);
      setFilteredBooks(normalized);
    });
  }, []);

  useEffect(() => {
    const results = books.filter((book) => {
      const matchesSearch =
        book.title?.toLowerCase().includes(search.toLowerCase()) ||
        book.author?.toLowerCase().includes(search.toLowerCase()) ||
        book.catagory?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Categories" ||
        book.catagory === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredBooks(results);
  }, [search, selectedCategory, books]);

  return (
    <div className="min-h-screen px-8 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-1">Book Catalog</h1>
      <p className="text-gray-800 text-sm mb-6">
        Browse and search our library collection
      </p>

      <SearchBar
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600 ">
          Showing {filteredBooks.length} of {books.length} books
        </p>

        <button className="flex items-center gap-2 text-sm text-gray-700 border border-gray-300 hover:text-green-700 transition whitespace-nowrap">
          <FaFilter className="text-orange-600" />
          <span>Advanced Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredBooks.map((book) => (
          <BookCard key={book._id || book.bookId} book={book} />
        ))}
      </div>
    </div>
  );
}

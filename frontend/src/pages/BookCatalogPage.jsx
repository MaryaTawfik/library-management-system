import { useEffect, useState } from "react";
import { getAllBooks } from "../services/booksService";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { FaFilter } from "react-icons/fa";

export default function BookCatalogPage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    getAllBooks().then((data) => {
      setBooks(data);
      setFilteredBooks(data);
    });
  }, []);

  useEffect(() => {
    const results = books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Categories" ||
        book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredBooks(results);
  }, [search, selectedCategory, books]);

  return (
    <div className="min-h-screen px-8 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-1">Book Catalog</h1>
      <p className="text-gray-800 text-sm mb-6">
        Browse and search our library collection
      </p>

      {/* Search bar with category filter */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Below search */}
      <div className="flex justify-between items-center  mb-4">
        {/* Left side: Showing count */}
        <p className="text-sm text-gray-600 ">
          Showing {filteredBooks.length} of {books.length} books
        </p>

        {/* Right side Advanced Filters button */}
        <button className="flex items-center gap-2 text-sm text-gray-700 border-1 border-gray-300 hover:text-green-700 transition whitespace-nowrap">
          <FaFilter className="text-orange-600" />
          <span>Advanced Filters</span>
        </button>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredBooks.map((book) => (
          <BookCard key={book.bookId} book={book} />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { FaFilter } from "react-icons/fa";
import { getAllBooks } from "../services/booksService";

export default function BookCatalogPage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCatagory, setSelectedCatagory] = useState("All Catagories");

  useEffect(() => {
    getAllBooks().then((data) => {
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

      const matchesCatagory =
        selectedCatagory === "All Catagories" ||
        book.catagory === selectedCatagory;

      return matchesSearch && matchesCatagory;
    });

    setFilteredBooks(results);
  }, [search, selectedCatagory, books]);

  return (
    <div className="min-h-screen px-6  max-w-7xl mx-auto bg-white rounded-2xl">
      <h1 className="text-3xl font-bold text-yellow-700 mb-2">Book Catalog</h1>
      <p className="text-gray-800 text-sm mb-6">
        Browse and search our library collection
      </p>

      <SearchBar
        search={search}
        setSearch={setSearch}
        selectedCatagory={selectedCatagory}
        setSelectedCatagory={setSelectedCatagory}
        catagories={[
          "All Catagories",
          ...new Set(books.map((b) => b.catagory)),
        ]}
      />

      <div className="flex justify-between items-center mb-4 bg-white">
        <p className="text-sm text-gray-600 bg-white border border-gray-300 px-2">
          Showing {filteredBooks.length} of {books.length} books
        </p>
        <button className="flex items-center text-sm text-gray-700 border border-gray-300 bg-white hover:text-yellow-700 px-2">
          <FaFilter className="text-yellow-700 mr-1" />
          Advanced Filters
        </button>
      </div>

      <div className="h-[70vh] overflow-y-auto bg-white p-4 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book._id || book.bookId} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}

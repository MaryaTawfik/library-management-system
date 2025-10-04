import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { getAllBooks } from "../services/booksService";

const PAGE_SIZE = 10; // how many books per page

export default function BookCatalogPage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCatagory, setSelectedCatagory] = useState("All Catagories");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);

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
    setCurrentPage(1); // reset to first page when filter/search changes
  }, [search, selectedCatagory, books]);

  // pagination calculations
  const totalPages = Math.ceil(filteredBooks.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedBooks = filteredBooks.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  return (
    <div className="min-h-screen px-6 max-w-7xl mx-auto bg-white rounded-2xlm  font-[sanif sarif] border-2 border-white shadow-sm dark:bg-gray-900 dark:border-0 rounded-lg py-8">
      <h1 className="text-3xl font-bold text-yellow-700 mb-2 font-[inter]">
        Book Catalog
      </h1>
      <p className="text-gray-800 text-sm mb-6  mt-3 font-[inter] dark:text-gray-300">
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

      <div className="flex justify-between items-center  mb-4 bg-white font-[roboto] dark:bg-gray-900">
        <p className="text-sm text-gray-600 bg-white border-2 border-gray-50 rounded px-2 dark:bg-gray-900 dark:text-gray-300 dark:border-0">
          Showing {paginatedBooks.length} of {filteredBooks.length} filtered
          (Total: {books.length})
        </p>
      </div>

      {/* Book Grid (no scroll) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6 dark:bg-gray-900">
        {paginatedBooks.map((book) => (
          <BookCard key={book._id || book.bookId} book={book} />
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-6 gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-1 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            ◀ Prev
          </button>
          <span className="dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-1 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}
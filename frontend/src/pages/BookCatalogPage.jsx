import { useEffect, useState } from "react";
import { getAllBooks } from "../services/booksService";
import BookCard from "../components/BookCard";
import BookTableRow from "../components/BookTableRow";

export default function BookCatalogPage() {
  const [books, setBooks] = useState([]);
  const [view, setView] = useState("grid"); // grid or table
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllBooks().then(setBooks);
  }, []);

  const filteredBooks = books.filter((book) =>
    [book.bookName, book.author, book.category]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4 items-centerm border-20 border-blue-50">
        <h1 className="text-2xl font-bold bg-gray-50">Book Catalog</h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by title, author, category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-1 rounded-lg"
          />
          <button
            onClick={() => setView(view === "grid" ? "table" : "grid")}
            className="bg-orange-400 px-3 py-1 rounded-lg"
          >
            Switch to {view === "grid" ? "Table" : "Grid"} View
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
            <BookCard key={book.bookId} book={book} />
          ))}
        </div>
      ) : (
        <table className="w-full borderm border-20 border-blue-50">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Author</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Availability</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <BookTableRow key={book.bookId} book={book} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

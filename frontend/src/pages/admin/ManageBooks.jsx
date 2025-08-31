import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooks, deleteBook } from "../../services/booksService"; // service should use API client

export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [openActionMenu, setOpenActionMenu] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const data = await getAllBooks();
      setBooks(data.data || data); // handle both actual + mock
    } catch (error) {
      console.error("Failed to load books", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirm) return;

    try {
      await deleteBook(id);
      loadBooks();
    } catch (error) {
      console.error("Failed to delete book", error);
    }
  };

  const filteredBooks = books.filter((book) =>
    (book.title + book.author + book.catagory)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-stone-500 rounded-2xl min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex-col">
          <h1 className="text-2xl text-white font-bold">📚 Manage Books</h1>
          <p className="text-gray-300">Add, edit, and manage book collection</p>
        </div>
        <button
          onClick={() => navigate("/admin/books/add")}
          className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Book
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by title, author, catagory, or isbn..."
        className="w-full mb-4 p-2 bg-white border-8 border-stone-600 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-slate-700 text-left text-white font-semibold">
            <tr>
              <th className="px-4 py-3">Book</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Copies</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.bookId || book._id} className="border-t">
                <td className="px-4 py-3 flex items-center gap-3">
                  {book.imageUrl ? (
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-10 h-14 object-cover rounded"
                    />
                  ) : (
                    <span className="text-6xl text-gray-400">📚</span>
                  )}
                  <div>
                    <div className="font-medium">{book.title}</div>
                    <div className="text-xs text-gray-500">
                      ISBN: {book.isbn}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{book.author}</td>
                <td className="px-4 py-3">
                  <span className="bg-emerald-100 text-orange-800 text-xs px-2 py-1 rounded">
                    {book.catagory}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {book.avaliablecopies} of {book.totalcopies}
                </td>
                <td className="px-4 py-3">
                  {book.avaliablecopies > 0 ? (
                    <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs">
                      Available
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                      Unavailable
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center relative">
                  {/* Three Dot Button */}
                  <button
                    onClick={() =>
                      setOpenActionMenu(
                        openActionMenu === book._id ? null : book._id
                      )
                    }
                    className="text-gray-600 hover:text-black text-xl"
                    title="Actions"
                  >
                    ⋯
                  </button>

                  {/* Dropdown */}
                  {openActionMenu === book._id && (
                    <div className="absolute right-1 top-8 w-28 bg-white border shadow-md rounded-md z-10 text-sm">
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/books/edit/${book._id || book.bookId}`
                          )
                        }
                        className="block w-full px-3 py-2 hover:bg-gray-100 text-left text-blue-600"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book._id || book.bookId)}
                        className="block w-full px-3 py-2 hover:bg-gray-100 text-left text-red-600"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filteredBooks.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

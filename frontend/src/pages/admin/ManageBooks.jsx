import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooks, deleteBook } from "../../services/booksService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [openActionMenu, setOpenActionMenu] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5; // change to 10 if you want more per page

  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const data = await getAllBooks();
      setBooks(data.data || data);

      toast.dismiss();
    } catch (error) {
      console.error("Failed to load books", error);
      toast.dismiss();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    toast.dismiss();
    toast.info(
      <div>
        <p>⚠️ Are you sure you want to delete this book?</p>
        <div className="flex bg-white justify-between gap-2 mt-2">
          <button
            onClick={async () => {
              try {
                await deleteBook(id);
                toast.dismiss();
                toast.success("🗑️ Book deleted successfully");
                loadBooks();
              } catch (error) {
                console.error("Failed to delete book", error);
                toast.dismiss();
                toast.error("❌ Failed to delete book");
              }
            }}
            className="bg-gray-50 text-black px-1 py-1 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-50 text-black px-1 py-1 rounded"
          >
            No
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false }
    );
  };

  // Filter + Pagination
  const filteredBooks = books.filter((book) =>
    (book.title + book.author + book.catagory)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredBooks.slice(
    startIndex,
    startIndex + booksPerPage
  );

  return (
    <div className=" bg-white border-8 border-white rounded-2xl min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex-col">
          <h1 className="text-2xl text-yellow-700 font-bold">
            📚 Manage Books
          </h1>
          <p className="text-gray-800">Add, edit, and manage book collection</p>
        </div>
        <button
          onClick={() => navigate("/admin/books/add")}
          className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Book
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by title, author, category, or ISBN..."
        className="w-full mb-9 p-2 bg-white border-2 shadow-2xl border-stone-100 rounded"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // reset to page 1 when searching
        }}
      />

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-white text-left text-black font-semibold">
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
            {currentBooks.map((book) => (
              <tr
                key={book.bookId || book._id}
                className="border-6 border-gray-100 shadow-black"
              >
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-10 h-14 object-cover rounded"
                  />
                  <div>
                    <div className="font-medium">{book.title}</div>
                    <div className="text-xs text-gray-500 gap-2">
                      ISBN: {book.isbn}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{book.author}</td>
                <td className="px-8 py-3">
                  <span className="bg-neutral-100 text-yellow-900 text-sm px-2 py-1 rounded">
                    {book.catagory}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {book.avaliablecopies} of {book.totalcopies}
                </td>
                <td className="px-4 py-3">
                  {book.avaliablecopies > 0 ? (
                    <span className="bg-teal-50 text-yellow-700 px-2 py-1 rounded text-xs">
                      Available
                    </span>
                  ) : (
                    <span className="bg-gray-300 text-white px-2 py-1 rounded text-xs">
                      Unavailable
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center relative">
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

                  {openActionMenu === book._id && (
                    <div className="absolute right-1 top-8 w-28 bg-white border shadow-md rounded-md z-10 text-sm">
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/books/edit/${book._id || book.bookId}`
                          )
                        }
                        className="block w-full px-3 py-2 hover:bg-gray-100 text-left text-yello-600"
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
            {currentBooks.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            ◀ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}

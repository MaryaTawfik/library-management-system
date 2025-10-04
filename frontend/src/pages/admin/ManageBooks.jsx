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
    <div className=" bg-white border-0 border-white shadow-sm rounded-xl min-h-screen font-[sanif sarif] dark:bg-gray-900 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6 font-bold font-[inter]">
        <div className="flex-col">
          <h1 className="text-2xl text-yellow-700 font-bold font-[inter]">
            📚 Manage Books
          </h1>
          <p className="text-gray-800 mt-3 dark:text-gray-300 ">
            Add, edit, and manage book collection
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/books/add")}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Book
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by title, author, category, or isbn..."
        className="w-full mb-6 p-2 bg-white border-4 dark:border-0 hover:border-amber-50 shadow-lg border-stone-100 font-[poppins] rounded dark:bg-gray-900 dark:text-gray-200 dark:border-gray-600 focus:outline-none   dark:focus:ring-gray-500"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // reset to page 1 when searching
        }}
      />

      <div className="bg-white rounded shadow dark:bg-gray-700">
        <table className="min-w-full overflow-x-scroll  bg-white text-sm dark:bg-gray-900">
          <thead className="bg-white text-left text-black font-semibold font-[roboto] dark:bg-gray-900 dark:text-gray-300">
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
            {currentBooks.map((book, index) => (
              <tr
                key={book.bookId || index}
                className="border-6 border-white shadow-black odd:bg-gray-100 even:bg-gray-white dark:odd:bg-gray-800 dark:even:bg-gray-900 dark:border-gray-700 dark:border-0"
              >
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-10 h-14 object-cover shadow-md rounded"
                  />
                  <div>
                    <div className="font-medium font-[sans] dark:text-gray-300">{book.title}</div>
                    <div className="text-xs text-gray-500 gap-2 dark:text-gray-300">
                      ISBN: {book.isbn}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 dark:text-gray-300">{book.author}</td>
                <td className="px-8 py-3">
                  <span className="bg-neutral-100 text-yellow-900 text-sm px-2 py-1 rounded dark:bg-gray-600 dark:text-gray-300">
                    {book.catagory}
                  </span>
                </td>
                <td className="px-4 py-3 dark:text-gray-300">
                  {book.availablecopies} of {book.totalcopies}
                </td>
                <td className="px-4 py-3">
                  {book.availablecopies > 0 ? (
                    <span className="bg-teal-50 text-yellow-700 px-2 py-1.5 rounded text-xs dark:bg-gray-600 dark:text-white">
                      Available
                    </span>
                  ) : (
                    <span className="bg-gray-300 text-white px-2 py-1 rounded text-xs dark:bg-gray-600 dark:text-white">
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
                    className="text-gray-600 hover:text-black text-xl dark:text-gray-300 dark:hover:text-white"
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
                <td colSpan="6" className="text-center text-gray-500 py-6 dark:text-gray-300">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-6 gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            ◀ Prev
          </button>
          <span className="text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}

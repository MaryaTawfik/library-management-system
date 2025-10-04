import React, { useEffect, useState } from "react";
import { getBorrowedBooks, requestReturnBook } from "../services/borrowService";

const dummyData = [
  {
    borrowId: "dummy1",
    borrowDate: "2025-08-19",
    dueDate: "2025-09-02",
    status: "borrowed",
    book: {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Classic Literature",
      imageUrl: "/placeholder.png",
    },
  },
  {
    borrowId: "dummy2",
    borrowDate: "2025-08-16",
    dueDate: "2025-08-30",
    status: "borrowed",
    book: {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Classic Literature",
      imageUrl: "/placeholder.png",
    },
  },
];

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDaysRemaining = (dueDate) => {
    if (!dueDate || dueDate === "-") return "N/A";
    const due = new Date(dueDate);
    if (isNaN(due)) return "Invalid Date";
    const today = new Date();
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days remaining` : "Overdue";
  };

  const handleReturn = async (borrowId) => {
    try {
      setBorrowedBooks((prev) =>
        prev.map((book) =>
          book.borrowId === borrowId ? { ...book, status: "pending_return" } : book
        )
      );

      const res = await requestReturnBook(borrowId);

      setBorrowedBooks((prev) =>
        prev.map((book) =>
          book.borrowId === borrowId
            ? { ...book, status: res.status || "pending_return" }
            : book
        )
      );
    } catch (err) {
      alert(err.response?.data?.error || "Failed to request return");

      setBorrowedBooks((prev) =>
        prev.map((book) =>
          book.borrowId === borrowId ? { ...book, status: "borrowed" } : book
        )
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBorrowedBooks();
        console.log("Fetched borrowed books:", data);

        const normalized = data.map((item) => ({
          borrowId: item.borrowId,
          borrowDate: item.borrowDate,
          dueDate: item.dueDate,
          status: item.status?.toLowerCase(),
          book: {
            title: item.title || item.book?.title || "Untitled",
            author: item.author || item.book?.author || "Unknown",
            category: item.category || item.book?.catagory || "Uncategorized",
            imageUrl: item.image || item.book?.imageUrl || "/placeholder.png",
          },
        }));

        setBorrowedBooks(normalized);
      } catch (error) {
        console.error(error);
        console.warn("Backend offline or user not a member, using dummy data");
        setBorrowedBooks(dummyData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredBooks = borrowedBooks.filter(
    (book) =>
      book.status === "borrowed" || book.status === "pending_return"
  );

  if (loading) return <div className="text-center mt-10 dark:text-gray-400">Loading...</div>;

  return (
    <div className="bg-white border-0 shadow-sm rounded-xl min-h-screen font-[sans-serif] dark:bg-gray-900 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6 font-bold font-[inter]">
        <h1 className="text-2xl text-yellow-700 font-bold font-[inter]">
          📚 My Borrowed Books
        </h1>
      </div>

      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No borrowed books at the moment.
        </p>
      ) : (
        <div className="bg-white rounded shadow dark:bg-gray-700 overflow-x-auto">
          <table className="min-w-full bg-white text-sm dark:bg-gray-900">
            <thead className="bg-white text-left text-black font-semibold font-[roboto] dark:bg-gray-900 dark:text-gray-300">
              <tr>
                <th className="px-4 py-3">Book</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Borrowed Date</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3">Remaining</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr
                  key={book.borrowId || index}
                  className="border-6 border-white odd:bg-gray-100 even:bg-white dark:odd:bg-gray-800 dark:even:bg-gray-900 dark:border-gray-700 dark:border-0"
                >
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={book.book.imageUrl}
                      alt={book.book.title}
                      className="w-10 h-14 object-cover shadow-md rounded"
                    />
                    <div>
                      <div className="font-medium dark:text-gray-300">
                        {book.book.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 dark:text-gray-300">
                    {book.book.author}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-neutral-100 text-yellow-900 text-xs px-2 py-1 rounded dark:bg-gray-600 dark:text-gray-300">
                      {book.book.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 dark:text-gray-300">
                    {book.borrowDate
                      ? new Date(book.borrowDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 dark:text-gray-300">
                    {book.dueDate
                      ? new Date(book.dueDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`${
                        getDaysRemaining(book.dueDate) === "Overdue"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      } px-2 py-1 rounded text-xs font-semibold`}
                    >
                      {getDaysRemaining(book.dueDate)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      disabled={
                        book.status === "pending_return" || book.status === "returned"
                      }
                      onClick={() => handleReturn(book.borrowId)}
                      className={`px-3 py-1 text-xs border rounded hover:bg-gray-200 transition dark:text-gray-200 dark:border-gray-600 ${
                        book.status === "pending_return" || book.status === "returned"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {book.status === "borrowed"
                        ? "Return"
                        : book.status === "pending_return"
                        ? "Pending Approval"
                        : "Returned"}
                    </button>
                  </td>
                </tr>
              ))}

              {filteredBooks.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center text-gray-500 py-6 dark:text-gray-300"
                  >
                    No borrowed books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;

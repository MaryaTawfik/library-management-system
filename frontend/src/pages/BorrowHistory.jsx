import React, { useEffect, useState } from "react";
import { getBorrowHistory } from "../services/borrowService";
import bookPlaceholder from "../assets/book2.jpg";

export default function BorrowHistory() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await getBorrowHistory();
      setBorrowedBooks(data || []);
    } catch (err) {
      console.error("Error fetching borrow history:", err);
      setError("Failed to load borrow history.");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(borrowedBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = borrowedBooks.slice(startIndex, startIndex + itemsPerPage);

  if (loading)
    return <p className="text-center mt-6 dark:text-gray-400">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-6">{error}</p>;
  if (borrowedBooks.length === 0)
    return (
      <p className="text-center mt-6 dark:text-gray-400">
        No borrowed books found.
      </p>
    );

  return (
    <div className="bg-white border-0 shadow-sm rounded-xl min-h-screen font-[sans-serif] dark:bg-gray-900 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6 font-bold font-[inter]">
        <h1 className="text-2xl text-yellow-700 font-bold font-[inter]">
          📖 Borrow History
        </h1>
      </div>

      <div className="bg-white rounded shadow dark:bg-gray-700">
        <table className="min-w-full bg-white text-sm dark:bg-gray-900">
          <thead className="bg-white text-left text-black font-semibold font-[roboto] dark:bg-gray-900 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3">Book</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Borrowed</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3">Returned</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((borrow, index) => (
              <tr
                key={borrow.borrowId || index}
                className="border-6 border-white odd:bg-gray-100 even:bg-white dark:odd:bg-gray-800 dark:even:bg-gray-900 dark:border-gray-700 dark:border-0"
              >
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={borrow.image || bookPlaceholder}
                    alt={borrow.title}
                    className="w-10 h-14 object-cover shadow-md rounded"
                  />
                  <div>
                    <div className="font-medium dark:text-gray-300">
                      {borrow.title}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 dark:text-gray-300">{borrow.author}</td>
                <td className="px-4 py-3 dark:text-gray-300">
                  {new Date(borrow.borrowDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 dark:text-gray-300">
                  {borrow.dueDate
                    ? new Date(borrow.dueDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="px-4 py-3 dark:text-gray-300">
                  {borrow.status === "returned"
                    ? borrow.returnDate
                      ? new Date(borrow.returnDate).toLocaleDateString()
                      : "Returned"
                    : "Not yet"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`${
                      borrow.status === "returned"
                        ? "bg-green-100 text-green-700"
                        : borrow.status === "pending_return"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    } px-2 py-1 rounded text-xs font-semibold`}
                  >
                    {borrow.status}
                  </span>
                </td>
              </tr>
            ))}

            {currentItems.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 py-6 dark:text-gray-300"
                >
                  No borrow history found.
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
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50 dark:bg-gray-600 dark:text-gray-300"
          >
            ◀ Prev
          </button>
          <span className="text-gray-500 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50 dark:bg-gray-600 dark:text-gray-300"
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { getPendingReturns, approveReturnBook } from "../services/borrowService";
import { toast } from "react-toastify";

export default function AdminBorrowApproval() {
  const [pendingBooks, setPendingBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvingIds, setApprovingIds] = useState([]); // Track loading per borrow
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  useEffect(() => {
    const fetchPendingBooks = async () => {
      try {
        const response = await getPendingReturns();
        setPendingBooks(response.data || []);
      } catch (err) {
        console.error("Error fetching pending books:", err);
        toast.error("Failed to fetch pending returns");
      } finally {
        setLoading(false);
      }
    };
    fetchPendingBooks();
  }, []);

  const handleApprove = async (borrowId) => {
    try {
      setApprovingIds((prev) => [...prev, borrowId]); // start loading

      if (borrowId === "dummy123") {
        setPendingBooks((prev) => prev.filter((b) => b.borrowId !== borrowId));
        toast.success("Dummy return approved (test only)!");
        setApprovingIds((prev) => prev.filter((id) => id !== borrowId));
        return;
      }

      const res = await approveReturnBook(borrowId);
      const approvedId = res.borrow._id;

      setPendingBooks((prev) =>
        prev.filter((b) => (b._id || b.borrowId) !== approvedId)
      );

      toast.success("Return approved successfully!");
    } catch (err) {
      console.error("Error approving return:", err);
      toast.error("Failed to approve return");
    } finally {
      setApprovingIds((prev) => prev.filter((id) => id !== borrowId)); // stop loading
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(pendingBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBorrows = pendingBooks.slice(startIndex, startIndex + booksPerPage);

  if (loading) return <div className="text-center mt-10 dark:text-gray-300">Loading...</div>;
  if (pendingBooks.length === 0) return <p className="text-center mt-10 dark:text-gray-300">No pending returns</p>;

  return (
    <div className="mx-auto px-4 py-8 max-w-6xl dark:bg-gray-900">
      <h2 className="text-2xl text-yellow-700 font-bold font-[inter] mb-6">Pending Return Approvals</h2>

      <div className="overflow-x-auto bg-white rounded shadow ">
        <table className="min-w-full bg-white text-sm dark:bg-gray-900">
          <thead className="bg-gray-100 text-left font-semibold text-gray-700 dark:bg-gray-900 dark:text-gray-300 border-0 border-gray-50 dark:border-gray-700">
            <tr>
              <th className="px-4 py-3">Book</th>
              <th className="px-4 py-3">Borrowed By</th>
              <th className="px-4 py-3">Borrow Date</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3">Returned Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBorrows.map((borrow) => {
              const isApproving = approvingIds.includes(borrow._id || borrow.borrowId);
              return (
                <tr key={borrow._id || borrow.borrowId} className="border-0 odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-900 ">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img
                      src={borrow.book.imageUrl || "/placeholder.png"}
                      alt={borrow.book.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium dark:text-gray-400  text-black">{borrow.book.title}</p>
                      <p className="text-xs text-black dark:text-gray-400">{borrow.book.author}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {borrow.user.firstName} {borrow.user.lastName} <br />
                    <span className="text-xs dark:text-gray-400  text-gray-500">{borrow.user.email}</span>
                  </td>
                  <td className="px-4 py-3 dark:text-gray-300">{new Date(borrow.borrowDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 dark:text-gray-300">{new Date(borrow.duedate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 dark:text-gray-300">
                    {borrow.returnDate ? new Date(borrow.returnDate).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleApprove(borrow._id || borrow.borrowId)}
                      disabled={isApproving}
                      className={`px-3 py-1 rounded text-white ${
                        isApproving ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-700"
                      }`}
                    >
                      {isApproving ? "Approving..." : "Approve"}
                    </button>
                  </td>
                </tr>
              );
            })}
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

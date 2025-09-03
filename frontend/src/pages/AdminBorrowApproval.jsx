import React, { useEffect, useState } from "react";
import { getPendingReturns, approveReturnBook } from "../services/borrowService";
import { toast } from "react-toastify";

const AdminBorrowApproval = () => {
  const [pendingBooks, setPendingBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending returns
  useEffect(() => {
    const fetchPendingBooks = async () => {
      try {
        const response = await getPendingReturns(); // {status, data: [...]}
        const pendingArray = response.data || [];
        setPendingBooks(pendingArray);
      } catch (err) {
        console.error("Error fetching pending books:", err);
        toast.error("Failed to fetch pending returns");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingBooks();
  }, []);

  // Approve a pending return
  const handleApprove = async (borrowId) => {
    try {
      if (borrowId === "dummy123") {
        // Skip backend for dummy book
        setPendingBooks((prev) =>
          prev.filter((borrow) => borrow.borrowId !== borrowId)
        );
        toast.success("Dummy return approved (test only)!");
        return;
      }

      const res = await approveReturnBook(borrowId);
      console.log("Approved:", res);

      const approvedId = res.borrow._id;

      // Remove approved borrow from list
      setPendingBooks((prev) =>
        prev.filter((borrow) => (borrow._id || borrow.borrowId) !== approvedId)
      );

      toast.success("Return approved successfully!");
    } catch (err) {
      console.error("Error approving return:", err);
      toast.error("Failed to approve return");
    }
  };

  // Loading state
  if (loading) return <div className="text-center mt-10">Loading...</div>;

  // Empty state
  if (pendingBooks.length === 0)
    return <p className="text-center mt-10">No pending returns</p>;

  // Render list of pending books
  return (
    <div className="mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-2xl font-bold text-center mb-6">
        Pending Return Approvals
      </h2>

      {pendingBooks.map((borrow) => (
        <div
          key={borrow._id || borrow.borrowId}
          className="bg-gray-100 rounded-lg p-4 mb-4 flex justify-between items-center shadow"
        >
          <div>
            {/* Book info */}
            <h3 className="font-semibold text-lg">{borrow.book.title}</h3>
            <p>by {borrow.book.author}</p>
            <p className="text-sm text-gray-600">
              Borrowed: {new Date(borrow.borrowDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              Due: {new Date(borrow.duedate).toLocaleDateString()}
            </p>
            {borrow.returnDate && (
              <p className="text-sm text-gray-600">
                Returned: {new Date(borrow.returnDate).toLocaleDateString()}
              </p>
            )}

            {/* User info */}
            <p className="text-sm text-gray-600 mt-2">
              Borrowed by: {borrow.user.firstName} {borrow.user.lastName} ({borrow.user.userID})
            </p>
            <p className="text-sm text-gray-600">Email: {borrow.user.email}</p>
          </div>

          <button
            onClick={() => handleApprove(borrow._id || borrow.borrowId)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Approve Return
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminBorrowApproval;

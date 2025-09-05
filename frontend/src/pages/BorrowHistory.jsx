import React, { useEffect, useState } from "react";
import { getBorrowHistory } from "../services/borrowService";
import bookPlaceholder from "../assets/book2.jpg";

const BorrowHistory = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const backendData = await getBorrowHistory();
        console.log("Borrow history fetched successfully:", backendData);
        setBorrowedBooks(backendData || []);
      } catch (err) {
        console.error("Error fetching borrow history:", err);
        setError("Failed to load borrow history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;
  if (borrowedBooks.length === 0)
    return <p className="text-center mt-4">No borrowed books found.</p>;

  return (
    <div className="mx-auto px-4 py-6 max-w-6xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Borrow History</h2>

      {borrowedBooks.map((borrow) => (
        <div
          key={borrow.borrowId}
          className="bg-gray-100 rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row md:items-center gap-4"
        >
          {/* Book Image */}
          <img
            src={borrow.image || bookPlaceholder}
            alt={borrow.title}
            className="w-24 h-36 object-cover rounded self-center md:self-start"
          />

          {/* Book Info */}
          <div className="flex-1 space-y-2">
            <div>
              <h3 className="text-lg font-semibold">{borrow.title}</h3>
              <p className="text-gray-700">by {borrow.author}</p>
              {/* {borrow.category && (
                <span className="inline-block mt-1 text-xs text-white bg-green-600 px-2 py-1 rounded">
                  {borrow.category}
                </span>
              )} */}
            </div>

            {/* Dates and Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mt-3">
              <div>
                <p className="font-medium">Borrowed</p>
                <p>{new Date(borrow.borrowDate).toLocaleDateString()}</p>
              </div>

              <div>
                <p className="font-medium">Due Date</p>
                <p>
                  {borrow.dueDate
                    ? new Date(borrow.dueDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <div>
                <p className="font-medium">Returned</p>
                <p>
                  {borrow.status === "returned"
                    ? borrow.returnDate
                      ? new Date(borrow.returnDate).toLocaleDateString()
                      : "Returned"
                    : "Not yet"}
                </p>
              </div>

              <div>
                <p className="font-medium">Status</p>
                <span
                  className={`${
                    borrow.status === "returned"
                      ? "text-green-700 bg-green-200"
                      : borrow.status === "pending_return"
                      ? "text-yellow-700 bg-yellow-200"
                      : "text-blue-700 bg-blue-200"
                  } font-semibold px-2 py-1 rounded`}
                >
                  {borrow.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BorrowHistory;

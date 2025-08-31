import React, { useEffect, useState } from "react";
import { getBorrowHistory } from "../services/borrowService";

const BorrowHistory = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user?._id) {
          throw new Error("User not logged in");
        }

        // 🔹 Get backend borrow history
        let backendData = await getBorrowHistory(user._id, token);

        // 🔹 Also check localStorage borrowed books
        let localBorrowed = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

        // 🔹 Normalize backend vs local
        backendData = Array.isArray(backendData) ? backendData : [];

        // 🔹 Merge them (local ones won't have borrow info like dueDate, so mark them)
        const mergedData = [
          ...backendData,
          ...localBorrowed.map((b, idx) => ({
            _id: `local-${idx}`, // unique key
            book: b,
            status: "borrowed",
            createdAt: new Date().toISOString(),
            returnDate: null,
          })),
        ];

        setBorrowedBooks(mergedData);
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
  if (borrowedBooks.length === 0) return <p className="text-center mt-4">No borrowed books found.</p>;

  return (
    <div className="mx-auto px-4 py-6 max-w-6xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Borrow History</h2>
      {borrowedBooks.map((borrow) => {
        const book = borrow.book || {}; // ✅ Safe fallback
        return (
          <div
            key={borrow._id}
            className="bg-gray-100 rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row md:items-center gap-4"
          >
            <img
              src={book.imageUrl || "/placeholder.png"} // ✅ fixed key: matches BookDetailPage
              alt={book.title || "Book"}
              className="w-24 h-36 object-cover rounded self-center md:self-start"
            />

            <div className="flex-1 space-y-2">
              <div>
                <h3 className="text-lg font-semibold">{book.title || "Untitled"}</h3>
                <p className="text-gray-700">by {book.author || "Unknown Author"}</p>
                {book.catagory && ( // ✅ spelling fixed to match your BookDetailPage
                  <span className="inline-block mt-1 text-xs text-white bg-green-600 px-2 py-1 rounded">
                    {book.catagory}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mt-3">
                <div>
                  <p className="font-medium">Borrowed</p>
                  <p>{borrow.createdAt ? new Date(borrow.createdAt).toLocaleDateString() : "N/A"}</p>
                </div>
                <div>
                  <p className="font-medium">Due Date</p>
                  <p>{borrow.returnDate ? new Date(borrow.returnDate).toLocaleDateString() : "N/A"}</p>
                </div>
                <div>
                  <p className="font-medium">Returned</p>
                  <p>{borrow.status === "returned" && borrow.updatedAt ? new Date(borrow.updatedAt).toLocaleDateString() : "Not yet"}</p>
                </div>
                <div>
                  <p className="font-medium">Status</p>
                  <span
                    className={`${
                      borrow.status === "returned" ? "text-green-700 bg-green-200" : "text-yellow-700 bg-yellow-200"
                    } font-semibold px-2 py-1 rounded`}
                  >
                    {borrow.status || "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BorrowHistory;

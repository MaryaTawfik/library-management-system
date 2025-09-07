import React, { useEffect, useState } from "react";
import { getBorrowedBooks, requestReturnBook } from "../services/borrowService";

const dummyData = [
  {
    borrowId: "dummy1",
    borrowDate: "2025-08-19",
    dueDate: "2025-09-02",
    status: "Borrowed",
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
    status: "Borrowed",
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
          status: item.status,
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
        console.warn(
          "Backend offline or user not a member, using dummy data"
        );
        setBorrowedBooks(dummyData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredBooks = borrowedBooks.filter(
    (book) =>
      book.status?.toLowerCase() === "borrowed" ||
      book.status?.toLowerCase() === "pending_return"
  );

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-1">
        My Borrowed Books
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Keep track of your current borrowings
      </p>

      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-600">
          No borrowed books at the moment.
        </p>
      ) : (
        filteredBooks.map((book) => (
          <div
            key={book.borrowId}
            className="bg-gray-100 rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row md:items-center gap-10"
          >
            <img
              src={book.book.imageUrl}
              alt={book.book.title}
              className="w-24 h-36 object-cover rounded self-center md:self-start"
            />
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold">{book.book.title}</h3>
              <p className="text-gray-700">by {book.book.author}</p>
              <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded mb-2">
                {book.book.category}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 text-sm text-gray-600 mt-3">
                <div>
                  <p className="font-medium">Borrowed Date</p>
                  <p>
                    {book.borrowDate
                      ? new Date(book.borrowDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Due Date</p>
                  <p>
                    {book.dueDate
                      ? new Date(book.dueDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-1">Status</p>
                  <span className="text-green-700 font-semibold bg-green-200 px-2 py-1 rounded">
                    {getDaysRemaining(book.dueDate)}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
    disabled={book.status === "pending_return" || book.status === "returned"}
    onClick={() => handleReturn(book.borrowId)}
    className={`px-4 py-1 text-sm border rounded hover:bg-gray-200 transition ${
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


              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BorrowedBooks;

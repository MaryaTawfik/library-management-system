import React, { useEffect, useState } from "react";
import { getBorrowedBooks } from "../services/borrowService";

// Dummy data fallback
const dummyData = [
  {
    id: "1",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    image: "/placeholder.png",
    borrowedDate: "2025-08-20T00:00:00Z",
    dueDate: "2025-09-03T00:00:00Z",
    status: "borrowed",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    category: "Dystopian",
    image: "/placeholder.png",
    borrowedDate: "2025-08-25T00:00:00Z",
    dueDate: "2025-09-08T00:00:00Z",
    status: "borrowed",
  },
];

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDaysRemaining = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days remaining` : "Overdue";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try fetching from backend
        const data = await getBorrowedBooks();
        setBorrowedBooks(data);
      } catch (error) {
        console.error(error);
        console.warn("Backend offline, using dummy data");
        // Fallback to dummy
        setBorrowedBooks(dummyData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-1">My Borrowed Books</h2>
      <p className="text-center text-gray-500 mb-6">
        Keep track of your current borrowings
      </p>

      {borrowedBooks.length === 0 ? (
        <p className="text-center text-gray-600">No borrowed books at the moment.</p>
      ) : (
        borrowedBooks.map((book) => (
          <div
            key={book.id}
            className="bg-gray-100 rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row md:items-center gap-10"
          >
            <img
              src={book.image || "/placeholder.png"}
              alt={book.title}
              className="w-24 h-36 object-cover rounded self-center md:self-start"
            />

            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-700">by {book.author}</p>
              <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded mb-2">
                {book.category}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 text-sm text-gray-600 mt-3">
                <div>
                  <p className="font-medium">Borrowed Date</p>
                  <p>{new Date(book.borrowedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-medium">Due Date</p>
                  <p>{new Date(book.dueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Status</p>
                  <span className="text-green-700 font-semibold bg-green-200 px-2 py-1 rounded">
                    {getDaysRemaining(book.dueDate)}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="px-4 py-1 text-sm border rounded hover:bg-gray-200 transition">
                  Renew
                </button>
                <button className="px-4 py-1 text-sm border rounded hover:bg-gray-200 transition">
                  Return
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

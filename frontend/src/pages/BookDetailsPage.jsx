import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getBookById } from "../services/booksService";
import { borrowBook } from "../services/borrowService";
import { toast } from "react-toastify";
import {
  FaBarcode,
  FaCalendarAlt,
  FaLayerGroup,
  FaBookOpen,
  FaBuilding,
  FaFileAlt,
  FaGlobe,
  FaCopy,
} from "react-icons/fa";

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-yellow-800 text-lg mt-1">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="text-sm text-gray-700">{value}</p>
      </div>
    </div>
  );
}

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookById(id)
      .then((data) => {
        const normalized = data.data || data;
        setBook(normalized);
      })
      .catch((err) => {
        console.error("Failed to fetch book:", err);
        toast.error("Failed to load book. Try again later.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found.</p>;

const handleBorrow = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Not logged in → redirect
    localStorage.setItem("pendingBorrow", JSON.stringify({ bookId: book._id }));
    navigate("/login");
    return;
  }

  if (!user.is_member) {
    // Non-members cannot borrow
    toast.error("Only members can borrow books");
    return;
  }

  try {
    const res = await borrowBook(book._id);
    toast.success(res.message || "Book borrowed successfully!");

    // Update localStorage with borrowed books
    let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    borrowedBooks.push(book);
    localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));

    // Update UI for available copies
    setBook((prev) => ({
      ...prev,
      avaliablecopies: prev.avaliablecopies - 1,
    }));
  } catch (err) {
    console.error("Borrow failed:", err.response?.data || err.message);
    // Show backend error if exists, else fallback
    toast.error(err.response?.data?.err || "Can't borrow more than 3 books at a time");
  }
};



  return (
    <div className="max-w-6xl mx-auto px-4 ">
      <Link
        to="/books"
        className="inline-block text-sm text-white bg-yellow-700 rounded px-1 py-1 hover:text-gray-700 mb-6"
      >
        ← Back to Catalog
      </Link>

      <div className="flex flex-col md:flex-row bg-gray-100 rounded-lg p-6 border border-gray-200">
        {/* Left side */}
        <div className="flex flex-col md:w-1/3 bg-white rounded-lg p-6 shadow-md border-r border-gray-300 relative">
          <div className="flex flex-col h-full bg-gray-100 rounded-md overflow-hidden mb-4">
            {/* Image */}
            <div className="flex-1 flex items-center justify-center w-full bg-gray-100">
              {book.imageUrl ? (
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full object-contain"
                />
              ) : (
                <span className="text-6xl text-gray-400">📚</span>
              )}
            </div>

            {/* Availability */}
            <div className="mt-2 px-2 py-1">
              <p className="text-green-700 font-semibold text-sm mb-1">
                Availability
              </p>
              <div className="flex justify-between items-center text-sm text-gray-800">
                <span>
                  {book.avaliablecopies} of {book.totalcopies} copies
                </span>
                <span
                  className={
                    book.avaliablecopies > 0
                      ? "text-green-700 font-medium"
                      : "text-white font-medium bg-amber-600 px-2 py-1 rounded"
                  }
                >
                  {book.avaliablecopies > 0 ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full mt-auto">
            {book.avaliablecopies > 0 ? (
              <button
                onClick={handleBorrow}
                className="w-full bg-orange-700 hover:bg-gray-800 text-white font-semibold py-2 rounded-lg transition"
              >
                Borrow Book
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-gray-600 cursor-not-allowed text-white font-semibold py-2 rounded-lg"
              >
                Unavailable
              </button>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="md:w-2/3 md:pl-6 mt-6 md:mt-0">
          <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
          <p className="text-gray-700 mb-6">{book.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem icon={<FaBuilding />} label="Author" value={book.author} />
            <InfoItem
              icon={<FaCalendarAlt />}
              label="Published Year"
              value={book.publishedYear || "N/A"}
            />
            <InfoItem
              icon={<FaLayerGroup />}
              label="Category"
              value={book.catagory || "N/A"}
            />
            <InfoItem icon={<FaCopy />} label="Pages" value={book.pages || "N/A"} />
            <InfoItem icon={<FaBarcode />} label="ISBN" value={book.isbn} />
            <InfoItem
              icon={<FaBookOpen />}
              label="Language"
              value={book.language || "English"}
            />
            <InfoItem
              icon={<FaFileAlt />}
              label="Publisher"
              value={book.publisher || "N/A"}
            />
            <InfoItem
              icon={<FaGlobe />}
              label="Location"
              value={book.location || "Library Shelf"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


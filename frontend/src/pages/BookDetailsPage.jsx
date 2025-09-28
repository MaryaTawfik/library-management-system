import { useEffect, useState } from "react";
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
      <div className="text-yellow-500 text-lg mt-1">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{label}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">{value}</p>
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

  if (loading) return <p className="text-center mt-6 text-gray-700 dark:text-gray-300">Loading...</p>;
  if (!book) return <p className="text-center mt-6 text-gray-700 dark:text-gray-300">Book not found.</p>;

  const handleBorrow = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      localStorage.setItem("pendingBorrow", JSON.stringify({ bookId: book._id }));
      navigate("/login");
      return;
    }
    if (!user.is_member) {
      toast.error("Only members can borrow books");
      return;
    }

    try {
      const res = await borrowBook(book._id);
      toast.success(res.message || "Book borrowed successfully!");
      let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
      borrowedBooks.push(book);
      localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));

      setBook((prev) => ({ ...prev, availablecopies: prev.availablecopies - 1 }));
    } catch (err) {
      console.error("Borrow failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.err || "Can't borrow more than 3 books at a time");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4  shadow-sm font-sans min-h-screen rounded-2xl dark:bg-gray-900 p-8 py-10">
      <Link
        to="/books"
        className="inline-block text-sm text-white bg-yellow-700 rounded px-3 py-1 hover:text-gray-700 mb-6"
      >
        ← Back to Catalog
      </Link>

      <div className="flex flex-col md:flex-row bg-white rounded-lg border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-6 gap-8">
        {/* Left - Image + Availability */}
        <div className="flex flex-col md:w-1/3 bg-white rounded-lg shadow-md border border-gray-100 relative p-4 dark:bg-gray-700 dark:border-gray-600">
          <div className="flex-1 flex items-center justify-center shadow-xl bg-gray-100 rounded-md mb-4 dark:bg-gray-600 p-2">
            <img src={book.imageUrl} alt={book.title} className="w-full object-contain rounded" />
          </div>

          <div className="mt-2 px-2 py-1">
            <p className="text-yellow-700 font-semibold text-sm mb-1 dark:text-yellow-400">Availability</p>
            <div className="flex justify-between items-center text-sm text-gray-800 dark:text-gray-200">
              <span>
                {book.availablecopies} of {book.totalcopies} copies
              </span>
              <span
                className={
                  book.availablecopies > 0
                    ? "text-yellow-700 font-medium dark:text-yellow-400"
                    : "text-white font-medium bg-yellow-700 px-2 py-1 rounded dark:bg-yellow-500"
                }
              >
                {book.availablecopies > 0 ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>

          {book.availablecopies > 0 ? (
            <button
              onClick={handleBorrow}
              className="w-full bg-gray-400 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg mt-4 dark:bg-gray-600 dark:hover:bg-gray-500 "
            >
              Borrow Book
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-teal-600 cursor-not-allowed text-white font-semibold py-2 rounded-lg mt-4"
            >
              Unavailable
            </button>
          )}
        </div>

        {/* Right Info */}
        <div className="border-4 border-gray-100 shadow-md md:w-2/3 space-y-6 pl-0 md:pl-8 mt-6 md:mt-0 p-4 dark:border-gray-600">
          <div className="relative bg-white p-6 rounded-lg dark:bg-gray-800">
            <span className="absolute top-4 right-4 px-3 py-1 border border-gray-400 text-yellow-700 bg-white rounded-full text-xs font-semibold shadow-sm dark:border-gray-600 dark:text-yellow-400 dark:bg-gray-700">
              {book.catagory}
            </span>

            <h1 className="text-2xl font-bold text-yellow-900 mb-1 dark:text-yellow-400">
              {book.title}
            </h1>
            <p className="text-gray-700 font-medium mb-4 dark:text-gray-300">by {book.author}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{book.description}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-800">
            <h2 className="text-black font-semibold text-lg mb-1 dark:text-white">Book Information</h2>
            <div className="w-full h-px bg-gray-100 my-3 dark:bg-gray-600" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
              <InfoItem icon={<FaBarcode />} label="ISBN" value={book.isbn || "N/A"} />
              <InfoItem icon={<FaCalendarAlt />} label="Publication Year" value={book.publishedYear} />
              <InfoItem icon={<FaLayerGroup />} label="Category" value={book.catagory} />
              <InfoItem icon={<FaBookOpen />} label="Edition" value={book.edition || "N/A"} />
              <InfoItem icon={<FaBuilding />} label="Publisher" value={book.publisher || "N/A"} />
              <InfoItem icon={<FaFileAlt />} label="Pages" value={book.pages || "N/A"} />
              <InfoItem icon={<FaGlobe />} label="Language" value={book.language || "English"} />
              <InfoItem icon={<FaCopy />} label="Total Copies" value={book.totalcopies} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

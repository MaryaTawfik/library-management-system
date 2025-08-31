import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getBookById } from "../services/booksService";


import { borrowBook } from "../services/borrowService";

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
      <div className="text-black text-lg mt-1">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-orange-700">{label}</p>
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

    getBookById(id).then((data) => {
      const normalized = data.data || data;
      setBook(normalized);
    });

    getBookById(id)
      .then((data) => {
        const normalized = data.data || data;
        setBook(normalized);
      })
      .catch((err) => {
        console.error("Failed to fetch book:", err);
        alert("Failed to load book. Try again later.");
      })
      .finally(() => setLoading(false));

  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found.</p>;

  const handleBorrow = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    localStorage.setItem(
      "pendingBorrow",
      JSON.stringify({ bookId: book._id })
    );
    navigate("/login");
    return;
  }

  try {
    const res = await borrowBook(book._id);
    alert(res.message || "Book borrowed successfully!");

    // ✅ Save borrowed book in localStorage (array)
    let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    borrowedBooks.push(book); // add the current book
    localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));

    // ✅ Update available copies in UI
    setBook((prev) => ({
      ...prev,
      avaliablecopies: prev.avaliablecopies - 1,
    }));
  } catch (err) {
    console.error("Borrow failed:", err.response?.data || err.message);
    alert(err.response?.data?.error || "Failed to borrow. Try again.");
  }
};


  const handleBorrow = () => navigate("/welcome");


  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link
        to="/books"
        className="inline-block text-sm text-gray-600 hover:text-green-700 mb-6"
      >
        ← Back to Catalog
      </Link>

      <div className="flex flex-col md:flex-row bg-gray-100 rounded-lg p-6 border border-gray-200">

        {/* Left - Image + Availability */}
        <div className="flex flex-col md:w-1/3 bg-white rounded-lg p-6 shadow-md border-r border-gray-300 relative">
          <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden mb-4">
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
                {book.avaliablecopies > 0 ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>

          {book.avaliablecopies > 0 ? (
            <button
              onClick={handleBorrow}
              className="w-full bg-orange-700 hover:bg-gray-800 text-white font-semibold py-2 rounded-lg mt-4"
            >
              Borrow Book
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-gray-600 cursor-not-allowed text-white font-semibold py-2 rounded-lg mt-4"
            >
              Unavailable
            </button>
          )}
        </div>


        {/* Right - Info */}
        <div className="md:w-2/3 space-y-6 pl-0 md:pl-8 mt-6 md:mt-0">
          <div className="relative bg-white p-6 rounded-lg">
            <span className="absolute top-4 right-4 px-3 py-1 border border-green-400 text-orange-700 bg-white rounded-full text-xs font-semibold shadow-sm">
              {book.catagory}
            </span>

            <h1 className="text-2xl font-bold text-orange-800 mb-1">
              {book.title}
            </h1>
            <p className="text-gray-700 font-medium mb-4">by {book.author}</p>
            <p className="text-sm text-gray-700">{book.description}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-orange-700 font-semibold text-lg mb-1">
              Book Information
            </h2>
            <div className="w-full h-px bg-gray-100 my-3" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
              <InfoItem
                icon={<FaBarcode />}
                label="ISBN"
                value={book.isbn || "N/A"}
              />
              <InfoItem
                icon={<FaCalendarAlt />}
                label="Publication Year"
                value={new Date(book.publishedYear).getFullYear()}
              />
              <InfoItem
                icon={<FaLayerGroup />}
                label="Category"
                value={book.catagory}
              />
              <InfoItem
                icon={<FaBookOpen />}
                label="Edition"
                value={book.edition || "N/A"}
              />
              <InfoItem
                icon={<FaBuilding />}
                label="Publisher"
                value={book.publisher || "N/A"}
              />
              <InfoItem
                icon={<FaFileAlt />}
                label="Pages"
                value={book.pages || "N/A"}
              />
              <InfoItem
                icon={<FaGlobe />}
                label="Language"
                value={book.language || "English"}
              />
              <InfoItem
                icon={<FaCopy />}
                label="Total Copies"
                value={book.totalcopies}
              />
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

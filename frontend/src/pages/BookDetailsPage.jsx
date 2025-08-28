import { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import { getBookById } from "../services/booksService";
import { useNavigate} from "react-router-dom";
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
      <div className="text-black-600 text-lg mt-1">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-orange-700">{label}</p>
        <p className="text-sm text-gray-700">{value}</p>
      </div>
    </div>
  );
}

export default function BookDetailPage() {
      const navigate = useNavigate();

  const { id } = useParams();
  const [book, setBook] = useState(null);
    const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    getBookById(id).then((data) => setBook(data));
  }, [id]);

  if (!book) return <p>Loading...</p>;

  const handleSubmit = (e) => {
  navigate('/welcome')
  };

 
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/books"
        className="inline-block text-sm text-gray-600 hover:text-green-700 mb-6"
      >
        ← Back to Catalog
      </Link>

      {/* Layout wrapper with border between left or right */}
      <div className="flex flex-col md:flex-row bg-gray-100 rounded-lg p-6 border border-gray-200">
        {/* Left side */}
        <div className="flex flex-col md:w-1/3 bg-white rounded-lg p-6 shadow-md border-r border-gray-300 relative">
          {/* Book image */}
          <div className="w-full bg-gray-100 flex items-center justify-center rounded-md overflow-hidden mb-4">
            {book.image ? (
              <img
                src={book.image}
                alt={book.title}
                className="w-full min-h-full"
              />
            ) : (
              <span className="text-6xl text-gray-400">📚</span>
            )}
          </div>

          {/* Availability label */}
          <p className="text-green-700 font-semibold text-sm mb-4 mt-22">
            Availability
          </p>

          {/* Availability row */}
          <div className="w-full flex justify-between items-center text-sm text-gray-800 ">
            <span>
              {book.availableCopies} of {book.totalCopies} copies
            </span>
            <span
              className={
                book.availableCopies > 0
                  ? "text-green-700 font-medium"
                  : "text-white font-medium bg-amber-600"
              }
            >
              {book.availableCopies > 0 ? "Available" : "Unavailable"}
            </span>
          </div>

          {/* Borrow button */}
          <div className="w-full mt-auto">
            {book.availableCopies > 0 ? (
              <button onSubmit={handleSubmit} className="w-full bg-orange-700 hover:bg-gray-800 text-white font-semibold py-2 rounded-lg transition">
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
        <div className="md:w-2/3 space-y-8 pl-0 md:pl-8 mt-8 md:mt-0">
          {/* Title & Description */}
          <div className="relative bg-white p-6 rounded-lg">
            {/* Top-right Category */}
            <span className="absolute top-4 right-4 px-3 py-1 border border-green-400 text-orange-700 bg-white rounded-full text-xs font-semibold shadow-sm">
              {book.category}
            </span>

            {/* Title & Author */}
            <h1 className="text-2xl font-bold text-orang-800 mb-1">
              {book.title}
            </h1>
            <p className="text-gray-700 font-medium mb-4">by {book.author}</p>

            {/* Description */}
            <p className="text-sm text-gray-700">{book.description}</p>
          </div>

          {/* Book Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-orange-700 font-semibold text-lg mb-1">
              Book Information
            </h2>
            <div className="w-full h-px bg-gray-100 my-3" />
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-x-10 gap-y-6">
              <InfoItem
                icon={<FaBarcode />}
                label="ISBN"
                value={book.isbn || "N/A"}
              />
              <InfoItem
                icon={<FaCalendarAlt />}
                label="Publication Year"
                value={new Date(book.publicationDate).getFullYear()}
              />
              <InfoItem
                icon={<FaLayerGroup />}
                label="Category"
                value={book.category}
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
              <InfoItem icon={<FaFileAlt />} label="Pages" value={book.pages} />
              <InfoItem
                icon={<FaGlobe />}
                label="Language"
                value={book.language || "English"}
              />
              <InfoItem
                icon={<FaCopy />}
                label="Total Copies"
                value={book.totalCopies}
              />
            </div>
          </div>

          {/* Related Books */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-black font-semibold text-lg mb-3">
              Related Books
            </h2>
            <p className="text-sm text-gray-700">
              Other books in the <strong>{book.category}</strong> category.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

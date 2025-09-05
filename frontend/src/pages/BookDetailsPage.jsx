import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getBookById } from "../services/booksService";
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

  useEffect(() => {
    getBookById(id).then((data) => {
      const normalized = data.data || data;
      setBook(normalized);
    });
  }, [id]);

  if (!book) return <p>Loading...</p>;

  const handleBorrow = () => navigate("/welcome");

  return (
    <div className="max-w-6xl mx-auto px-4 ">
      <Link
        to="/books"
        className="inline-block text-sm text-white bg-yellow-700 rounded px-1 py-1 hover:text-gray-700 mb-6"
      >
        ← Back to Catalog
      </Link>

      <div className="flex flex-col md:flex-row bg-white rounded-lg p-6 border border-gray-200">
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
            <p className="text-yellow-700 font-semibold text-sm mb-1">
              Availability
            </p>
            <div className="flex justify-between items-center text-sm text-gray-800">
              <span>
                {book.avaliablecopies} of {book.totalcopies} copies
              </span>
              <span
                className={
                  book.avaliablecopies > 0
                    ? "text-yellow-700 font-medium"
                    : "text-white font-medium bg-yellow-700 px-2 py-1 rounded"
                }
              >
                {book.avaliablecopies > 0 ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>

          {book.avaliablecopies > 0 ? (
            <button
              onClick={handleBorrow}
              className="w-full bg-gray-400 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg mt-4"
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
        <div className="md:w-2/3 space-y-6 pl-0 md:pl-8 mt-6 md:mt-0">
          <div className="relative bg-white p-6 rounded-lg">
            <span className="absolute top-4 right-4 px-3 py-1 border border-gray-400 text-yellow-700 bg-white rounded-full text-xs font-semibold shadow-sm">
              {book.catagory}
            </span>

            <h1 className="text-2xl font-bold text-yellow-900 mb-1">
              {book.title}
            </h1>
            <p className="text-gray-700 font-medium mb-4">by {book.author}</p>
            <p className="text-sm text-gray-700">{book.description}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-yellow-700 font-semibold text-lg mb-1">
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
          </div>
        </div>
      </div>
    </div>
  );
}

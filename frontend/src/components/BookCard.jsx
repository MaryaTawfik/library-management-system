import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div className="bg-gray-200 border border-gray-300 min-h-screen rounded-xl shadow-sm hover:shadow-md transition py-4 flex flex-col">
      <div className="w-full min-h-screen bg-orange-200 flex items-center justify-center rounded-md overflow-hidden mb-4">
        {book.image ? (
          <img
            src={book.image}
            alt={book.title}
            className="object-contain max-h-full"
          />
        ) : (
          <span className="text-6xl text-gray-400">📚</span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
        {book.title}
      </h3>
      <p className="text-sm text-gray-600">By {book.author}</p>
      <p className="text-xs text-gray-500 mb-2">{book.category}</p>

      <div className="flex justify-between items-center mt-auto text-sm mb-3">
        <span className="font-medium">
          Copies: {book.availableCopies} of {book.totalCopies}
        </span>
        <span
          className={
            book.availableCopies > 0 ? "text-green-600" : "text-red-600"
          }
        >
          {book.availableCopies > 0 ? "Available" : "Unavailable"}
        </span>
      </div>

      <Link
        to={`/books/${book.bookId}`}
        className="w-full text-center py-2 rounded-md bg-orange-600 hover:bg-green-700 text-white text-sm"
      >
        View Details
      </Link>
    </div>
  );
}

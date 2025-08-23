import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div className="mb-33 bg-gray-200 border border-gray-300 h-auto rounded-xl shadow-sm hover:shadow-md transition py-4 flex flex-col">
      <div className="w-full min-h-full bg-gray-100  flex items-center justify-center rounded-md overflow-hidden mb-4">
        <img
          src={book.image}
          alt={book.title}
          className="object-contain min-h-full"
        />
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
            book.availableCopies > 0
              ? "text-green-600"
              : "text-white bg-amber-600"
          }
        >
          {book.availableCopies > 0 ? "Available" : "Unavailable"}
        </span>
      </div>

      <Link
        to={`/books/${book.bookId}`}
        className="text-center py-2 rounded-md bg-orange-600 hover:bg-gray-700 text-white text-sm"
      >
        View Details
      </Link>
    </div>
  );
}

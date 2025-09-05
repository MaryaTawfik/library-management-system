import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  // Use _id if exists (backend), otherwise fallback to bookId (mock)
  const bookLinkId = book._id || book.bookId;

  return (
    <div className="mb-33 bg-gray-200 border border-gray-300 h-auto rounded-xl shadow-sm hover:shadow-md transition py-5 flex flex-col">
      <div className="w-full min-h-full bg-gray-100 flex items-center justify-center rounded-md overflow-hidden mb-9">
         (
          <img
            src={book.imageUrl}
            alt={book.title}
            className="object-contain min-h-full"
          />
        )
      </div>

      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
        {book.title}
      </h3>
      <p className="text-sm text-gray-600">By {book.author}</p>
      <p className="text-xs text-gray-500 mb-2">{book.catagory}</p>

      <div className="flex justify-between items-center mt-auto text-sm mb-3">
        <span className="font-medium">
          Copies: {book.avaliablecopies} of {book.totalcopies}
        </span>
        <span
          className={
            book.avaliablecopies > 0
              ? "text-green-600"
              : "text-white bg-amber-600 px-2 py-1 rounded"
          }
        >
          {book.avaliablecopies > 0 ? "Available" : "Unavailable"}
        </span>
      </div>

      <Link
        to={`/books/${bookLinkId}`}
        className="text-center py-2 rounded-md bg-yellow-800 hover:bg-gray-700 text-white text-sm"
      >
        View Details
      </Link>
    </div>
  );
}

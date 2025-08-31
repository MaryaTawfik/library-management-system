import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  const bookLinkId = book._id || book.bookId;

  return (
    <div className="mb-8 bg-stone-700 border border-slate-700 h-auto rounded-xl shadow-sm hover:shadow-md transition py-5 flex flex-col">
      <div className="h-full bg-white rounded-lg overflow-hidden flex flex-col">
        <div className="w-full h-48 flex items-center justify-center bg-gray-100 mb-4">
          {book.imageUrl ? (
            <img
              src={book.imageUrl}
              alt={book.title}
              className="object-cover h-full w-full"
            />
          ) : (
            <span className="text-6xl text-gray-400">📚</span>
          )}
        </div>

        <h4 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {book.title}
        </h4>
        <p className="text-sm text-gray-600 line-clamp-1">By {book.author}</p>
        <p className="text-xs text-gray-500 mb-2 line-clamp-1">
          {book.catagory}
        </p>

        <div className="flex justify-between items-center text-sm mb-3 mt-auto px-4">
          <span className="font-medium">
            Copies: {book.avaliablecopies} of {book.totalcopies}
          </span>
          <span
            className={
              book.avaliablecopies > 0
                ? "text-yellow-500"
                : "text-white bg-yellow-700 rounded px-2"
            }
          >
            {book.avaliablecopies > 0 ? "Available" : "Unavailable"}
          </span>
        </div>

        <Link
          to={`/books/${bookLinkId}`}
          className="w-full text-center py-2 mt-2 bg-slate-700 hover:bg-gray-700 text-white text-sm rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

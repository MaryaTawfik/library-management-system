import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  const bookLinkId = book._id || book.bookId;

  return (
    <div
      className=" bg-white border border-slate-100 h-auto rounded-xl shadow-sm hover:shadow-md transition py-1 px-1
   flex flex-col"
    >
      <div className="h-80 bg-white rounded-lg  flex flex-col">
        <div className="w-full  flex items-center border-4 border-slate-100 justify-center shadow-md bg-gray-100 mb-1 rounded">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="object-cover h-45 w-full"
          />
        </div>

        <h4 className="text-lg font-semibold text-gray-800 line-clamp-1 px-1">
          {book.title}
        </h4>
        <p className="text-sm text-gray-600 line-clamp-1 px-1">
          By {book.author}
        </p>
        <p className="text-xs text-gray-500 mb-2 line-clamp-1 px-1">
          {book.catagory}
        </p>

        <div className="flex justify-between items-center text-sm mb-3 mt-auto px-1">
          <span className="font-medium">
            Copies: {book.availablecopies} of {book.totalcopies}
          </span>
          <span
            className={
              book.availablecopies > 0
                ? "text-yellow-700 font-medium "
                : "text-white bg-yellow-800 rounded px-2"
            }
          >
            {book.availablecopies > 0 ? "Available" : "Unavailable"}
          </span>
        </div>

        <Link
          to={`/books/${bookLinkId}`}
          className="w-full text-center py-1 bg-gray-400 hover:bg-gray-500 text-white text-sm rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

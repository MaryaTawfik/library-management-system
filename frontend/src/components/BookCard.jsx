import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div className="bg-cyan-50 rounded-2xl shadow p-4 flex flex-col">
      <h3 className="font-semibold text-lg">{book.title}</h3>
      <img src={book.image} alt={book.title} style={{ width: "100px" }} />
      <p className="text-gray-600 text-sm">{book.author}</p>
      <p className="text-gray-500 text-xs">{book.category}</p>
      <div className="mt-2 text-sm">
        <span className="font-medium">Available: </span>
        {book.availableCopies}/{book.totalCopies}
      </div>
      <Link
        to={`/books/${book.bookId}`}
        className="mt-auto bg-orange-600 hover:bg-yellow-800 text-white rounded-lg px-3 py-1 text-sm text-center"
      >
        View Details
      </Link>
    </div>
  );
}

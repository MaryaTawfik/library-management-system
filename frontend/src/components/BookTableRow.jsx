import { Link } from "react-router-dom";

export default function BookTableRow({ book }) {
  return (
    <tr className="gap-3 border-20 border-blue-50">
      <td className="p-2 flex flex-1/2 gap-3">
        <img src={book.image} alt={book.name} style={{ width: "100px" }} />
        <div className=" p-2 ">
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      </td>
      <td className="p-2">{book.category}</td>
      <td className="p-2">
        {book.availableCopies > 0 ? (
          <span className="text-green-600">In Shelf</span>
        ) : (
          <span className="text-red-600">Unavailable</span>
        )}
      </td>
      <td className="p-2">
        <Link
          to={`/books/${book.bookId}`}
          className="text-orange-600 hover:underline"
        >
          Preview
        </Link>
      </td>
    </tr>
  );
}

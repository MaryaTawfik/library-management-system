import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../services/booksService";

export default function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    getBookById(id).then(setBook);
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className=" flex flex-col gap-3  p-3 max-w-3xl h-auto mt-6 mx-auto py-9 px-6 bg-gray-100 border-40 border-blue-100 rounded-2xl">
      <h1 className="text-3xl font-bold bg-orange-300">{book.title}</h1>
      <img src={book.image} alt={book.title} style={{ width: "200px" }} />
      <p className="text-gray-600">By {book.author}</p>
      <p className="text-gray-500">{book.category}</p>

      <div className="mt-4">
        <p>{book.description}</p>
        <p className="text-sm mt-2">
          <span className="font-medium">Pages:</span> {book.pages}
        </p>
        <p className="text-sm">
          <span className="font-medium">Publication Date:</span>{" "}
          {new Date(book.publicationDate).toLocaleDateString()}
        </p>
        <p className="text-sm">
          <span className="font-medium">Available Copies:</span>{" "}
          {book.availableCopies}/{book.totalCopies}
        </p>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import bgImage from "../assets/librarypic.jpg"; // same background

export default function Guest() {
  // Temporary static book list
  const books = [
    {
      id: 1,
      title: "Don’t Make Me Think",
      author: "Steve Krug",
      category: "Design",
    },
    {
      id: 2,
      title: "The Design of Everyday Things",
      author: "Don Norman",
      category: "Design",
    },
    {
      id: 3,
      title:
        "Sprint : How to solve big problems and test new ideas in just five days",
      author: "Jake Knapp",
      category: "Business",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative p-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-white mb-2 text-center">
          Welcome, Guest
        </h1>
        <p className="text-sm text-gray-200 mb-6 text-center">
          Browse books below. Register or login to borrow.
        </p>

        {/* Book List */}
        <div className="grid gap-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white/10 backdrop-blur-md border border-white/20 
                         p-4 rounded-lg shadow text-white flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{book.title}</h2>
                <p className="text-sm text-gray-300">{book.author}</p>
                <p className="text-xs text-gray-400">{book.category}</p>
              </div>
              <span className="text-xs px-2 py-1 bg-white/20 rounded">
                View Only
              </span>
            </div>
          ))}
        </div>

        {/* Links */}
        <p className="text-center text-gray-200 mt-6">
          Want full access?{" "}
          <Link
            to="/register"
            className="text-[#FA7C54] font-semibold underline"
          >
            Register Now
          </Link>
        </p>
        <p className="text-center text-gray-200">
          Already a user?{" "}
          <Link to="/login" className="text-[#FA7C54] font-semibold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

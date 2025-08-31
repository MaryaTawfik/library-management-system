import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getBookById,
  createBook,
  updateBook,
} from "../../services/booksService";
import { IoArrowBack } from "react-icons/io5";

export default function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [book, setBook] = useState({
    title: "",
    author: "",
    catagory: "",
    description: "",
    totalcopies: 1,
    avaliablecopies: 1,
    type: "Hard Copy",
    publishedYear: "",
    isbn: "",
    edition: "",
    publisher: "",
    language: "English",
  });

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load existing book if editing
  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      getBookById(id)
        .then((data) => {
          setBook(data);
          setPreviewUrl(data.image || ""); // show existing image if any
        })
        .catch(() => {
          setError("Failed to load book");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(book).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (file) formData.append("image", file);

      const token = localStorage.getItem("token");

      if (isEditMode) {
        await updateBook(id, formData, token);
        alert("Book updated!");
      } else {
        await createBook(formData, token);
        alert("Book added!");
      }

      navigate("/admin/books");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 bg-stone-500 rounded-2xl min-h-screen">
      {/* Back to Books */}
      <button
        onClick={() => navigate("/admin/books")}
        className="flex items-center text-gray-200 bg-stone-700 rounded px-2 py-2 hover:text-black mb-4 text-sm"
      >
        <IoArrowBack className="mr-1 text-lg" />
        Back to Books
      </button>

      {/* Heading */}
      <h1 className="text-2xl font-semibold text-white mb-1">
        {isEditMode ? "Edit Book" : "Add New Book"}
      </h1>
      <p className="text-sm text-gray-300 mb-6">
        {isEditMode
          ? "Update book details in the library collection"
          : "Add new book to the library collection"}
      </p>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 bg-slate-700 text-white rounded"
          />
        </div>

        {/* Author + Category */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium">Author</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              className="w-full border bg-white px-3 py-2 rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium">Category</label>
            <input
              type="text"
              name="catagory"
              value={book.catagory}
              onChange={handleChange}
              className="w-full border px-3 py-2 bg-white rounded"
            />
          </div>
        </div>

        {/* ISBN + Edition */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={book.isbn}
              onChange={handleChange}
              className="w-full border px-3 py-2 bg-white rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium">Edition</label>
            <input
              type="text"
              name="edition"
              value={book.edition}
              onChange={handleChange}
              className="w-full border px-3 py-2 bg-white rounded"
            />
          </div>
        </div>

        {/* Publisher + Published Year */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium">Publisher</label>
            <input
              type="text"
              name="publisher"
              value={book.publisher}
              onChange={handleChange}
              className="w-full border px-3 py-2 bg-white rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium">Published Year</label>
            <input
              type="date"
              name="publishedYear"
              value={book.publishedYear}
              onChange={handleChange}
              className="w-full border px-3 py-2 bg-white rounded"
            />
          </div>
        </div>

        {/* Total + Available Copies */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium">Total Copies</label>
            <input
              type="number"
              name="totalcopies"
              value={book.totalcopies}
              onChange={handleChange}
              className="w-full border px-3 py-2 bg-white rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium">Available Copies</label>
            <input
              type="number"
              name="avaliablecopies"
              value={book.avaliablecopies}
              onChange={handleChange}
              className="w-full border px-3 py-2 bg-white rounded"
            />
          </div>
        </div>

        {/* Type + Language */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium">Type</label>
            <select
              name="type"
              value={book.type}
              onChange={handleChange}
              className="w-full border px-3 py-2 bg-white rounded"
            >
              <option value="Hard Copy">Hard Copy</option>
              <option value="E-Book">E-Book</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block font-medium">Language</label>
            <input
              type="text"
              name="language"
              value={book.language}
              onChange={handleChange}
              className="w-full border px-3 py-2 bg-white rounded"
            />
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block font-medium">Book Cover</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full border px-3 py-2 bg-white rounded"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Book preview"
              className="mt-2 w-32 h-44 object-cover border"
            />
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            rows="4"
            className="w-full border px-3 py-2 bg-white rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white px-6 py-2 rounded hover:bg-orange-700"
        >
          {loading ? "Saving..." : isEditMode ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
}

/*// src/components/BookForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const BookForm = ({ bookToEdit, onSuccess, onCancel }) => {
  // If bookToEdit is passed, this is edit mode
  const isEditMode = Boolean(bookToEdit);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize form fields if editing
  useEffect(() => {
    if (isEditMode) {
      setTitle(bookToEdit.title || "");
      setAuthor(bookToEdit.author || "");
      setCategory(bookToEdit.category || "");
      setDescription(bookToEdit.description || "");
      setCoverUrl(bookToEdit.coverUrl || "");
    }
  }, [bookToEdit]);

  const validateForm = () => {
    if (!title.trim() || !author.trim() || !category.trim()) {
      setError("Title, Author, and Category are required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const bookData = { title, author, category, description, coverUrl };

    try {
      setLoading(true);
      if (isEditMode) {
        // Edit existing book
        await axios.put(`/books/${bookToEdit.id}`, bookData);
      } else {
        // Add new book
        await axios.post("/books", bookData);
      }
      setLoading(false);
      onSuccess(); // refresh list or close form
    } catch (err) {
      setLoading(false);
      setError("Failed to save book. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">
        {isEditMode ? "Edit Book" : "Add New Book"}
      </h3>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title *</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Author *</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Category *</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            className="w-full border rounded p-2"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Cover Image URL</label>
          <input
            type="url"
            className="w-full border rounded p-2"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            disabled={loading}
            placeholder="https://example.com/cover.jpg"
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {loading ? "Saving..." : isEditMode ? "Update Book" : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
*/

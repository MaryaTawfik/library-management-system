const mongoose = require("mongoose");
const Book = require("../models/book");

// const getAllBooks = async () => {
//   return await Book.find();
// };

// const getBookById = async (id) => {
//   if (!mongoose.Types.ObjectId.isValid(id)) return null;
//   return await Book.findById(id);
// };
const getAllBooks = async () => {
  return await Book.find({ isDeleted: false });
};

const getBookById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Book.findOne({ _id: id, isDeleted: false });
};


const createBook = async (
  title,
  author,
  publishedYear,
  catagory,
  totalcopies,
  availablecopies,
  isbn,
  pages,
  description,
  imageUrl
) => {
  const newBook = await Book.create({
    title,
    author,
    publishedYear,
    catagory,
    totalcopies,
    availablecopies,
    isbn,
    pages,
    description,
    imageUrl,
  });

  return newBook;
};

// const deleteBook = async (id) => {
//   if (!mongoose.Types.ObjectId.isValid(id)) return null;
//   return await Book.findByIdAndDelete(id);
// };

const deleteBook = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  const book = await Book.findById(id);
  if (!book) return null;

  book.isDeleted = true;
  await book.save();
  return book;
};


const updateBook = async (id, updatedData) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
      context: "query",
    });
    return updatedBook;
  } catch (err) {
    if (err && err.code === 11000) {
      const field = Object.keys(err.keyValue || {})[0] || "field";
      const message = `Duplicate value for ${field}. Please provide a unique value.`;
      const e = new Error(message);
      e.status = 409;
      throw e;
    }
    throw err;
  }
};

const getBooksPaginated = async (query, page = 1, limit = 10) => {
  const searchQuery = {};

  if (query.search) {
    const regex = new RegExp(query.search, "i");
    searchQuery.$or = [{ title: regex }, { catagory: regex }];
  }
  console.log("Search Query:", searchQuery);
  const skip = (page - 1) * limit;

  const [books, total] = await Promise.all([
    Book.find(searchQuery).skip(skip).limit(limit),
    Book.countDocuments(searchQuery),
  ]);
  console.log("Books found:", books.length);

  return {
    books,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  getBooksPaginated,
  updateBook,
};
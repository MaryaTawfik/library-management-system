const mongoose = require('mongoose');
const Book = require('../models/book');

const getAllBooks = async () => {
  return await Book.find();
};

const getBookById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Book.findById(id);
};

const createBook = async (
  title,
  author,
  publishedYear,
  catagory,
  totalcopies,
  avaliablecopies,
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
    avaliablecopies,
    isbn,
    pages,
    description,
    imageUrl
  });

  return newBook;
};

const deleteBook = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Book.findByIdAndDelete(id);
};

const updateBook = async (id, updatedData) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
      context: 'query'
    });
    return updatedBook;
  } catch (err) {
    if (err && err.code === 11000) {
      const field = Object.keys(err.keyValue || {})[0] || 'field';
      const message = `Duplicate value for ${field}. Please provide a unique value.`;
      const e = new Error(message);
      e.status = 409;
      throw e;
    }
    throw err;
  }
};




module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBook
};



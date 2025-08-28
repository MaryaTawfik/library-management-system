const Book = require('../models/book');

const getAllBooks = async () => {
  return await Book.find();
};

const getBookById = async (id) => {
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
  return await Book.findByIdAndDelete(id);
};

const updateBook = async (id, updatedData) => {
  const updatedBooks = await Book.findByIdAndUpdate(id, update

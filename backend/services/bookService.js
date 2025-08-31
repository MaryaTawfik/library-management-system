const book = require("../models/book");

const getAllBooks = async () => {
  return await book.find();
};
const getBookById = async (id) => {
  return await book.findById(id);
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
  const newBook = await book.create({
    title,
    author,
    publishedYear,
    catagory,
    totalcopies,
    avaliablecopies,
    isbn,
    pages,
    description,
    imageUrl,
  });

  return newBook;
};

const deleteBook = async (id) => {
  return await book.findByIdAndDelete(id);
};
const updateBook = async (id, updatedData) => {
  const updatedBooks = await book.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return updatedBooks;
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
  const newBook = await book.create({
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

const deleteBook = async(id)=>{
    return await book.findByIdAndDelete(id)
}
const updateBook = async(id ,updatedData)=>{
    const updatedBooks =  await book.findByIdAndUpdate(id ,updatedData  , {new:true} )
    return updatedBooks
}



module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  updateBook,
};

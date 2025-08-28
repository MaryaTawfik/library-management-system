const bookService = require('../services/bookService');
const cloudinary = require('../utils/cloudinary');

const getAll = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json({ status: 'success', data: books || [] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const oneBook = await bookService.getBookById(id);
    if (!oneBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(oneBook);
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const {
      title,
      author,
      publishedYear,
      catagory,
      totalcopies,
      avaliablecopies,
      isbn,
      pages,
      description
    } = req.body;

    // Handle image upload from different cases
    let imageUrl;
    if (req.file && req.file.imageUrl) {
      // Some middlewares like multer-storage-cloudinary provide imageUrl
      imageUrl = req.file.imageUrl;
    } else if (req.file && req.file.path) {
      // Multer storage often provides `path` = Cloudinary URL
      imageUrl = req.file.path;
    } else if (req.file && req.file.buffer) {
      // If buffer, upload manually with helper
      try {
        const uploadResult = await cloudinary.uploadImage(req.file.buffer, {
          folder: 'library'
        });
        imageUrl = uploadResult.imageUrl || uploadResult.url;
      } catch (uploadErr) {
        console.error('Cloudinary upload failed:', uploadErr);
        return res.status(500).json({
          status: 'error',
          message: 'Image upload failed',
          details: uploadErr.message
        });
      }
    } else if (req.body && req.body.imageUrl) {
      // If client already provides an imageUrl
      imageUrl = req.body.imageUrl;
    } else {
      imageUrl = undefined;
    }

    const newBook = await bookService.createBook(
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
    );

    res.status(201).json({
      status: 'success',
      message: 'Created successfully',
      data: newBook
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const updatedBook = await bookService.updateBook(id, updatedData);
    if (!updatedBook) {
      return res.status(400).json({ message: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await bookService.deleteBook(id);
    if (!deleted) {
      return res.status(404).json('Book is not found');
    }
    res.json({ message: 'Book is deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update
};

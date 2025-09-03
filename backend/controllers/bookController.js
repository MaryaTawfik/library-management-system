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

   
    if (!title || !author || !isbn) {
      return res.status(400).json({ status: 'error', message: 'title, author and isbn are required' });
    }

    
    let imageUrl;
    try {
      if (req.file) {
        console.log('Received file metadata:', req.file);
        
        if (req.file.path) {
          imageUrl = req.file.path;
        } else if (req.file.secure_url) {
          imageUrl = req.file.secure_url;
        } else if (req.file.buffer) {
          
          const uploaded = await cloudinary.uploadBuffer(req.file.buffer, req.file.mimetype, { folder: 'library' });
          imageUrl = cloudinary.extractUrl(uploaded);
        }
      } else if (req.body && req.body.imageUrl) {
        imageUrl = req.body.imageUrl; 
      }
    } catch (uploadErr) {
      console.error('Cloudinary upload failed:', uploadErr);
      return res.status(500).json({ status: 'error', message: 'Image upload failed', details: uploadErr.message || String(uploadErr) });
    }

    console.log('Final imageUrl to save:', imageUrl);

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

    return res.status(201).json({ status: 'success', message: 'Created successfully', data: newBook });
  } catch (err) {
    console.error('Create book error:', err);
    return res.status(500).json({ status: 'error', message: err.message || String(err) });
  }
};


  



const update = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

   
    console.log('Updating book with ID:', id);
    console.log('Updated data:', updatedData);

    if (req.file) {
      updatedData.imageUrl = req.file.path || req.file.secure_url; // Assuming multer is set up
    }

    const updatedBook = await bookService.updateBook(id, updatedData);

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book updated successfully', book: updatedBook });
  } catch (err) {
    console.warn('Update failed:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
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

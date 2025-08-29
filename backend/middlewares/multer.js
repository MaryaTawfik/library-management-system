const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'library',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const parser = multer({ storage });

// Generic single upload wrapper factory with error handling & logging
const singleUpload = (fieldName) => (req, res, next) => {
  parser.single(fieldName)(req, res, (err) => {
    if (err) {
      console.error(`Multer/Cloudinary upload error on field ${fieldName}:`, err);
      return res.status(400).json({ status: 'error', message: 'Image upload failed', field: fieldName, details: err.message || String(err) });
    }
    if (req.file) {
      console.log(`Uploaded file meta (${fieldName}):`, {
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
        secure_url: req.file.secure_url,
      });
    } else {
      console.log(`No file received on field ${fieldName}`);
    }
    next();
  });
};

// Specific middleware for books using field 'imageUrl'
const uploadBookImage = singleUpload('imageUrl');

module.exports = { parser, singleUpload, uploadBookImage };

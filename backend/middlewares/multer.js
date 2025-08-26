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

module.exports = parser;

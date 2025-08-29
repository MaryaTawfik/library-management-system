const multer = require('multer');

// Use memory storage to accept file buffers, then upload explicitly via utils/cloudinary
const storage = multer.memoryStorage();

const parser = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB max
});

module.exports = parser;
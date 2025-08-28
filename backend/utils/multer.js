const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "books",       
    allowed_formats: ["jpg", "jpeg", "png"]
  }
});

const parser = multer({ storage });

module.exports = parser;
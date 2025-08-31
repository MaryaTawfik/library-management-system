const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload a file (path, remote url, or base64) to Cloudinary.
 * Returns the full upload result from cloudinary.uploader.upload.
 */
cloudinary.uploadImage = async (filePathOrBuffer, options = {}) => {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary credentials are not configured in environment variables');
  }

  const uploadOptions = Object.assign({ folder: 'library' }, options);

  // cloudinary.uploader.upload accepts a path, remote url or data URI/base64
  const result = await cloudinary.uploader.upload(filePathOrBuffer, uploadOptions);
  return result;
};

module.exports = cloudinary;

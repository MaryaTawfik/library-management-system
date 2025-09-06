const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.uploadImage = async (filePathOrData, options = {}) => {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    throw new Error(
      "Cloudinary credentials are not configured in environment variables"
    );
  }
  const uploadOptions = Object.assign({ folder: "library" }, options);
  return cloudinary.uploader.upload(filePathOrData, uploadOptions);
};

cloudinary.uploadBuffer = async (buffer, mime = "image/jpeg", options = {}) => {
  if (!buffer) throw new Error("No buffer provided");
  const dataUri = `data:${mime};base64,${buffer.toString("base64")}`;
  return cloudinary.uploadImage(dataUri, options);
};

cloudinary.extractUrl = (result) =>
  result?.secure_url || result?.url || result?.path;

module.exports = cloudinary;

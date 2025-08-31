const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    publishedYear: {
      type: Number,
    },
    imageUrl: {
    type: String,
    trim: true,
    default: 'https://via.placeholder.com/150' 
  },


    catagory: {
      type: String,
      required: true,
    },
    totalcopies: {
      type: Number,
    },
    avaliablecopies: Number,
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    pages: {
      type: Number,
      min: 1,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "https://via.placeholder.com/150",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("book", bookSchema);

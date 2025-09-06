const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["borrowed", "pending_return", "returned"],
    default: "borrowed",
  },
  borrowDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
  },

  overdue: { type: Boolean, default: false },
 duedate:{
        type:Date,
        default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    },
  
  reminderSent: { type: Boolean, default: false },
});
module.exports = mongoose.model("Borrow", borrowSchema);

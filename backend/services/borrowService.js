
const Borrow = require("../models/borrow");
const Book = require("../models/book");
const User = require("../models/users");

const bookBorrow = async (bookId, userId) => {
  const member = await User.findById(userId);
  if (!member) throw new Error("User not found");
  if (member.status === "blocked")
    throw new Error("Blocked users cannot borrow books");

  if (
    !member.is_member ||
    (member.expiryDate && member.expiryDate < Date.now())
  ) {
    throw new Error("User must be an active member with valid subscription");
  }

  const book = await Book.findById(bookId);
  if (!book || book.avaliablecopies <= 0) {
    throw new Error("No copies available");
  }
const activeBorrows = await Borrow.countDocuments({
  user: userId,
  status: { $in: ["borrowed", "pending_return"] }, 
});

if (activeBorrows >= 3) {
  throw new Error("User already has 3 active borrows (including pending returns)");
}

  const borrow = await Borrow.create({
    user: userId,
    book: book._id,
    duedate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    status: "borrowed",
  });

  book.avaliablecopies -= 1;
  await book.save();

  member.borrowedBooks = member.borrowedBooks || [];
  member.borrowedBooks.push(book._id);
  await member.save();

  return borrow;
};


const requestReturn = async (borrowId, userId) => {
  const borrow = await Borrow.findById(borrowId);
  if (!borrow) throw new Error("Borrow record not found");

  if (borrow.user.toString() !== userId.toString()) {
    throw new Error("You cannot return a book you didn't borrow");
  }

  if (borrow.status !== "borrowed") {
    throw new Error("Book is not currently borrowed or already pending return");
  }

  
  borrow.status = "pending_return";
  await borrow.save();

  return borrow;
};


const approveReturn = async (borrowId) => {
  const borrow = await Borrow.findById(borrowId).populate("book user");
  if (!borrow) throw new Error("Borrow record not found");

  if (borrow.status !== "pending_return") {
    throw new Error("Book is not pending return");
  }

  
  borrow.status = "returned";
  borrow.returnDate = new Date();
  await borrow.save();


  const book = borrow.book;
  book.avaliablecopies += 1;
  await book.save();

 
  const user = borrow.user;
  if (Array.isArray(user.borrowedBooks)) {
    user.borrowedBooks = user.borrowedBooks.filter(
      (b) => b.toString() !== book._id.toString()
    );
  }
  await user.save();

  return borrow;
};


const rejectReturn = async (borrowId) => {
  const borrow = await Borrow.findById(borrowId);
  if (!borrow) throw new Error("Borrow record not found");

  if (borrow.status !== "pending_return") {
    throw new Error("Book is not pending return");
  }

  borrow.status = "borrowed";
  await borrow.save();

  return borrow;
};

const getBorrowHistory = async (userId) => {
  return await Borrow.find({ user: userId })
    .populate("book", "title author catagory imageUrl")
    .sort({ createdAt: -1 })
    .select("book status borrowDate returnDate duedate _id");
};

const getActiveBorrowsForUser = async (userId) => {
  return await Borrow.find({
    user: userId,
    status: { $in: ["borrowed", "pending_return"] },
  })
    .populate("book", "title author catagory imageUrl")
    .sort({ borrowDate: -1 })
    .select("_id book borrowDate returnDate duedate status");
};

const getAllBorrows = async () => {
  return await Borrow.find()
    .populate("book", "title author imageUrl")
    .populate("user", "firstName lastName email")
    .sort({ createdAt: -1 })
    .select("_id book user borrowDate returnDate duedate status");
};


const getPendingReturns = async () => {
  return await Borrow.find({ status: "pending_return" })
    .populate("book", "title author catagory imageUrl")
    .populate("user", "firstName lastName email")
    .sort({ borrowDate: -1 });
};

const deleteBorrow = async (borrowId) => {
  const borrow = await Borrow.findById(borrowId).populate("book user");
  if (!borrow) throw new Error("Borrow record not found");

  const book = borrow.book;
  if (borrow.status !== "returned" && book) {
    book.avaliablecopies += 1;
    await book.save();
  }

  const user = borrow.user;
  if (user && Array.isArray(user.borrowedBooks)) {
    user.borrowedBooks = user.borrowedBooks.filter(
      (b) => b.toString() !== book._id.toString()
    );
    await user.save();
  }

  await Borrow.findByIdAndDelete(borrowId);

  return { message: "Borrow record deleted successfully" };
};

const getOverdueUsers = async () => {
  const today = new Date();

  const overdueBorrows = await Borrow.find({
    duedate: { $lt: today },
    status: { $in: ["borrowed", "pending_return"] },
  })
    .populate("user", "firstName lastName email")
    .populate("book", "title author");

  const formatted = overdueBorrows.map((borrow) => {
    const overdueDays = Math.floor(
      (today - borrow.duedate) / (1000 * 60 * 60 * 24)
    );

    return {
      user: {
        id: borrow.user?._id,
        name: borrow.user ? `${borrow.user.firstName} ${borrow.user.lastName}` : null,
        email: borrow.user?.email,
      },
      book: {
        id: borrow.book?._id,
        title: borrow.book?.title,
        author: borrow.book?.author,
      },
      borrowId: borrow._id,
      borrowDate: borrow.borrowDate,
      dueDate: borrow.duedate,
      status: borrow.status,
      overdueDays,
    };
  });

 
  return formatted.sort((a, b) => b.overdueDays - a.overdueDays);
};
const getReturnedOverdueUsers = async () => {
  const records = await Borrow.find({
    status: "returned",
    $expr: { $gt: ["$returnDate", "$duedate"] }, // returned after due date
  })
    .populate("book", "title author")
    .populate("user", "firstName lastName email");

  return records.map((borrow) => {
    const overdueDays = Math.floor(
      (borrow.returnDate - borrow.duedate) / (1000 * 60 * 60 * 24)
    );

    return {
      borrowId: borrow._id,
      user: {
        id: borrow.user?._id,
        name: borrow.user
          ? `${borrow.user.firstName} ${borrow.user.lastName}`
          : null,
        email: borrow.user?.email,
      },
      book: {
        id: borrow.book?._id,
        title: borrow.book?.title,
        author: borrow.book?.author,
      },
      borrowDate: borrow.borrowDate,
      dueDate: borrow.duedate,
      returnDate: borrow.returnDate,
      status: borrow.status, 
      overdueDays,
    };
  });
};


module.exports = {
  bookBorrow,
  requestReturn,
  approveReturn,
  rejectReturn,
  getBorrowHistory,
  getAllBorrows,
  getActiveBorrowsForUser,
  getPendingReturns,
  deleteBorrow,
getOverdueUsers,
getReturnedOverdueUsers,
};


const borrowService = require("../services/borrowService");

const borrowBook = async (req, res) => {
  try {
    const borrow = await borrowService.bookBorrow(
      req.params.bookId,
      req.user._id
    );
    res.status(201).json({ message: "Book borrowed successfully", borrow });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};


const requestReturn = async (req, res) => {
  try {
    const { borrowId } = req.params;
    const borrow = await borrowService.requestReturn(borrowId, req.user._id);
    res.status(200).json({ message: "Return requested", borrow });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const approveReturn = async (req, res) => {
  try {
    const { borrowId } = req.params;
    const borrow = await borrowService.approveReturn(borrowId);
    res.status(200).json({ message: "Return approved", borrow });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Admin rejects return
const rejectReturn = async (req, res) => {
  try {
    const { borrowId } = req.params;
    const borrow = await borrowService.rejectReturn(borrowId);
    res.status(200).json({ message: "Return rejected", borrow });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const getBorrowHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await borrowService.getBorrowHistory(userId);

    const userResponse = history.map((borrow) => ({
      borrowId: borrow._id,
      title: borrow.book?.title,
      author: borrow.book?.author,
      category: borrow.book?.catagory,
      image: borrow.book?.imageUrl,
      borrowDate: borrow.borrowDate,
      returnDate: borrow.status === "pending_return" ? null : borrow.returnDate,
      dueDate: borrow.duedate,
      status: borrow.overdue  ? `${borrow.status}_overdue`  : borrow.status,
        overdue: borrow.overdue,   
    
     
    }));

    res.status(200).json({ status: "success", data: userResponse });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getActiveBorrows = async (req, res) => {
  try {
    const userId = req.user._id;
    const activeBorrows = await borrowService.getActiveBorrowsForUser(userId);

    const formatted = activeBorrows.map((b) => ({
      borrowId: b._id,
      book: {
        title: b.book?.title,
        author: b.book?.author,
        catagory: b.book?.catagory,
        imageUrl: b.book?.imageUrl,
      },
      borrowDate: b.borrowDate,
      returnDate: b.returnDate,
      dueDate: b.duedate,
      status: b.overdue ? `${b.status}_overdue` : b.status,
      overdue: b.overdue,
    }));

    res.status(200).json({ status: "success", data: formatted });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getAllBorrows = async (req, res) => {
  try {
    const records = await borrowService.getAllBorrows();

    const adminView = records.map((b) => ({
      borrowId: b._id,
      book: {
        title: b.book?.title,
        author: b.book?.author,
        catagory: b.book?.catagory,
        imageUrl: b.book?.imageUrl,
      },
      user: {
        name: b.user ? `${b.user.firstName} ${b.user.lastName}` : null,
        email: b.user?.email,
      },
      borrowDate: b.borrowDate,
      dueDate: b.duedate,
      returnDate: b.returnDate,
       status: b.overdue ? `${b.status}_overdue` : b.status,
      overdue: b.overdue,
    }));

    res.status(200).json({ status: "success", data: adminView });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getPendingReturns = async (req, res) => {
  try {
    const records = await borrowService.getPendingReturns();

    const formatted = records.map((b) => ({
      borrowId: b._id,
      book: {
        title: b.book?.title,
        author: b.book?.author,
        catagory: b.book?.catagory,
        imageUrl: b.book?.imageUrl,
      },
      user: {
        name: b.user ? `${b.user.firstName} ${b.user.lastName}` : null,
        email: b.user?.email,
      },
      borrowDate: b.borrowDate,
      dueDate: b.duedate,
      status: b.status,
    }));

    res.status(200).json({ status: "success", data: formatted });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBorrow = async (req, res) => {
  try {
    const { borrowId } = req.params;
    const result = await borrowService.deleteBorrow(borrowId);
    res.status(200).json({ status: "success", ...result });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
const getOverdueUsers = async (req, res) => {
  try {
    const data = await borrowService.getOverdueUsers();
    res.status(200).json({ status: "success", data });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};


const getReturnedOverdueUsers = async (req, res) => {
  try {
    const data = await borrowService.getReturnedOverdueUsers();
    res.status(200).json({ status: "success", data });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};



module.exports = {
  borrowBook,
  requestReturn,
  approveReturn,
  rejectReturn,
  getBorrowHistory,
  getAllBorrows,
  getActiveBorrows,
  getPendingReturns,
  deleteBorrow,
  getOverdueUsers,
getReturnedOverdueUsers,
};

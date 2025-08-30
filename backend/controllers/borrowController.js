const borrowService =require('../services/borrowService')

const borrowBook = async(req , res)=>{
    try{
        const borrow = await borrowService.bookBorrow(
            req.params.bookId ,
            // req.params.memberId ,
            req.user._id,
        );
        res.status(201).json({message:"Book borrowed sucessfully" , borrow})

    }catch(err){                                  
        res.status(400).json({err:err.message})
    };
}

const returnBook = async (req, res) => {
  try {
    const {borrowId} =req.params;
    const borrow = await borrowService.returnBook(req.params.borrowId, req.user._id);
    res.status(200).json({
      message: "Returned Successfully",
      borrow,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getBorrowHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const history = await borrowService.getBorrowHistory(userId);

    const userResponsed = history.map(borrow => ({
      title: borrow.book?.title,
      author: borrow.book?.author,
      category: borrow.book?.catagory,
      image: borrow.book?.imageUrl,
      borrowDate: borrow.borrowDate,
      supposedReturnDate: borrow.returnDate,   
      dueDate: borrow.duedate,                 
      status: borrow.status
    }));
    res.status(200).json({ status: "success", data: userResponsed});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getActiveBorrows = async (req, res) => {
  try {
    const userId = req.user._id; // assuming authMiddleware sets req.user

    const activeBorrows = await borrowService.getActiveBorrowsForUser(userId);

    const formatted = activeBorrows.map(b => ({
      book: {
        title: b.book?.title,
        author: b.book?.author,
        category: b.book?.catagory,
        image: b.book?.image
      },
      borrowDate: b.borrowDate,
      supposedReturnDate: b.returnDate,
      dueDate: b.duedate,
      status: b.status
    }));

    res.status(200).json({ status: "success", data: formatted });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};


const getAllBorrows = async (req, res) => {
  try {
    const records = await borrowService.getAllBorrows();

   const adminView = records.map(b => ({
      book: {
        title: b.book?.title,
        author: b.book?.author,
        category: b.book?.catagory,
        image: b.book?.image
      },
      user: {
        name: b.user ? `${b.user.firstName} ${b.user.lastName}` : null,
        email: b.user?.email
      },
      borrowDate: b.borrowDate,
      returnDate: b.returnDate,
      status: b.status
    }));
    res.status(201).json({ status: "success", data: adminView });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports= {borrowBook, returnBook ,getBorrowHistory ,getAllBorrows , getActiveBorrows }
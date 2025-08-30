const Borrow =require('../models/borrow')
const Book =require('../models/book')
const User =require('../models/users')

const bookBorrow = async(bookId , userId )=>{
    
    
    const member=await User.findById(userId);
    // if(!member || !member.memberActive){
    //     throw new Error("User must be an acitve member")
     if (!member) {
    throw new Error("User not found");
  }
  if (member.status === "blocked") {
    throw new Error("Blocked users cannot borrow books");
  }

     if (!member.is_member || (member.expiryDate && member.expiryDate < Date.now())) {
    throw new Error("User must be an active member with valid subscription");
  }
    const book=await Book.findById(bookId)
    if(!book || !book.copiesAvailable<=0){
        throw new Error("No copies available")
    }
    const activeBorrows = await Borrow.countDocuments({ user : userId, status: "borrowed" });
    if (activeBorrows >= 3) {
        throw new Error("User already has 3 active borrows");
    }

    //borrow records
    const borrow = await Borrow.create({
        user:userId ,
        book:book._id,
        duedate:new Date(Date.now()+14*24*60*60*1000),
        
        status:"borrowed"
    })


  book.avaliablecopies -= 1;
  await book.save();

  member.borrowedBooks = member.borrowedBooks || [];
  member.borrowedBooks.push(book._id);
  await member.save();

    return borrow

}

const returnBook = async (borrowId) => {
  // find borrow record
  const borrow = await Borrow.findById(borrowId).populate("book user");
  if (!borrow) throw new Error("Borrow record not found");

  // check if already returned
  if (borrow.status === "returned") {
    throw new Error("Book already returned");
  }

  // mark as returned
  borrow.status = "returned";
  borrow.returnDate = new Date();
  await borrow.save();

  // increase book copies
  const book = borrow.book;
  book.copiesAvailable += 1;
  await book.save();

  // remove from user’s borrowedBooks
  const user = borrow.user;
  if (!user) throw new Error("User not found in borrow record");
  if (Array.isArray(user.borrowedBooks)) {
  user.borrowedBooks = user.borrowedBooks.filter(
    (b) => b.toString() !== book._id.toString()
  );
}
  await user.save();
  return borrow;
}

const getBorrowHistory = async (userId) => {
  return await Borrow.find({ user: userId })
    .populate("book", "title author catagory" )
    .sort({ createdAt: -1 });
};

const getActiveBorrowsForUser = async (userId) => {
  return await Borrow.find({ user: userId, status: "borrowed" })
    .populate("book", "title author catagory imageUrl") // include book details
    .sort({ borrowDate: -1 });
};

const getAllBorrows = async () => {
  return await Borrow.find()
    .populate("book", "title author")
    .populate("user", "firstName lastName email")
    .sort({ createdAt: -1 });
};

const deleteBorrow = async (borrowId) => {
  const borrow = await Borrow.findById(borrowId).populate("book user");

  if (!borrow) {
    throw new Error("Borrow record not found");
  }

  // Restore book copies if not already returned
  const book = borrow.book;
  if (borrow.status !== "returned" && book) {
    book.copiesAvailable += 1;
    await book.save();
  }

  // Remove borrow reference from user
  const user = borrow.user;
  if (user && Array.isArray(user.borrowedBooks)) {
    user.borrowedBooks = user.borrowedBooks.filter(
      (b) => b.toString() !== book._id.toString()
    );
    await user.save();
  }

  // Finally, delete the borrow record
  await Borrow.findByIdAndDelete(borrowId);

  return { message: "Borrow record deleted successfully" };
};


module.exports = {bookBorrow , returnBook , getBorrowHistory, getAllBorrows , getActiveBorrowsForUser,deleteBorrow }
const mongoose= require("mongoose")

const borrowSchema=new mongoose.Schema({
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book",
        required:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:["borrowed" , "returned"],
        default:"borrowed"


    },
    borrowDate:{
        type:Date,
        default:Date.now
    },
    returnDate:{
        type:Date
        
    },
    duedate:{
        type:Date
    },
    borrowedBooks: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  }


})
module.exports = mongoose.model("Borrow", borrowSchema);
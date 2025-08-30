const mongoose= require("mongoose")

const bookSchema=new mongoose.Schema({
    title:{
        type:String , 
        required:true , 
        trim:true},
    author:{
        type:String,
        required:true,
        trim:true
    },
    publishedYear:{
    type:Number},
    
    catagory:{
        type:String,
        required:true
    },
    totalcopies:{
        type:Number,
    },
    avaliablecopies:Number,
    isbn:{
        type:String,
        required:true , 
        unique:true
    },
    pages:{
        type:Number,
        min:1
    },
    description:{
        type:String,
        trim:true,
        maxlength:2000
    },
    imageUrl: {

    type: String,
    trim: true,
    default: 'https://img.freepik.com/premium-photo/blank-hardcover-book-mockup-minimalist-surface-mockup-template_1143726-2471.jpg' 
  },

// borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'book' }],

}, { timestamps: true });
    
  
//   imageId: {
//     type: String 
//   }






module.exports = mongoose.model('book' , bookSchema)
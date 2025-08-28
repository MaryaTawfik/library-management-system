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
    type: String 
  },
  imageId: {
    type: String 
  }


}, {timestamps:true})


module.exports = mongoose.model('book' , bookSchema)
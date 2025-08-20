const mongoose=require('mongoose')
const usersSchema= new mongoose.Schema({
    userID: {type:string, reqired:true},
    firstName: {type:string, minlenght:3, max:20,reqired:true,trim:true},
    lastName: {type:string, minlenght:3, max:20,reqired:true,trim:true},
    email:{type:string, reqired:true, unique:true, lowercase:true, trim:true},
    password:{type:string, reqired:true,minlenghtlength:6},
    department:{type:string,trim:true},
    phoneNumber:{type:Number,reqired:true},
    acadamicYear:{type:string,trim:true,enum:['1st','2nd','3rd','4th','5th']},
    gender:{type:string,trim:true,enum:['male','female']},
    role:{type:string,trim:true,enum:['Admin','student']},
    status:{type:string,trim:true,enum:['blocked','active']},
    is_member:{type:Boolean, required:true},
    expirDate:{type:Date,required:true }
    

},{ timestamps: true })
module.exports=mongoose.model("users", usersSchema)
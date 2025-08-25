const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()

const connectDB=async function(){
    try{
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/library-system')
        console.log("connected")
    }
    catch(error){
        console.error('connection error:',error)
    }
}
module.exports = connectDB;
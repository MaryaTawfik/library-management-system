const express=require('express')
const cors=require('cors')
const dotenv=require("dotenv")
const connectDB=require('./config/database')
dotenv.config()
const app=express();
app.use(cors());
app.use(express.json());
connectDB();
const port= process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`${process.env.APP_NAME} is running on  port ${port}`)
})


const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const connectDB = require('./config/database.js');
const bookRoutes = require('./routes/bookRoutes')
const auth_route = require('./routes/auth_routes')
dotenv.config()

const app=express();

app.use(cors());
app.use(express.json());

connectDB();
app.use('/books' , bookRoutes);
app.use('/auth', auth_route);

app.get('/' , (req,res)=>{
    res.send(`${process.env.APP_NAME} is running`);
});

const port= process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`${process.env.APP_NAME} is running on  port  http://localhost:${port}`)
})

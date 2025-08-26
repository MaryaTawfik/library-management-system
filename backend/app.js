
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const connectDB = require('./config/database.js');
const bookRoutes = require('./routes/bookRoutes')
const auth_route = require('./routes/auth_routes')
const seedAdmin = require('./utils/seeAdmin')
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());


connectDB()
    .then(() => {
        
        try {
            seedAdmin();
        } catch (e) {
            console.error('seedAdmin failed:', e && e.message ? e.message : e);
        }

       
        app.use('/books', bookRoutes);
        app.use('/auth', auth_route);
        app.use('/payments', paymentRoutes);
        app.use('/admin', adminRoutes);
    })
    .catch((err) => {
        console.error('Could not connect to DB, routes not mounted:', err && err.message ? err.message : err);
    });

app.get('/' , (req,res)=>{
    res.send(`${process.env.APP_NAME} is running`);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`${process.env.APP_NAME || 'Application'} is running on  port  http://localhost:${port}`);
});

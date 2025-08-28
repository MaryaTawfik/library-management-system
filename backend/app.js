const dotenv = require("dotenv");
dotenv.config();  // MUST be first

// Debug: check if JWT_SECRET is loaded
console.log("JWT_SECRET:", process.env.JWT_SECRET);  // <-- Add this line


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database.js');
const bookRoutes = require('./routes/bookRoutes')
const auth_route = require('./routes/auth_routes')
const seedAdmin = require('./utils/seeAdmin')
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');


if (!process.env.JWT_SECRET) {
    console.warn('Warning: JWT_SECRET is not set. Authentication will fail.');
}


// Import other modules
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database.js');
const bookRoutes = require('./routes/bookRoutes');
const auth_route = require('./routes/auth_routes');
const seedAdmin = require('./utils/seeAdmin');

// Create express app

const app = express();

// Middleware
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

// DB and routes
seedAdmin();
connectDB();
app.use('/books', bookRoutes);
app.use('/auth', auth_route);


app.get('/', (req,res) => {
    res.send(`${process.env.APP_NAME} is running`);
});



const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`${process.env.APP_NAME || 'Application'} is running on  port  http://localhost:${port}`);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`${process.env.APP_NAME} is running on port http://localhost:${port}`);

});

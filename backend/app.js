const dotenv = require("dotenv");
dotenv.config();  // MUST be first

// Debug: check if JWT_SECRET is loaded
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database.js');
const bookRoutes = require('./routes/bookRoutes');
const auth_route = require('./routes/auth_routes');
const borrowRoute = require('./routes/borrowRoute');
const seedAdmin = require('./utils/seeAdmin');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middlewares/errorHandler');

if (!process.env.JWT_SECRET) {
    console.warn('Warning: JWT_SECRET is not set. Authentication will fail.');
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB first, then seed and mount routes
connectDB()
    .then(() => {
        try {
            seedAdmin();
        } catch (e) {
            console.error('seedAdmin failed:', e.message || e);
        }

        // Mount routes
        app.use('/books', bookRoutes);
        app.use('/auth', auth_route);
        app.use('/payments', paymentRoutes);
        app.use('/admin', adminRoutes);
        app.use('/api', borrowRoute);

           require("./utils/cronJob");
    })
    .catch((err) => {
        console.error('Could not connect to DB, routes not mounted:', err.message || err);
    });

// Root route
app.get('/', (req,res) => {
    res.send(`${process.env.APP_NAME} is running`);
});

// Error handler
app.use(errorHandler);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`${process.env.APP_NAME || 'Application'} is running on port http://localhost:${port}`);
});

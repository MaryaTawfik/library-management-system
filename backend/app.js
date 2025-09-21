const dotenv = require("dotenv");
dotenv.config(); 


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


app.use(cors());

app.use(express.json());


connectDB()
    .then(() => {
        try {
            seedAdmin();
        } catch (e) {
            console.error('seedAdmin failed:', e.message || e);
        }

     
          app.use('/books', bookRoutes);
          app.use('/auth', auth_route);
          app.use('/payments', paymentRoutes);
          app.use('/admin', adminRoutes);
          app.use('/api', borrowRoute);

          console.log('Routes mounted: /books, /auth, /payments, /admin, /api');

              require("./utils/cronJob");
    })
    .catch((err) => {
        console.error('Could not connect to DB, routes not mounted:', err.message || err);
    });


app.get('/', (req,res) => {
    res.send(`${process.env.APP_NAME} is running`);
});

// Lightweight health endpoint to help diagnose deployed routing/DB issues
app.get('/health', async (req, res) => {
    res.json({
        ok: true,
        appName: process.env.APP_NAME || 'Application',
        env: process.env.NODE_ENV || 'development',
        backendUrl: process.env.BACKEND_URL || null,
        baseUrl: process.env.BASE_URL || null,
        message: 'If /auth routes are mounted you should see /auth/verify available.'
    });
});


app.use(errorHandler);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`${process.env.APP_NAME || 'Application'} is running on port http://localhost:${port}`);
});

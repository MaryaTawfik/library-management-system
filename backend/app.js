const dotenv = require("dotenv");
dotenv.config();  // MUST be first

// Debug: check if JWT_SECRET is loaded
console.log("JWT_SECRET:", process.env.JWT_SECRET);  // <-- Add this line

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

// DB and routes
seedAdmin();
connectDB();
app.use('/books', bookRoutes);
app.use('/auth', auth_route);

app.get('/', (req,res) => {
    res.send(`${process.env.APP_NAME} is running`);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`${process.env.APP_NAME} is running on port http://localhost:${port}`);
});


const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const connectDB = require('./config/database.js');
const bookRoutes = require('./routes/bookRoutes')
const auth_route = require('./routes/auth_routes')
const seedAdmin = require('./utils/seeAdmin')
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

// Connect to DB first, then run seed and mount routes.
connectDB()
    .then(() => {
        // only seed after DB is connected
        try {
            seedAdmin();
        } catch (e) {
            console.error('seedAdmin failed:', e && e.message ? e.message : e);
        }

        // mount routes after DB connected (optional)
        app.use('/books', bookRoutes);
        app.use('/auth', auth_route);
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

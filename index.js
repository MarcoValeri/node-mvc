// Import modules
const express = require('express');
const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

// Connect to MySQL db
const hostname = process.env.HOST;
const connectDB = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: ''
});

connectDB.connect(err => {
    if (err) throw err;
    console.log(`Connected`);
})

// Set view
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/routes'));
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log(`Server has started at port: ${PORT}`));

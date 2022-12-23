const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Call the view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Controllers
const errorsController = require('./controllers/error');
const db = require('./util/database');

// Parse npm install --save body-parser
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 error page
app.use(errorsController.get404);

app.listen(3000);
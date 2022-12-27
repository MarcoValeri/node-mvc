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
const sequelize = require('./util/database');

// Parse npm install --save body-parser
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 error page
app.use(errorsController.get404);

// Sequelize
sequelize
    .sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

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

// Modules
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Product = require('./models/product');
const User = require('./models/user');

// Parse npm install --save body-parser
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 error page
app.use(errorsController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// Sequelize
sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({name: 'Max', email: 'test@test.com' });
        }
        return user;
    })
    .then(user => {
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');



const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true })); // Parses form data
// Session configuration
const sessionMiddleware = session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true for HTTPS connections
});

app.use(sessionMiddleware);

// Mock product data
const products = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 30 }
];

// Route to display product list
app.get('/', (req, res) => {
  res.render('index', { products });
});

// Route to add product to cart (using POST request)
app.post('/cart/add', (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return res.status(400).send('Invalid product ID');
  }

  // Access shopping cart from session
  let cart = req.session.cart || [];
  cart.push(product);
  req.session.cart = cart;

  res.send('Product added to cart!');
});

// Route to display cart contents (using GET request)
app.get('/cart', (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((acc, product) => acc + product.price, 0);

  res.render('cart', { cart, total });
});

// Error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal server error');
});

// Assumes you have basic templating setup (e.g., using EJS)
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

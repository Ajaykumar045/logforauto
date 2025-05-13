const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');
const cors = require('cors'); // Enable cross-origin requests
const stripe = require('stripe')('your-stripe-secret-key'); // Replace with your Stripe secret key
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Use a file-based SQLite database
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the SQLite database.');
});

// Initialize database tables
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT, role TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, img TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS cart (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, product_id INTEGER, quantity INTEGER)');
  db.run('INSERT INTO products (name, price, img) VALUES ("Alloy Wheels", 1199, "vehicle_images/alloy-3.avif")');
  db.run('INSERT INTO products (name, price, img) VALUES ("Brake Pads", 899, "vehicle_images/breake-2.avif")');
});

// User registration
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.run(query, [email, hashedPassword], function (err) {
    if (err) {
      console.error('Error registering user:', err);
      return res.status(500).send('Error registering user');
    }
    res.status(201).send('User registered successfully');
  });
});

// User login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.get(query, [email], async (err, user) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).send('Error logging in');
    }

    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid email or password');
    }

    res.status(200).json({ message: 'Login successful', userId: user.id });
  });
});

// Fetch products
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).send('Error fetching products');
    }
    res.status(200).json(rows);
  });
});

// Add product to cart
app.post('/api/cart', (req, res) => {
  const { userId, productId, quantity } = req.body;

  const query = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)';
  db.run(query, [userId, productId, quantity], function (err) {
    if (err) {
      console.error('Error adding to cart:', err);
      return res.status(500).send('Error adding to cart');
    }
    res.status(201).send('Product added to cart');
  });
});

// Fetch cart items
app.get('/api/cart/:userId', (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT cart.id, products.name, products.price, products.img, cart.quantity
    FROM cart
    JOIN products ON cart.product_id = products.id
    WHERE cart.user_id = ?
  `;
  db.all(query, [userId], (err, rows) => {
    if (err) {
      console.error('Error fetching cart items:', err);
      return res.status(500).send('Error fetching cart items');
    }
    res.status(200).json(rows);
  });
});

// Create a Stripe checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  const { userId } = req.body;

  // Fetch cart items for the user
  const query = `
    SELECT products.name, products.price, cart.quantity
    FROM cart
    JOIN products ON cart.product_id = products.id
    WHERE cart.user_id = ?
  `;
  db.all(query, [userId], async (err, rows) => {
    if (err) {
      console.error('Error fetching cart items:', err);
      return res.status(500).send('Error fetching cart items');
    }

    // Map cart items to Stripe line items
    const lineItems = rows.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    try {
      // Create a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success.html', // Redirect after successful payment
        cancel_url: 'http://localhost:3000/cancel.html',  // Redirect if payment is canceled
      });

      res.status(200).json({ url: session.url });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).send('Error creating checkout session');
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

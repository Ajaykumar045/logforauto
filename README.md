# 🚗 Automobile Catalogue

Welcome to the Automobile Catalogue project! This project showcases a variety of cars and bikes, allowing users to browse, view details, and add items to their cart.

## 📜 Table of Contents

- [File Structure](#file-structure)
- [Explanation of Each Script](#explanation-of-each-script)
- [How to Run the Website](#how-to-run-the-website)
- [Creator](#creator)
- [References](#references)

## 📂 File Structure

- `public/`
  - `automobile.html`
  - `cart.html`
  - `details.html`
  - `main.js`
  - `style.css`
- `requirements.txt`
- `PROCEDURE.md`
- `README.md`

## 📜 Explanation of Each Script

### `automobile.html`

This is the main page of the website. It includes sections for the home, cars, about, parts, and blog. Users can browse through different vehicles and parts, and navigate to other pages.

### `cart.html`

This page displays the shopping cart. It shows the items added to the cart, allows users to adjust quantities, apply discount codes, and proceed to payment.

### `details.html`

This page provides detailed information about a selected product. It is a placeholder for now and can be customized to display specific product details.

### `main.js`

This JavaScript file handles the functionality of the "Buy Now" buttons and the cart page. It stores product details in `localStorage` and displays them on the cart page.

### `style.css`

This CSS file contains the styles for the website. It ensures that the website looks visually appealing and is responsive across different devices.

### `requirements.txt`

This file lists the dependencies required for the project. It includes:

```
express
body-parser
sqlite3
```

## 🛠️ How to Run the Website

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/logforauto.git
   cd logforauto
   ```

2. **Install Node.js and NPM**:
   Make sure you have Node.js and npm installed. You can download and install them from [Node.js official website](https://nodejs.org/).

3. **Install Node.js Dependencies**:
   Navigate to the project directory and install the required Node.js dependencies:
   ```bash
   npm install
   ```

4. **Run the Node.js Server**:
   Create a simple Node.js server to handle API requests and interact with SQLite:
   ```javascript
   const express = require('express');
   const bodyParser = require('body-parser');
   const sqlite3 = require('sqlite3').verbose();

   const app = express();
   const db = new sqlite3.Database(':memory:');

   app.use(bodyParser.json());

   db.serialize(() => {
       db.run("CREATE TABLE products (name TEXT, price TEXT, img TEXT)");
   });

   app.get('/api/products', (req, res) => {
       db.all("SELECT * FROM products", [], (err, rows) => {
           if (err) {
               throw err;
           }
           res.json(rows);
       });
   });

   app.post('/api/products', (req, res) => {
       const { name, price, img } = req.body;
       db.run(`INSERT INTO products (name, price, img) VALUES (?, ?, ?)`, [name, price, img], function(err) {
           if (err) {
               return console.log(err.message);
           }
           res.json({ id: this.lastID });
       });
   });

   app.listen(3000, () => {
       console.log('Node.js server running on port 3000');
   });
   ```

5. **Access the Website**:
   Open your web browser and go to `http://127.0.0.1:3000` to view the website.

## 👨‍💻 Creator

Ajay Kumar Gupta  
MCA 2nd Year Student  
Maharana Pratap Engineering College

## 📚 References

- [Bootstrap](https://getbootstrap.com/)
- [MDB UI Kit](https://mdbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)

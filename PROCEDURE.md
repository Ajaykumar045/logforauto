# 🚗 Automobile Catalogue Website Setup Guide

Welcome to the Automobile Catalogue project! This guide will help you understand the purpose of each script and how to run the website. Let's get started! 🚀

## 📂 File Structure

- `public/`
  - `automobile.html`
  - `cart.html`
  - `details.html`
  - `main.js`
  - `style.css`
- `requirements.txt`

## 📜 Explanation of Each Script

### `automobile.html`

This is the main page of the website. It includes sections for the home, cars, about, parts, and blog. Users can browse through different vehicles and parts, and navigate to other pages.

### `cart.html`

This page displays the shopping cart. It shows the items added to the cart, allows users to adjust quantities, apply discount codes, and proceed to payment.

### `details.html`

This page provides detailed information about a selected product. It is a placeholder for now and can be customized to display specific product details.

### `main.js`

This JavaScript file handles the functionality of the "Buy Now" buttons and the cart page. It stores product details in `localStorage` and displays them on the cart page.

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const buyNowButtons = document.querySelectorAll('.buy-now');
    buyNowButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                name: button.getAttribute('data-name'),
                price: button.getAttribute('data-price'),
                img: button.getAttribute('data-img')
            };
            localStorage.setItem('cartItem', JSON.stringify(product));
            window.location.href = 'cart.html';
        });
    });

    const cartItem = JSON.parse(localStorage.getItem('cartItem'));
    if (cartItem) {
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = `
            <div class="card rounded-3 mb-4">
                <div class="card-body p-4">
                    <div class="row d-flex justify-content-between align-items-center">
                        <div class="col-md-2 col-lg-2 col-xl-2">
                            <img src="${cartItem.img}" class="img-fluid rounded-3" alt="${cartItem.name}">
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-3">
                            <p class="lead fw-normal mb-2">${cartItem.name}</p>
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input id="form1" min="0" name="quantity" value="1" type="number" class="form-control form-control-sm" />
                            <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h5 class="mb-0">₹${cartItem.price}</h5>
                        </div>
                        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                            <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
});
```

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

Enjoy exploring the Automobile Catalogue! 🚗✨

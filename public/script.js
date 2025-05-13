// Register user
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.text();
  if (response.ok) {
    alert('Registration successful!');
    location.reload();
  } else {
    alert(result);
  }
});

// Login user
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  if (response.ok) {
    alert('Login successful!');
    localStorage.setItem('userId', result.userId); // Save user ID for session
    window.location.href = 'automobile.html';
  } else {
    alert(result.message);
  }
});

// Fetch products and display them
async function fetchProducts() {
  const response = await fetch('/api/products');
  const products = await response.json();

  const container = document.querySelector('.cars-container');
  container.innerHTML = '';
  products.forEach((product) => {
    const productHTML = `
      <div class="box">
        <img src="${product.img}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>Price: ₹${product.price}</p>
        <button class="btn buy-now" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-img="${product.img}">Buy Now</button>
      </div>
    `;
    container.innerHTML += productHTML;
  });

  document.querySelectorAll('.buy-now').forEach((button) => {
    button.addEventListener('click', (e) => {
      const productId = e.target.getAttribute('data-id');
      addToCart(productId);
    });
  });
}

// Add product to cart
async function addToCart(productId) {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert('Please log in to add items to your cart.');
    return;
  }

  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, productId, quantity: 1 }),
  });

  if (response.ok) {
    alert('Product added to cart!');
  } else {
    alert('Failed to add product to cart.');
  }
}

// Fetch cart items
async function fetchCartItems() {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert('Please log in to view your cart.');
    return;
  }

  const response = await fetch(`/api/cart/${userId}`);
  const cartItems = await response.json();

  const container = document.querySelector('.cart-items');
  container.innerHTML = '';
  cartItems.forEach((item) => {
    const cartItemHTML = `
      <div class="card rounded-3 mb-4">
        <div class="card-body p-4">
          <div class="row d-flex justify-content-between align-items-center">
            <div class="col-md-2 col-lg-2 col-xl-2">
              <img src="${item.img}" class="img-fluid rounded-3" alt="${item.name}">
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
              <p class="lead fw-normal mb-2">${item.name}</p>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
              <input type="number" value="${item.quantity}" class="form-control form-control-sm" />
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
              <h5 class="mb-0">₹${item.price}</h5>
            </div>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += cartItemHTML;
  });
}

// Handle "Buy Now" button click
async function handleBuyNow() {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert('Please log in to proceed with the purchase.');
    return;
  }

  try {
    // Create a checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    const result = await response.json();
    if (response.ok) {
      // Redirect to Stripe checkout page
      window.location.href = result.url;
    } else {
      alert('Failed to create checkout session.');
    }
  } catch (error) {
    console.error('Error during checkout:', error);
    alert('An error occurred. Please try again.');
  }
}

// Attach event listener to the "Buy Now" button
document.querySelector('.buy-now').addEventListener('click', handleBuyNow);

function login() {
  document.getElementById('login').style.left = "4px";
  document.getElementById('register').style.right = "-520px";
  document.getElementById('loginBtn').className += " white-btn";
  document.getElementById('registerBtn').className = "btn";
  document.getElementById('login').style.opacity = 1;
  document.getElementById('register').style.opacity = 0;
}

function register() {
  document.getElementById('login').style.left = "-510px";
  document.getElementById('register').style.right = "5px";
  document.getElementById('loginBtn').className = "btn";
  document.getElementById('registerBtn').className += " white-btn";
  document.getElementById('login').style.opacity = 0;
  document.getElementById('register').style.opacity = 1;
}

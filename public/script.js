document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('registerRole').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, role })
    });

    const result = await response.text();
    if (response.ok) {
        alert('Registration successful!');
        window.location.href = 'login.html'; // Redirect to login page or any other page
    } else {
        alert(result);
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.text();
    if (response.ok) {
        alert('Login successful!');
        window.location.href = 'automobile.html'; // Redirect to automobile.html
    } else {
        alert(result);
    }
});

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

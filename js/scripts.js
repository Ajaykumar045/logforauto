// This file contains all the JavaScript code previously inlined in the HTML file

function myMenuFunction() {
    var i = document.getElementById("navMenu");
    if(i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
}

var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");
var x = document.getElementById("login");
var y = document.getElementById("register");

function login() {
    x.style.left = "4px";
    y.style.right = "-520px";
    a.className += " white-btn";
    b.className = "btn";
    x.style.opacity = 1;
    y.style.opacity = 0;
}

function register() {
    x.style.left = "-510px";
    y.style.right = "5px";
    a.className = "btn";
    b.className += " white-btn";
    x.style.opacity = 0;
    y.style.opacity = 1;
}

function authenticateLogin() {
    var username = document.querySelector("#login .input-field[type='text']").value;
    var password = document.querySelector("#login .input-field[type='password']").value;

    // Simple authentication check
    if(username === "admin" && password === "password123") {
        alert("Login successful!");
        window.location.href = "automobile.html"; // Redirect to automobile.html
    } else {
        alert("Invalid credentials. Please try again.");
    }
}

document.querySelector("#login .submit").addEventListener("click", function(event) {
    event.preventDefault();
    authenticateLogin();
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    if (users.some(user => user.email === email)) {
        alert('Email already registered! Please use a different email.');
        return;
    }

    // Add new user
    users.push({
        username,
        email,
        password // In a real application, you should hash the password
    });

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Set current user
    localStorage.setItem('currentUser', JSON.stringify({ username, email }));

    alert('Registration successful!');
    window.location.href = '../index.html'; // Redirect to home page
}); 
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find user
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Store current user info
        localStorage.setItem('currentUser', JSON.stringify({
            username: user.username,
            email: user.email
        }));

        alert('Login successful!');
        window.location.href = '../index.html'; // Redirect to home page
    } else {
        alert('Invalid email or password!');
    }
}); 
const endpointUser = `http://localhost:3000/users`;

// Register user (default role: user)
export async function registerUser(userData) {
    if (!userData.email || !userData.password)
        throw new Error('Email and password are required');

    // Check if user already exists
    const existingUser = await fetch(`${endpointUser}?email=${userData.email}`);
    const user = await existingUser.json();
    if (user.length > 0) {
        throw new Error('User already exists');
    }

    // Save user with role "user"
    const userSave = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: 'user'
    };
    const response = await fetch(endpointUser, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userSave)
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

// Login user
export async function loginUser(email, password) {
    const response = await fetch(`${endpointUser}?email=${email}&password=${password}`);
    const users = await response.json();

    if (users.length === 1) {
        // Save the full user object in localStorage
        localStorage.setItem('user', JSON.stringify(users[0]));
        return users[0];
    } else {
        throw new Error('Invalid email or password');
    }
}

// Logout
export function logoutUser() {
    localStorage.removeItem('user');
}

// Get current user (full object)
export function getCurrentUser() {
    const user = localStorage.getItem('user');
    if (!user) return null;
    return JSON.parse(user);
}

// Is authenticated?
export function isAuthenticated() {
    return localStorage.getItem('user') !== null;
}

// Is admin?
export function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}
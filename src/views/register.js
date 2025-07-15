import { registerUser } from "../js/auth.js";
import { navigate } from '../router.js';

export function register() {
    const app = document.getElementById('App');
    app.innerHTML = `
    <section id="register">
        <div class="register-container">
            <h2>Create Account</h2>
            <form id="register-form">
                <input type="text" id="register-name" placeholder="Full Name" required />
                <input type="text" id="register-identity" placeholder="Identity" required />
                <input type="tel" id="register-phone" placeholder="Phone Number" required />
                <input type="text" id="register-address" placeholder="Address" required />
                <input type="email" id="register-email" placeholder="Email" required />
                <input type="password" id="register-password" placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
            <p class="register-switch">
                Already have an account? <a href="#" id="register-go-login">Sign In</a>
            </p>
            <p id="error-message" style="color: red; display: none; margin-top: 10px;"></p>
            <p id="success-message" style="color: green; display: none; margin-top: 10px;"></p>
        </div>
    </section>`;

    const registerForm = document.getElementById('register-form');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const goLogin = document.getElementById('register-go-login');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';

        const name = document.getElementById('register-name').value;
        const identity = document.getElementById('register-identity').value;
        const phone = document.getElementById('register-phone').value;
        const address = document.getElementById('register-address').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        try {
            const userData = { name, identity, phone, address, email, password };
            await registerUser(userData);
            successMessage.textContent = 'Registration successful. You can now sign in.';
            successMessage.style.display = 'block';
            registerForm.reset();
        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.style.display = 'block';
        }
    });

    goLogin.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('/login');
    });
}
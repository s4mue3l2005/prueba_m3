import { loginUser } from "../js/auth.js";
import { navigate } from '../router.js';

export function login() {
    const app = document.getElementById('App');
    app.innerHTML = `
    <section id="login">
        <div class="login-container">
            <h2>Sign In</h2>
            <form id="login-form">
                <input type="email" id="login-email" placeholder="Email" required />
                <input type="password" id="login-password" placeholder="Password" required />
                <button type="submit">Sign In</button>
            </form>
            <p class="login-switch">
                Don't have an account? <a href="#" id="login-go-register">Register here</a>
            </p>
            <p id="error-message" style="color: red; display: none; margin-top: 10px;"></p>
        </div>
    </section>`;

    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const goRegister = document.getElementById('login-go-register');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        errorMessage.style.display = 'none';

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            await loginUser(email, password);
            window.location.pathname = '/dashboard';
        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.style.display = 'block';
        }
    });

    // Optional: handle navigation to register view
    goRegister.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('/register');
    });
}
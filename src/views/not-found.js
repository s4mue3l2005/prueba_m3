import { isAuthenticated } from "../js/auth.js";

export function notFound() {
    const app = document.getElementById('App');
    app.innerHTML = `<section id="not-found">
        <div class="not-found-container">
            <h2>Page Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <p><a href="/" id="go-home">Go to Home</a></p>
        </div>
    </section>`;

    const goHomeLink = document.getElementById('go-home');
    goHomeLink.addEventListener('click', (event) => {
        event.preventDefault();
        // If authenticated, go to dashboard, else go to home
        if (isAuthenticated()) {
            window.location.pathname = '/dashboard';
        } else {
            window.location.pathname = '/';
        }
    });
}
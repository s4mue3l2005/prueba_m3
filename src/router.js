import { login } from './views/login.js';
import { notFound } from './views/not-found.js';
import { register } from './views/register.js';
import { dashboard } from './views/dashboard.js';
import { isAuthenticated } from './js/auth.js';

const routes = {
  '/': dashboard,
  '/dashboard': dashboard,
  '/login': login,
  '/register': register,
  '/not-found': notFound
};

export function renderView() {
  const path = window.location.pathname === '/' ? '/dashboard' : window.location.pathname;
  const isAuth = isAuthenticated();

  // Route protection logic
  if (!isAuth && (path === '/dashboard' || path === '/dashboard/events/create' || path === '/dashboard/events/edit')) {
    window.history.replaceState({}, '', '/login');
    login();
    return;
  }

  // Prevent logged-in users from accessing login/register
  if (isAuth && (path === '/login' || path === '/register')) {
    window.history.replaceState({}, '', '/dashboard');
    dashboard();
    return;
  }

  // Find and render the route, or show not found
  const view = routes[path] || notFound;
  view();
}

// Listen for navigation
window.addEventListener('popstate', renderView);

// SPA navigation helper
export function navigate(path) {
    window.history.pushState({}, '', path);
    renderView();
}

// Initial render
renderView();

import { getCurrentUser, logoutUser, isAdmin } from "../js/auth.js";
import { getEvents, deleteEvent, registerUserToEvent, getUsers } from "../js/api.js";

export async function dashboard() {
    const app = document.getElementById('App');
    const user = getCurrentUser();

    if (!user) {
        window.location.pathname = '/login';
        return;
    }

    app.innerHTML = `
    <section id="dashboard">
        <div class="dashboard-header">
            <h2 id="dashboard-title">My Dashboard</h2>
            <div>
                ${isAdmin() ? `
                    <button id="add-event-btn">Create Event</button>
                ` : ''}
                <button id="logout-btn">Log Out</button>
            </div>
        </div>
        <div id="dashboard-content"></div>
    </section>
    `;

    document.getElementById('logout-btn').addEventListener('click', () => {
        logoutUser();
        window.location.pathname = '/login';
    });

    if (isAdmin()) {
        renderAdminDashboard();
        document.getElementById('add-event-btn').addEventListener('click', () => {
            window.location.pathname = '/dashboard/events/create';
        });
    } else {
        renderUserDashboard(user);
    }
}

// Admin dashboard: show all events and users
async function renderAdminDashboard() {
    const content = document.getElementById('dashboard-content');
    const events = await getEvents();
    const users = await getUsers();

    content.innerHTML = `
        <h3>Event Management</h3>
        <div id="events-list" class="card-container"></div>
        <h3>User Management</h3>
        <div id="users-list" class="card-container"></div>
    `;

    // Render events
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = events.map(ev => `
        <div class="card">
            <h4>${ev.title}</h4>
            <p>${ev.description}</p>
            <p><b>Date:</b> ${ev.date}</p>
            <p><b>Location:</b> ${ev.location}</p>
            <p><b>Capacity:</b> ${ev.attendees.length}/${ev.capacity}</p>
            <button onclick="window.location.pathname='/dashboard/events/edit?id=${ev.id}'">Edit</button>
            <button class="delete-event-btn" data-id="${ev.id}">Delete</button>
        </div>
    `).join('');

    // Attach delete event listeners
    eventsList.querySelectorAll('.delete-event-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = btn.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this event?')) {
                await deleteEvent(id);
                renderAdminDashboard();
            }
        });
    });

    // Render users
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = users.map(u => `
        <div class="card">
            <h4>${u.name}</h4>
            <p>${u.email}</p>
            <p>Role: ${u.role}</p>
        </div>
    `).join('');
}

// User dashboard: show all events and allow registration
async function renderUserDashboard(user) {
    const content = document.getElementById('dashboard-content');
    const events = await getEvents();

    content.innerHTML = `
        <h3>Available Events</h3>
        <div id="events-list" class="card-container"></div>
        <h3>My Registrations</h3>
        <div id="my-events-list" class="card-container"></div>
    `;

    // Render all events
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = events.map(ev => {
        const registered = ev.attendees.includes(user.id);
        const full = ev.attendees.length >= ev.capacity;
        let action = '';
        if (registered) {
            action = `<span class="inscrito">Already registered</span>`;
        } else if (full) {
            action = `<span class="sin-cupo">Full</span>`;
        } else {
            action = `<button class="register-event-btn" data-id="${ev.id}">Register</button>`;
        }
        return `
            <div class="card">
                <h4>${ev.title}</h4>
                <p>${ev.description}</p>
                <p><b>Date:</b> ${ev.date}</p>
                <p><b>Location:</b> ${ev.location}</p>
                <p><b>Capacity:</b> ${ev.attendees.length}/${ev.capacity}</p>
                ${action}
            </div>
        `;
    }).join('');

    // Attach register event listeners
    eventsList.querySelectorAll('.register-event-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = btn.getAttribute('data-id');
            try {
                await registerUserToEvent(id, user.id);
                renderUserDashboard(user);
            } catch (err) {
                alert(err.message);
            }
        });
    });

    // Render user's registered events
    const myEvents = events.filter(ev => ev.attendees.includes(user.id));
    const myEventsList = document.getElementById('my-events-list');
    if (myEvents.length === 0) {
        myEventsList.innerHTML = `<p>You are not registered for any events yet.</p>`;
    } else {
        myEventsList.innerHTML = myEvents.map(ev => `
            <div class="card">
                <h4>${ev.title}</h4>
                <p>${ev.description}</p>
                <p><b>Date:</b> ${ev.date}</p>
                <p><b>Location:</b> ${ev.location}</p>
            </div>
        `).join('');
    }
}
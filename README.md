# Event Management SPA – Módulo 3

## Author
- **Name:** Samuel David Arena Jiménez
- **Clan:** [caiman]
- **Email:** [samyarena20052gmail.com]
- **ID:** [1042244679]

---

## Project Overview

This is a Single Page Application (SPA) for event management, allowing administrators to manage events and users to register for available events.  
The project uses **JavaScript (ES Modules)**, **HTML5**, **CSS3**, and simulates a database with **json-server**.

---

## Features

- **Authentication:** Register and login with two roles: `admin` and `user`.
- **Session Persistence:** User session is stored in Local Storage.
- **Role-based Dashboard:** Admins can create, edit, and delete events; users can view and register for events.
- **CRUD Operations:** All event/user operations are synced with the json-server database.
- **SPA Routing:** Protected routes and custom not-found page.
- **Responsive UI:** Modern, mobile-friendly design.

---

## Getting Started

### 1. Clone the repository

```bash
git https://github.com/s4mue3l2005/prueba_m3.git
cd prueba_m3
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the json-server (database)

```bash
npx json-server --watch public/db/database.json --port 3000
```

- The server will run at [http://localhost:3000](http://localhost:3000)
- The default admin user is:
  - **Email:** admin@eventos.com
  - **Password:** admin123

### 4. Start the Vite development server

```bash
npm run dev
```
---

## Usage

- **Register:** Create a new user account (role: user).
- **Login:** Access your dashboard.
- **Admin:** Can create, edit, and delete events, and view all users.
- **User:** Can view all events and register for available ones.
- **Session:** Remains active after page reloads.
- **Logout:** Ends the session.

---

## API Endpoints (json-server)

- `GET /users` – List users
- `POST /users` – Register user
- `GET /events` – List events
- `POST /events` – Create event (admin)
- `PUT /events/:id` – Edit event (admin)
- `DELETE /events/:id` – Delete event (admin)
- `PATCH /events/:id` – Register user to event

---

## Postman Collection

A Postman collection is included in the repository for testing all endpoints.

---

## Project Structure

```
prueba_m3/
│
├── public/
│   └── db/
│       └── database.json
├── src/
│   ├── js/
│   │   ├── api.js
│   │   └── auth.js
│   ├── views/
│   │   ├── dashboard.js
│   │   ├── login.js
│   │   ├── register.js
│   │   └── not-found.js
│   ├── css/
│   │   └── [styles]
│   ├── main.js
│   └── router.js
├── package.json
└── README.md
```

---

## Notes

- All code is commented for clarity.
- Each commit is descriptive and focused on a single functionality.
- The app is fully functional and ready for evaluation.

---

## How to Test

1. Register as a new user and log in.
2. Log in as admin (see credentials above) to manage events.
3. Try accessing protected routes without logging in (should redirect to login).
4. Try accessing `/login` or `/register` while logged in (should redirect to dashboard).
5. Test event registration as a user (cannot register if event is full).

---

## Contact

For any questions, contact [samyarena2005@gmail.com].


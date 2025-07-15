const endpoint = 'http://localhost:3000';

// Get all events
export async function getEvents() {
    try {
        const response = await fetch(`${endpoint}/events`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
}

// Get event by ID
export async function getEventById(id) {
    try {
        const response = await fetch(`${endpoint}/events/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching event by ID:', error);
        throw error;
    }
}

// Create new event (admin only)
export async function createEvent(eventData) {
    try {
        const response = await fetch(`${endpoint}/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
}

// Update event (admin only)
export async function updateEvent(id, eventData) {
    try {
        const response = await fetch(`${endpoint}/events/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
}

// Delete event (admin only)
export async function deleteEvent(id) {
    try {
        const response = await fetch(`${endpoint}/events/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
}

// Register a user to an event (visitor)
export async function registerUserToEvent(eventId, userId) {
    try {
        // Get the event
        const event = await getEventById(eventId);
        if (!event.attendees) event.attendees = [];

        // Check if already registered
        if (event.attendees.includes(userId)) {
            throw new Error('User already registered for this event');
        }

        // Check capacity
        if (event.attendees.length >= event.capacity) {
            throw new Error('Event is full');
        }

        // Register user
        event.attendees.push(userId);

        // Update event
        const response = await fetch(`${endpoint}/events/${eventId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ attendees: event.attendees })
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error registering user for event:', error);
        throw error;
    }
}

// Get all users (admin only)
export async function getUsers() {
    try {
        const response = await fetch(`${endpoint}/users`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

// Get user by ID
export async function getUserById(id) {
    try {
        const response = await fetch(`${endpoint}/users/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
}
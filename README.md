# Full-Stack Coding Challenge

**Deadline**: Sunday, Feb 23th 11:59 pm PST

---

## Overview

Create a “Task Management” application with **React + JavaScript** (frontend), **Node.js** (backend), and **PostgreSQL** (database). The application supports:

1. **Register** (sign up) and **Log in** (sign in) users.
2. After logging in, users can"
   - **View a list of tasks**.
   - **Create a new task**.
   - **Update an existing task** (e.g., mark complete, edit).
   - **Delete a task**.

---

## Set Up

- `npm install` to install dependencies
- `npm run dev` to run the server

### 3. Frontend (React + TypeScript)

- **Login / Register**:
  - Simple forms for **Register** and **Login**.
  - Store JWT (e.g., in `localStorage`) upon successful login.
  - If not authenticated, the user should not see the tasks page.
- **Tasks Page**:
  - Fetch tasks from `GET /tasks` (including auth token in headers).
  - Display the list of tasks.
  - Form to create a new task (`POST /tasks`).
  - Buttons/fields to update a task (`PUT /tasks/:id`).
  - Button to delete a task (`DELETE /tasks/:id`).
- **Navigation**:
  - Show `Login`/`Register` if not authenticated.
  - Show `Logout` if authenticated.
- **Setup**:
  - `npm install` then `npm start` (or `npm run dev`) to run.
  - Document how to point the frontend at the backend (e.g., `.env` file, base URL).

---

## Deliverables

1. **Fork the Public Repository**: **Fork** this repo into your own GitHub account.
2. **Implement Your Solution** in the forked repository. Make sure you're README file has:
   - Steps to set up the database (migrations, environment variables).
   - How to run the backend.
   - How to run the frontend.
   - Any relevant notes on testing.
   - Salary Expectations per month (Mandatory)
3. **Short Video Demo**: Provide a link (in a `.md` file in your forked repo) to a brief screen recording showing:
   - Registering a user
   - Logging in
   - Creating, updating, and deleting tasks
4. **Deadline**: Submissions are due **Sunday, Feb 23th 11:59 pm PST**.

> **Note**: Please keep your solution minimal. The entire project is intended to be completed in around 3 hours. Focus on core features (registration, login, tasks CRUD) rather than polished UI or extra features.

---

## Evaluation Criteria

1. **Functionality**

   - Does registration and login work correctly (with password hashing)?
   - Are tasks protected by authentication?
   - Does the tasks CRUD flow work end-to-end?

2. **Code Quality**

   - Is the code structured logically and typed in TypeScript?
   - Are variable/function names descriptive?

3. **Clarity**

   - Is the `README.md` (in your fork) clear and detailed about setup steps?
   - Easy to run and test?

4. **Maintainability**
   - Organized logic (controllers/services, etc.)
   - Minimal hard-coded values

Good luck, and we look forward to your submission!

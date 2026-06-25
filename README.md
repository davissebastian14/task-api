# Task Management REST API

## What it does
This Task Management API allows you to create users and assign tasks to them. A user can login and can see, create, delete tasks and update the statuses of these tasks to pending, in-progress and done.

## Live URL
https://task-api-gen5.onrender.com

## Tech Stack
- **Node.js** — runtime environment used to run the API
- **Express.js** — web application framework used for creating server and route handling
- **PostgreSQL** — relational database used to store users and tasks with a foreign key relationship
- **bcrypt** — used for password hashing, passwords are never stored in plain text
- **JWT** — used for authentication on protected routes
- **Joi** — used for input validation on all write operations

## Features
- User registration and login with bcrypt password hashing
- JWT authentication on protected routes
- User-scoped data access — users can only see their own tasks
- Full CRUD operations for tasks
- Joi input validation on all write operations
- Centralised error handling middleware
- Status validation — tasks can only be set to pending, in-progress, or done

## API Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /auth/register | Register a new user | No |
| POST | /auth/login | Login and receive JWT token | No |
| GET | /users | Get all users | Yes |
| GET | /users/:id | Get user by id | Yes |
| DELETE | /users/:id | Delete user by id | Yes |
| GET | /tasks | Get all tasks for logged in user | Yes |
| GET | /tasks/:id | Get single task by id | Yes |
| POST | /tasks | Create a new task | Yes |
| PUT | /tasks/:id | Update task status | Yes |
| DELETE | /tasks/:id | Delete task by id | Yes |

## Running Locally

**Prerequisites:** Node.js and PostgreSQL must be installed

1. Clone the repo
```bash
   git clone https://github.com/davissebastian14/task-api.git
   cd task-api
```
2. Install dependencies
```bash
   npm install
```
3. Create a `.env` file in the root directory with the variables listed below
4. Set up PostgreSQL locally and run the CREATE TABLE queries from `queries.sql`
5. Start the server
```bash
   node index.js
```

## Environment Variables
Create a `.env` file in the root with the following:
```
JWT_SECRET=your_jwt_secret
DATABASE_LOCAL_URL=postgresql://postgres:yourpassword@localhost:5432/taskdb
```
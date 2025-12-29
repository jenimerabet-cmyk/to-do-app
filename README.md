# Todo App - Full Stack Project #
This is a full-stack Todo application that allows users to register, log in,
and manage personal tasks. The project demonstrates authentication, protected
routes, and basic CRUD operations using a REST API.
## Table of Contents

- Tech Stack
- Project Structure
- Setup Instructions
- API Documentation
- Key Features
- Database Relationships
- Additional Notes

---
## Project Description & Features

The Todo App allows users to:
- Create an account and log in securely
- Receive a JSON Web Token (JWT) after authentication
- Create tasks linked to their user account
- View all their own tasks
- Delete tasks
- Access protected routes only when authenticated

Authentication is handled using JWT, and passwords are securely hashed
before being stored in the database.

## Tech Stack

**Frontend:**

- React with Vite
- JavaScript
- Simple CSS
- Fetch API for requests  

**Backend:**

- Node.js & Express  
- MongoDB with Mongoose  
- JWT for authentication  
- bcrypt for password hashing
  
### Development Tools
- Git & GitHub
- Thunder Client (API testing)
- Nodemon
---

## Project Structure


```text
backend/
├── config/
│   └── db.js                 # MongoDB connection
│
├── controllers/
│   ├── authcontroller.js     # Register & login logic
│   └── taskcontroller.js     # Task CRUD logic
│
├── middleware/
│   └── authmiddleware.js     # JWT auth middleware
│
├── models/
│   ├── user.js               # User schema
│   └── task.js               # Task schema
│
├── routes/
│   ├── authroutes.js         # Auth routes
│   └── taskroutes.js         # Task routes
│
├── node_modules/
├── .env
├── package.json
├── package-lock.json
└── server.js                 # Express entry point
```

---

## Setup Instructions

### Prerequisites

- Node.js v16+  
- MongoDB (local or Atlas)  
- Git  

### Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2.install depencies

```bash
npm install
```

**Environment Variables**

- Create a .env file in the backend directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
```

**Running the Backend Server**

To start the development server with nodemon:
```bash
npm run dev
```
The server will run at:
```text
http://localhost:5000
```
### Frontend Setup
- Navigate to the frontend directory
```bash
cd frontend
```
Install dependencies
```bash
npm install
```
Start the frontend development server
```bash
npm run dev
```
The frontend will run at:
```text
http://localhost:5173
```
### API Documentation
## Authetication Routes

POST api/auth/register
- Registers a new user. 
  
**Request Body:**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```
Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NTIyZDVjOGNhMjdkMGViM2E5YTQ3YiIsImlhdCI6MTc2Njk5MzI0NCwiZXhwIjoxNzY3MDc5NjQ0fQ.5_ov1CEJw-wQSiaGvZFp9z1To4Q7rXPUTk9AGvoBSjU",
  "user": {
    "username": "testuser",
    "email": "test@example.com",
    "password": "",
    "_id": "",
    "createdAt": "2025-12-29T07:27:24.419Z",
    "updatedAt": "2025-12-29T07:27:24.419Z",
    "__v": 0
  }
}
```
**Login User**

POST api/auth/register
- Logs in an existing user and returns a JWT token.
  
Request body:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "testuser",
    "email": "test@example.com"
  }
}
```
### Task Routes
All task routes require an Authorization header:
```text
Authorization: Bearer <token>
```
**Get Tasks**
- GET /API/TASKS
  - Fetch all user tasks

- POST /API/TASKS
  - Creates a new task
    
Request Body:
```json
{
  "title": "My Task",
  "description": "Optional description"
}
```
Response:
```json
{
  "title": "My Task",
  "description": "Optional description",
  "user": "694f180701f4d62ba437b2f8",
  "_id": "69520346390901db9c3898a4",
  "createdAt": "2025-12-29T04:27:50.800Z",
  "updatedAt": "2025-12-29T04:27:50.800Z",
  "__v": 0
}
```
DELETE API/TASKS
- Delete tasks

### Authentication Flow (JWT)
1. User registers or logs in

2. Backend validates credentials

3. JWT token is generated and returned

4. Frontend stores token in localStorage

5. Token is sent in request headers for protected routes

6. Middleware verifies token before allowing access
   
### Key Features
- User registers or logs in

- Backend validates credentials

- JWT token is generated and returned

- Frontend stores token in localStorage

- Token is sent in request headers for protected routes

- Middleware verifies token before allowing access

## Deployment

This project is deployed to GitHub as a full-stack repository.

The application is designed to run locally using the setup instructions.
Live hosting (Vercel/Render) was not required for this assignment.
































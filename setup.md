# Quick Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

2. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

3. **Start MongoDB**
   - Local: Start MongoDB service
   - Atlas: Use your MongoDB Atlas connection string

4. **Run the application**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Features Available

### Authentication
- Register with username, email, and password
- Login with email and password
- JWT token-based authentication
- Automatic logout on token expiration

### Task Management
- Create tasks with title, description, priority, status, and due date
- View all tasks in a responsive grid layout
- Edit task details
- Delete tasks with confirmation
- Filter tasks by status (All, Pending, In Progress, Completed)
- Sort tasks by date created, title, priority, or due date

### User Interface
- Modern, responsive design
- Real-time updates
- Loading states and error handling
- Mobile-friendly interface

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your connection string in `.env`

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill existing processes on the port

3. **JWT Token Issues**
   - Clear browser localStorage
   - Check JWT_SECRET in `.env`

4. **React App Not Starting**
   - Check if port 3000 is available
   - Clear node_modules and reinstall

### Development Commands

```bash
# Start both frontend and backend
npm run dev

# Start only backend
npm run server

# Start only frontend
npm run client

# Build for production
npm run build
```

## Security Notes

- Change the JWT_SECRET in production
- Use HTTPS in production
- Implement rate limiting for production use
- Add input sanitization for production use 
# Task Manager - Full Stack Application

A modern task management application built with React, Node.js, Express, and MongoDB with JWT authentication.

## Features

- **User Authentication**: Register, login, and logout with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Task Organization**: Filter by status and sort by various criteria
- **Responsive Design**: Modern UI that works on desktop and mobile
- **Real-time Updates**: Immediate feedback for all operations
- **Secure**: Password hashing and JWT token authentication

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React** - JavaScript library for building user interfaces
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **CSS3** - Styling with modern design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

5. **Start MongoDB**
   Make sure MongoDB is running on your system or use MongoDB Atlas.

## Running the Application

### Development Mode
Run both frontend and backend concurrently:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

### Production Mode
1. Build the frontend:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Tasks
- `GET /api/tasks` - Get all tasks for authenticated user
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Project Structure

```
task-manager/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React context providers
│   │   └── ...
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # Mongoose models
│   ├── routes/            # Express routes
│   ├── middleware/        # Custom middleware
│   └── index.js           # Server entry point
├── package.json
└── README.md
```

## Features in Detail

### User Authentication
- Secure registration with password hashing
- JWT token-based authentication
- Automatic token refresh
- Protected routes

### Task Management
- **Create Tasks**: Add new tasks with title, description, priority, status, and due date
- **View Tasks**: Dashboard with grid layout showing all tasks
- **Edit Tasks**: Update task details with form validation
- **Delete Tasks**: Remove tasks with confirmation
- **Filter & Sort**: Filter by status and sort by various criteria

### User Interface
- **Responsive Design**: Works on all device sizes
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Real-time Feedback**: Immediate updates for all operations
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during operations

## Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Stateless authentication with tokens
- **Input Validation**: Server-side validation for all inputs
- **CORS**: Cross-origin resource sharing configuration
- **Protected Routes**: Authentication middleware for sensitive endpoints

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub. 
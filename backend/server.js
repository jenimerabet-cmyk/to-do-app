const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// Routes
const authRoutes = require('./routes/authroutes');
const taskRoutes = require('./routes/taskroutes');

app.use('/api/auth', authRoutes);   // /api/auth/register, /api/auth/login
app.use('/api/tasks', taskRoutes);  // /api/tasks, /api/tasks/:id

// Catch-all 404 (JSON)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: 'https://frontend-task-33.vercel.app', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect('mongodb+srv://sandeepluh0001:OuWXzxJffnoJcVK7@upskill-backend-all.cvofcz4.mongodb.net/?retryWrites=true&w=majority&appName=upskill-backend-all', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Route: Set Cookie
app.get('/set-cookie', (req, res) => {
  res.cookie('userToken', '123abc', {
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1 hour
  });
  res.status(200).json({ message: 'Cookie has been set' });
});

// Route: Get Cookie
app.get('/get-cookie', (req, res) => {
  const token = req.cookies.userToken;
  if (token) {
    res.status(200).json({ message: 'Cookie retrieved', token });
  } else {
    res.status(404).json({ message: 'No cookie found' });
  }
});

// Route: Send JSON with Status Code
app.get('/status/:code', (req, res) => {
  const code = parseInt(req.params.code, 10);
  const messages = {
    200: 'OK',
    201: 'Created',
    400: 'Bad Request',
    404: 'Not Found',
    500: 'Server Error',
  };
  const message = messages[code] || 'Custom status';
  res.status(code).json({ status: code, message });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

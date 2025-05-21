// server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'https://frontend-task-33.vercel.app', // React app will run here
  credentials: true // Allow cookies to be sent
}));

// Route to set a cookie
app.get('/api/set-cookie', (req, res) => {
  res.cookie('testCookie', 'cookie-value', {
    maxAge: 86400000, // 1 day
    httpOnly: true,
    secure: false, // set to true in production with HTTPS
    sameSite: 'lax'
  });
  
  res.json({
    success: true,
    message: 'Cookie has been set successfully'
  });
});

// Route to get cookies
app.get('/api/get-cookie', (req, res) => {
  const cookies = req.cookies;
  res.json({
    success: true,
    cookies: cookies
  });
});

// Route with 200 OK response
app.get('/api/ok', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'This is a successful response (200 OK)',
    data: { sample: 'value' }
  });
});

// Route with 201 Created response
app.post('/api/create', (req, res) => {
  res.status(201).json({
    status: 201,
    message: 'Resource created successfully (201 Created)',
    data: req.body
  });
});

// Route with 400 Bad Request response
app.get('/api/bad-request', (req, res) => {
  res.status(400).json({
    status: 400,
    message: 'This is a bad request (400 Bad Request)',
    error: 'Missing required parameters'
  });
});

// Route with 404 Not Found response
app.get('/api/not-found', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'The requested resource was not found (404 Not Found)',
    error: 'Resource not available'
  });
});

// Route with 500 Internal Server Error response
app.get('/api/server-error', (req, res) => {
  res.status(500).json({
    status: 500,
    message: 'Internal server error occurred (500 Internal Server Error)',
    error: 'Something went wrong on the server'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
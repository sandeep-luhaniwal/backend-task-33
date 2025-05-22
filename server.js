const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cookieParser());
app.use(express.json());

// ✅ CORS config for Vercel frontend + cross-origin cookie
app.use(cors({
  origin: 'https://frontend-task-33.vercel.app',
  credentials: true
}));

// ✅ Set cookie route
app.get('/api/set-cookie', (req, res) => {
  res.cookie('testCookie', 'cookie-value', {
    maxAge: 86400000,       // 1 day
    httpOnly: false,        // Set false to read in frontend
    secure: true,           // Required for SameSite=None
    sameSite: 'None'        // Required for cross-origin
  });

  res.json({
    success: true,
    message: 'Cookie has been set successfully'
  });
});

// ✅ Get cookie route
app.get('/api/get-cookie', (req, res) => {
  res.json({
    success: true,
    cookies: req.cookies
  });
});

// ✅ Extra demo endpoints
app.get('/api/ok', (req, res) => {
  res.status(200).json({
    message: '200 OK response',
    data: { status: 200 }
  });
});

app.post('/api/create', (req, res) => {
  res.status(201).json({
    message: '201 Created',
    data: req.body
  });
});

app.get('/api/bad-request', (req, res) => {
  res.status(400).json({
    message: '400 Bad Request',
    error: 'Missing parameters'
  });
});

app.get('/api/not-found', (req, res) => {
  res.status(404).json({
    message: '404 Not Found',
    error: 'Resource not found'
  });
});

app.get('/api/server-error', (req, res) => {
  res.status(500).json({
    message: '500 Server Error',
    error: 'Internal error'
  });
});

// ✅ Server start
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

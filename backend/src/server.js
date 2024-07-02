// src/server.js
const express = require('express');
//const cors = require('cors');
const config = require('./config/config');
const bodyParser = require('body-parser');
const songController = require('./controllers/loadSongController');

const app = express();
const port = config.port;

// Middleware
//app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/songs', songController);

// Error handling middleware for handling not found errors
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handling middleware for handling internal server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
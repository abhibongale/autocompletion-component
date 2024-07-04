import app from './app.js';
import http from 'http';
import config from './config/config.js';

const port = config.port;

// Create HTTP server instance
const server = http.createServer(app);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

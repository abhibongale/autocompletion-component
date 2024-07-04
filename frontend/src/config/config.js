import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
const currentFileUrl = new URL(import.meta.url);

// Resolve the directory name from the file URL
const __dirname = path.dirname(currentFileUrl.pathname);

const envPath = path.resolve(__dirname, '../../../.env');

// Load .env file from the parent directory
dotenv.config({ path: envPath });

const config = {
  port: process.env.REACT_APP || 3000,
};

export default config;

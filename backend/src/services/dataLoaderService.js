// src/dataLoader.js
import fs from 'fs/promises';
import path from 'path';
import { jsonrepair } from 'jsonrepair';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export async function loadData(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const repairedData = jsonrepair(data);
    return JSON.parse(repairedData);
  } catch (err) {
    console.error('Error reading JSON file:', err);
    throw err;
  }
}

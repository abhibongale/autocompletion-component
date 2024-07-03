// src/controllers/searchController.js
import express from 'express';
import { loadData } from '../services/dataLoaderService.js';
import config from '../config/config.js';
import path from 'path';

const router = express.Router();

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.join(__dirname, '..', config.filePath);

let songsDetails = [];

(async () => {
  songsDetails = await loadData(filePath);
})();

// API endpoint for searching songs
router.get('/search', (req, res) => {
  const { authorName, albumName, title } = req.query;

  try {
    // Filter songs based on query parameters
    const filteredSongs = songsDetails.filter(song => {
      const matchesAuthor = authorName && song.name.toLowerCase().includes(authorName.toLowerCase());
      const matchesAlbum = albumName && song.albums.some(album => album.title.toLowerCase().includes(albumName.toLowerCase()));
      const matchesTitle = title && song.albums.some(album => album.songs.some(s => s.title.toLowerCase().includes(title.toLowerCase())));

      return matchesAuthor || matchesAlbum || matchesTitle; // Use || (logical OR) to include if any match
    });

    res.json(filteredSongs);
  } catch (error) {
    console.error('Error filtering songs:', error);
    res.status(500).json({ error: 'An error occurred while filtering songs.' });
  }
});

export default router;

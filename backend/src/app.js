import express, { application } from 'express';
import cors from 'cors';
import { loadSongsDetails } from './dataloader.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

let songsDetails = [];

// Load song details on server start
loadSongsDetails()
  .then((loadedSongsDetails) => {
    songsDetails = loadedSongsDetails;
    console.log('Song details loaded successfully.');
  })
  .catch(error => {
    console.error('Error loading song details:', error);
  });

// API endpoint for searching songs
app.get('/api/search', (req, res) => {
  const { authorName, albumName, title } = req.query;

  try {
    // Check if songsDetails is properly loaded
    if (!songsDetails) {
      throw new Error('Songs details not loaded');
    }

    // Filter songs based on query parameters
    const filteredSongs = songsDetails.filter(song => {
      const matchesAuthor = authorName && (authorName !== "" && song.artist.toLowerCase().startsWith(authorName.toLowerCase()));
      const matchesAlbum = albumName && (albumName !== "" && song.album.toLowerCase().startsWith(albumName.toLowerCase()));
      const matchesTitle = title && (title !== "" && song.title.toLowerCase().startsWith(title.toLowerCase()));

      return matchesAuthor || matchesAlbum || matchesTitle; // Use || (logical OR) to include if any match
    });

    res.json(filteredSongs);
  } catch (error) {
    console.error('Error filtering songs:', error);
    res.status(500).json({ error: 'An error occurred while filtering songs.' });
  }
});

export default app;

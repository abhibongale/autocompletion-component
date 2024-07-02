// src/controllers/songController.js
const express = require('express');
const songService = require('../services/loadSongService');

const router = express.Router();

// Load song details on server start
songService.loadSongsDetails();

// API endpoint for searching songs
router.get('/search', (req, res) => {
  const { authorName, albumName, title } = req.query;

  try {
    // Get songs details from service
    const songsDetails = songService.getSongsDetails();
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

module.exports = router;
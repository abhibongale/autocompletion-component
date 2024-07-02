// src/services/loadSong.js
const fs = require('fs');
const path = require('path');
const { jsonrepair } = require('jsonrepair');
const config = require('../config/config');
let songsDetails = []; // Initialize songsDetails array

function loadSongsDetails() {
    const filePath = path.join(__dirname, '..', config.filePath);  
    fs.readFile(filePath, 'utf8', (err, jsonData) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }

    try {
      jsonData = jsonrepair(jsonData)
      const musicData = JSON.parse(jsonData);

      // Process and store song details
      //songsDetails = [];
      musicData.forEach(artist => {
        const artistName = artist.name;
        artist.albums.forEach(album => {
          const albumTitle = album.title;
          const albumDescription = album.description;
          album.songs.forEach(song => {
            const songTitle = song.title;
            const songLength = song.length;
            const songDetail = {
              artist: artistName,
              album: albumTitle,
              title: songTitle,
              length: songLength,
              description: albumDescription
            };
            songsDetails.push(songDetail);
          });
        });
      });

      //console.log('Processed song details:', songsDetails);
    } catch (error) {
      console.error('Error parsing JSON file:', error);
    }
  });
}

function getSongsDetails() {
  return songsDetails;
}

module.exports = {
  loadSongsDetails,
  getSongsDetails,
};

import fs from 'fs';
import path from 'path';
import { jsonrepair } from 'jsonrepair';
import config from './config/config.js';

// Get the current file's URL
const currentFileUrl = new URL(import.meta.url);

// Resolve the directory name from the file URL
const __dirname = path.dirname(currentFileUrl.pathname);

let songsDetails = [];

export function loadSongsDetails() {
  const filePath = path.join(__dirname, config.filePath);

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, jsonData) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        reject(err);
        return;
      }

      try {
        jsonData = jsonrepair(jsonData);
        const musicData = JSON.parse(jsonData);

        // Process and store song details
        songsDetails = [];
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

        console.log('Processed song details:', songsDetails);
        resolve(songsDetails);
      } catch (error) {
        console.error('Error parsing JSON file:', error);
        reject(error);
      }
    });
  });
}

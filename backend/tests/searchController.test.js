// tests/searchController.test.js
import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import searchController from '../src/controllers/searchController.js';

const app = express();
app.use('/api/songs', searchController);

describe('GET /api/songs/search', () => {
  it('should return filtered songs based on query parameters', (done) => {
    request(app)
      .get('/api/songs/search')
      .query({ authorName: 'Radiohead', albumName: '', title: 'Bloom' }) // Example query parameters
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        // Assert that the response body contains the expected songs
        expect(res.body).to.be.an('array').that.is.not.empty;
        expect(res.body[0]).to.have.property('name', 'Radiohead');
        expect(res.body[0].albums[0]).to.have.property('title', 'The King of Limbs');
        expect(res.body[0].albums[0].songs[0]).to.have.property('title', 'Bloom');

        done();
      });
  });

  it('should handle server errors gracefully', (done) => {
    request(app)
      .get('/api/songs/search')
      .query({ authorName: 'NonExistentArtist' }) // Query that will not match any song
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        // Assert that the response body is an empty array
        expect(res.body).to.be.an('array').that.is.empty;

        done();
      });
  });
});

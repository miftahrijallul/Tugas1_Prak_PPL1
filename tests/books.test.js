const request = require('supertest');
const app = require('../src/app');

describe('Library API - Books', () => {

  // GET /books
  describe('GET /books', () => {
    it('should return all books', async () => {
      const res = await request(app).get('/books');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should filter books by genre', async () => {
      const res = await request(app).get('/books?genre=Technology');
      expect(res.statusCode).toBe(200);
      res.body.data.forEach(book => {
        expect(book.genre).toBe('Technology');
      });
    });
  });

  // GET /books/:id
  describe('GET /books/:id', () => {
    it('should return a single book', async () => {
      const res = await request(app).get('/books/1');
      expect(res.statusCode).toBe(200);
      expect(res.body.data.id).toBe(1);
    });

    it('should return 404 for non-existent book', async () => {
      const res = await request(app).get('/books/9999');
      expect(res.statusCode).toBe(404);
      expect(res.body.status).toBe('error');
    });
  });

  // POST /books
  describe('POST /books', () => {
    it('should create a new book', async () => {
      const newBook = { title: 'Refactoring', author: 'Martin Fowler', genre: 'Technology', year: 1999 };
      const res = await request(app).post('/books').send(newBook);
      expect(res.statusCode).toBe(201);
      expect(res.body.data.title).toBe('Refactoring');
      expect(res.body.data.available).toBe(true);
    });

    it('should return 400 if required fields missing', async () => {
      const res = await request(app).post('/books').send({ title: 'Incomplete Book' });
      expect(res.statusCode).toBe(400);
      expect(res.body.status).toBe('error');
    });
  });

  // PUT /books/:id
  describe('PUT /books/:id', () => {
    it('should update an existing book', async () => {
      const res = await request(app).put('/books/1').send({ available: false });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.available).toBe(false);
    });

    it('should return 404 for non-existent book', async () => {
      const res = await request(app).put('/books/9999').send({ title: 'Ghost' });
      expect(res.statusCode).toBe(404);
    });
  });

  // DELETE /books/:id
  describe('DELETE /books/:id', () => {
    it('should delete a book', async () => {
      const res = await request(app).delete('/books/2');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
    });

    it('should return 404 for already deleted book', async () => {
      const res = await request(app).delete('/books/9999');
      expect(res.statusCode).toBe(404);
    });
  });

  // Health Check
  describe('GET /health', () => {
    it('should return healthy status', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
    });
  });
});

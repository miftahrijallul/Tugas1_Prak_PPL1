const express = require('express');
const app = express();

app.use(express.json());

// In-memory database
let books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', genre: 'Technology', year: 2008, available: true },
  { id: 2, title: 'The Pragmatic Programmer', author: 'David Thomas', genre: 'Technology', year: 1999, available: true },
  { id: 3, title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Help', year: 2018, available: false },
];
let nextId = 4;

// Helper: success response
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
};

// Helper: error response
const errorResponse = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({
    status: 'error',
    message,
    data: null,
  });
};

// GET /books - Get all books
app.get('/books', (req, res) => {
  const { genre, available } = req.query;
  let result = [...books];

  if (genre) result = result.filter(b => b.genre.toLowerCase() === genre.toLowerCase());
  if (available !== undefined) result = result.filter(b => b.available === (available === 'true'));

  return successResponse(res, result, `Retrieved ${result.length} book(s)`);
});

// GET /books/:id - Get single book
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return errorResponse(res, `Book with id ${req.params.id} not found`, 404);
  return successResponse(res, book, 'Book retrieved successfully');
});

// POST /books - Create new book
app.post('/books', (req, res) => {
  const { title, author, genre, year } = req.body;

  if (!title || !author || !genre || !year) {
    return errorResponse(res, 'Fields title, author, genre, and year are required', 400);
  }

  const newBook = { id: nextId++, title, author, genre, year: parseInt(year), available: true };
  books.push(newBook);
  return successResponse(res, newBook, 'Book created successfully', 201);
});

// PUT /books/:id - Update book
app.put('/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return errorResponse(res, `Book with id ${req.params.id} not found`, 404);

  const { title, author, genre, year, available } = req.body;
  books[index] = {
    ...books[index],
    ...(title && { title }),
    ...(author && { author }),
    ...(genre && { genre }),
    ...(year && { year: parseInt(year) }),
    ...(available !== undefined && { available }),
  };

  return successResponse(res, books[index], 'Book updated successfully');
});

// DELETE /books/:id - Delete book
app.delete('/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return errorResponse(res, `Book with id ${req.params.id} not found`, 404);

  const deleted = books.splice(index, 1)[0];
  return successResponse(res, deleted, 'Book deleted successfully');
});

// Health check
app.get('/health', (req, res) => {
  return successResponse(res, { uptime: process.uptime(), timestamp: new Date().toISOString() }, 'API is healthy');
});

module.exports = app;

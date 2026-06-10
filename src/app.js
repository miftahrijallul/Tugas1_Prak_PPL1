const express = require('express');
const app = express();

app.use(express.json());

// In-memory database
let books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', genre: 'Technology', year: 2008, available: true },
  { id: 2, title: 'The Pragmatic Programmer', author: 'David Thomas', genre: 'Technology', year: 1999, available: true },
  { id: 3, title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Help', year: 2018, available: false },
];

// Helper: success response
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data,
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

module.exports = app;

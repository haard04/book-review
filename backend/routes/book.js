const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Auth middleware will be added to POST /books later
router.post('/books', bookController.addBook);
router.get('/books', bookController.getBooks);
router.get('/books/:id', bookController.getBookById);

module.exports = router; 
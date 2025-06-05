const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Auth middleware will be added later
router.post('/books/:id/reviews', reviewController.addReview);
router.put('/reviews/:id', reviewController.updateReview);
router.delete('/reviews/:id', reviewController.deleteReview);

module.exports = router; 
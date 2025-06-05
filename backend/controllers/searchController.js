const Book = require('../models/Book');

exports.searchBooks = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ books: [] });
    const regex = new RegExp(q, 'i');
    const books = await Book.find({
      $or: [
        { title: regex },
        { author: regex }
      ]
    });
    res.json({ books });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 
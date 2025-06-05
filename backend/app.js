require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');
const reviewRoutes = require('./routes/review');
const searchRoutes = require('./routes/search');

app.get('/', (req, res) => {
  res.send('Book Review API is running');
});

app.use('/api', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', reviewRoutes);
app.use('/api', searchRoutes);

module.exports = app; 
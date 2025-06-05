# Book Review API

A RESTful API for a Book Review system built with Node.js, Express, and MongoDB (Mongoose). Features JWT authentication, book management, reviews, and search.

---

## 🚀 Features
- User registration and login (JWT-based authentication)
- Add, list, and view books (with filters and pagination)
- Submit, update, and delete reviews (one per user per book)
- Search books by title or author (partial, case-insensitive)

---

## 🛠️ Tech Stack
- Node.js + Express.js
- MongoDB (Mongoose)
- JWT for authentication
- bcryptjs for password hashing
- dotenv for environment variables

---

## 📦 Project Structure
```
backend/
  |-- controllers/   # Business logic
  |-- models/        # Mongoose schemas
  |-- routes/        # Express route definitions
  |-- app.js         # Express app setup
  |-- server.js      # Entry point, DB connection
  |-- .env           # Environment variables (not committed)
```

---

## ⚡ Setup Instructions
1. **Clone the repo & install dependencies:**
   ```sh
   cd backend
   npm install
   ```
2. **Copy the example environment file and edit as needed:**
   ```sh
   cp .env.example .env
   ```
   Then edit `.env` with your own values.
3. **Start the server:**
   ```sh
   node server.js
   ```
   The API will run at `http://localhost:5000` by default.

---

## 🔑 Authentication Middleware (Required for protected routes)
Add a file `middleware/auth.js`:
```js
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
```
Then, add this middleware to protected routes (e.g., POST /books, review routes):
```js
const auth = require('../middleware/auth');
router.post('/books', auth, bookController.addBook);
// ...
```

---

## 🧪 Example API Requests

### Signup
```sh
curl -X POST http://localhost:5000/api/signup -H "Content-Type: application/json" -d '{"username":"alice","email":"alice@example.com","password":"password123"}'
```

### Login
```sh
curl -X POST http://localhost:5000/api/login -H "Content-Type: application/json" -d '{"email":"alice@example.com","password":"password123"}'
```

### Add Book (Authenticated)
```sh
curl -X POST http://localhost:5000/api/books -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"title":"Book Title","author":"Author Name","genre":"Fiction","description":"A great book."}'
```

### Get All Books
```sh
curl http://localhost:5000/api/books?page=1&limit=10&author=Author%20Name&genre=Fiction
```

### Get Book Details
```sh
curl http://localhost:5000/api/books/<BOOK_ID>
```

### Submit Review (Authenticated)
```sh
curl -X POST http://localhost:5000/api/books/<BOOK_ID>/reviews -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"rating":5,"comment":"Excellent!"}'
```

### Update Review (Authenticated)
```sh
curl -X PUT http://localhost:5000/api/reviews/<REVIEW_ID> -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"rating":4,"comment":"Updated comment"}'
```

### Delete Review (Authenticated)
```sh
curl -X DELETE http://localhost:5000/api/reviews/<REVIEW_ID> -H "Authorization: Bearer <TOKEN>"
```

### Search Books
```sh
curl http://localhost:5000/api/search?q=harry
```

---

## 🗄️ Database Schema (Summary)
- **User:** username (unique), email (unique), password (hashed), createdAt
- **Book:** title, author, genre, description, createdAt
- **Review:** user (ref User), book (ref Book), rating (1-5), comment, createdAt
  - Each user can review a book only once

---

## 💡 Design Decisions & Assumptions
- JWT is used for stateless authentication; token required for all write operations.
- Passwords are hashed with bcryptjs.
- Pagination defaults: 10 for books, 5 for reviews.
- Reviews are always tied to a user and a book; only the review owner can update/delete.
- Search is case-insensitive and matches partial title/author.

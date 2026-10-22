
const express = require('express');
const jwt = require('jsonwebtoken');
let books = require('./booksdb.js');

const regd_users = express.Router();
let users = [];

// Check whether a username is already registered
const isValid = (username) => {
  return users.some(user => user.username === username);
};

// Check whether username and password match
const authenticatedUser = (username, password) => {
  return users.some(
    user => user.username === username && user.password === password
  );
};

// Login for registered users
regd_users.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({
      message: 'Invalid username or password'
    });
  }

  const token = jwt.sign({ username }, 'accessToken');

  return res.status(200).json({
    message: 'User successfully logged in',
    token
  });
});

// Add or update a book review
regd_users.put('/auth/review/:isbn', (req, res) => {
  return res.status(300).json({
    message: 'Yet to be implemented'
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

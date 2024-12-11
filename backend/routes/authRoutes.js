const express = require('express');
const router = express.Router();
const loginMiddleware = require('../middleware/loggingMiddleware'); // Import login middleware
const { createUser, loginUser } = require('../controllers/auth.controller');
const { createPost, getPosts } = require('../controllers/post.controller');


router.post('/create-user', createUser);
router.post('/login', loginUser);
router.post('/create-post', createPost);
router.post('/posts', getPosts);

module.exports = router;

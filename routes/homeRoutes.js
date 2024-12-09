const express = require('express');
const router = express.Router();
const loginMiddleware = require('../middleware/loggingMiddleware'); // Import login middleware

// A protected route that requires a valid JWT token
router.get('/home', loginMiddleware, (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Home Page!',
    });
});

module.exports = router;

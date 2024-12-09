const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const SECRET_KEY = process.env.SECRET_KEY || '12qw';

const loginMiddleware = async (req, res, next) => {
    try {

        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Authentication token is missing' });
        }
        const decoded = jwt.verify(token, SECRET_KEY);


        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Error in loginMiddleware:', error);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = loginMiddleware;

const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, { timestamps: true });

module.exports = mongoose.model('Like', likeSchema);

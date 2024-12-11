const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    comment: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);

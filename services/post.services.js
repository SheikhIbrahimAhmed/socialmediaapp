const Post = require('../models/post.model');

const getAllPosts = async () => {
    try {
        const posts = await Post.find().populate('userId', 'name').populate('comments.user', 'name').exec();
        return posts;
    } catch (error) {
        throw new Error('Error fetching posts');
    }
};
const getMyAllPosts = async (userId) => {
    try {
        const posts = await Post.find({ userId })

        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Error fetching posts');
    }
};

module.exports = {
    getAllPosts,
    getMyAllPosts
};

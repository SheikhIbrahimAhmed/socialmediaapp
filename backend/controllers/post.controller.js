const { createPostServ } = require("../services/auth.service");
const { getAllPosts, getMyAllPosts } = require('../services/post.services');

const createPost = async (req, res) => {
    try {
        const { userId, userName, caption, description } = req.body;
        if (!userId || !userName || !caption || !description) {
            return res.status(400).json({ message: 'userID, caption and description are required.' });
        }

        const newPost = await createPostServ({
            userId: userId,
            userName: userName,
            caption,
            description
        })

        res.status(201).json({
            message: 'Post created successfully!',
            post: newPost,
        });

    } catch (error) {
        console.error('Error Posting post:', error);
        res.status(500).json({ message: 'Error Posting post.', error: error.message });
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
};

const getMyPosts = async (req, res) => {
    try {
        const { userId } = req.query
        console.log("userId", userId)
        const posts = await getMyAllPosts(userId);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
};
module.exports = {
    createPost,
    getPosts,
    getMyPosts
};


const express = require('express');
const { getPosts, getMyPosts } = require('../controllers/post.controller');
const Post = require('../models/post.model'); // Import Post model
const router = express.Router();

// GET route for fetching posts
router.get('/get-posts', getPosts);
router.get('/get-single-post', getMyPosts);

// POST route for liking a post
router.post('/like-post/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        // Find the post by postId
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Increment the likes count
        post.likes += 1;

        // Save the updated post
        await post.save();

        // Return the updated post
        res.status(200).json(post);
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// POST route for adding a comment to a post
router.post('/comment-post/:postId', async (req, res) => {
    const { postId } = req.params; // Get the post ID from the route
    const { comment } = req.body; // Get the comment text from the request body

    try {
        // Find the post by its ID
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Create a new comment
        const newComment = {
            user: post.userId, // Replace `req.userId` with actual user ID retrieval logic
            text: comment,
        };

        // Add the comment to the comments array
        post.comments.push(newComment);

        // Save the updated post
        await post.save();

        // Return the newly added comment as response
        res.status(200).json(newComment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

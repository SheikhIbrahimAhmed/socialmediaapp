const express = require('express');
const { getPosts, getMyPosts } = require('../controllers/post.controller');
const Post = require('../models/post.model'); // Import Post model
const Comment = require('../models/comment.model'); // Import Post model
const Like = require('../models/like.model'); // Import Post model
const router = express.Router();

// GET route for fetching posts
router.get('/get-posts', getPosts);
router.get('/get-single-post', getMyPosts);


router.post('/like-post/:postId', async (req, res) => {
    const { postId } = req.params;
    const { likedBy } = req.body;
    try {
        // Find the post by postId
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const newLike = new Like({
            postId: post._id,
            likedBy: likedBy,
        });
        await newLike.save()
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
// router.get('/get-likes/:postId', async (req, res) => {
//     const { postId } = req.params;
//     try {
//         const likes = await Like.find({ postId });
//         res.status(200).json(likes);
//     } catch (error) {
//         console.error("Error fetching Like:", error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

router.post('/comment-post/:postId', async (req, res) => {
    const { postId } = req.params;
    const { comment } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const newComment = new Comment({
            postId: post._id,
            commentedBy: post.userId,
            comment: comment,
        });

        await newComment.save();
        post.commentCount = (post.commentCount || 0) + 1;
        await post.save();
        res.status(200).json(newComment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// router.get('/get-comments/:postId', async (req, res) => {
//     const { postId } = req.params;
//     try {
//         const comments = await Comment.find({ postId });
//         res.status(200).json(comments);
//     } catch (error) {
//         console.error("Error fetching comments:", error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


module.exports = router;

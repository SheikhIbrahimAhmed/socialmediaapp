import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowPosts = () => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({}); // Store comments per post
    const [loading, setLoading] = useState(true);

    // Fetch all posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/post/get-posts");
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Handle liking a post
    const handleLike = async (postId) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/post/like-post/${postId}`);

            if (response.status === 200) {
                setPosts(posts.map(post => post._id === postId ? { ...post, likes: post.likes + 1 } : post));
            }
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    // Handle commenting on a post
    const handleCommentChange = (postId, value) => {
        setComments({ ...comments, [postId]: value });
    };

    const handleCommentSubmit = async (postId) => {
        const comment = comments[postId];
        if (comment.trim() === "") return;

        try {
            const response = await axios.post(`http://localhost:5000/api/post/comment-post/${postId}`, { comment });
            if (response.status === 200) {
                setPosts(posts.map(post => post._id === postId ? { ...post, comments: [...post.comments, response.data] } : post));
                setComments({ ...comments, [postId]: "" }); // Clear comment input for the specific post
            }
        } catch (error) {
            console.error("Error commenting on post:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-semibold text-center mb-6 text-gray-800">Posts</h1>
            {loading ? (
                <p className="text-center text-lg text-gray-500">Loading posts...</p>
            ) : (
                posts.map(post => (
                    <div key={post._id} className="post bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:scale-105">
                        <div className="flex items-center mb-4">
                            <div className="mr-3 w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                {/* <span className="font-semibold text-lg">{post.userName}</span> */}
                            </div>
                            <div>
                                <h3 className="font-semibold text-xl text-gray-800">{post.userName}</h3>
                                <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
                            </div>
                        </div>

                        <p className="text-gray-700 mb-4 font-bold">{post.caption}</p>
                        <p className="text-gray-600 mb-6">{post.description}</p>

                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={() => handleLike(post._id)}
                                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="mr-2">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                                Like ({post.likes})
                            </button>
                        </div>

                        <div className="comments mt-4">
                            <div className="flex mb-4">
                                <input
                                    type="text"
                                    value={comments[post._id] || ""}
                                    onChange={(e) => handleCommentChange(post._id, e.target.value)}
                                    className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Add a comment..."
                                />
                                <button
                                    onClick={() => handleCommentSubmit(post._id)}
                                    className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition duration-300"
                                >
                                    Comment
                                </button>
                            </div>

                            <div className="comment-list">
                                {post.comments.map((comment, index) => (
                                    <div key={index} className="comment py-2 px-4 border-b border-gray-200">
                                        <p className="font-semibold text-gray-800">{comment.user.name}</p>
                                        <p className="text-gray-600">{comment.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ShowPosts;
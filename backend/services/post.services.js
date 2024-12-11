const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const getAllPosts = async () => {
    try {
        const posts = await Post.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
                }
            },
            {
                $lookup: {
                    from: 'users', // To fetch details of users who commented
                    localField: 'comments.commentedBy',
                    foreignField: '_id',
                    as: 'commenters'
                }
            },
            {
                $addFields: {
                    comments: {
                        $map: {
                            input: '$comments',
                            as: 'comment',
                            in: {
                                _id: '$$comment._id',
                                comment: '$$comment.comment',
                                commentedBy: '$$comment.commentedBy', // Include user ID
                                commentedByUserName: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: '$commenters',
                                                as: 'commenter',
                                                cond: {
                                                    $eq: ['$$commenter._id', '$$comment.commentedBy']
                                                }
                                            }
                                        },
                                        0
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'likes'
                }
            },
            {
                $lookup: {
                    from: 'users', // To fetch details of users who liked the post
                    localField: 'likes.likedBy',
                    foreignField: '_id',
                    as: 'likers'
                }
            },
            {
                $addFields: {
                    likes: {
                        $map: {
                            input: '$likes',
                            as: 'like',
                            in: {
                                _id: '$$like._id',
                                likedBy: '$$like.likedBy', // Include user ID
                                likedByUserName: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: '$likers',
                                                as: 'liker',
                                                cond: {
                                                    $eq: ['$$liker._id', '$$like.likedBy']
                                                }
                                            }
                                        },
                                        0
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    caption: 1,
                    description: 1,
                    createdAt: 1,
                    likes: 1,
                    'user.name': 1,
                    'user._id': 1,
                    comments: {
                        $map: {
                            input: '$comments',
                            as: 'comment',
                            in: {
                                _id: '$$comment._id',
                                comment: '$$comment.comment',
                                commentedBy: '$$comment.commentedBy',
                                commentedByUserName: '$$comment.commentedByUserName.name'
                            }
                        }
                    },
                    likes: {
                        $map: {
                            input: '$likes',
                            as: 'like',
                            in: {
                                _id: '$$like._id',
                                likedBy: '$$like.likedBy',
                                likedByUserName: '$$like.likedByUserName.name'
                            }
                        }
                    }
                }
            }
        ]);

        console.log('All Posts with Comments and Likes:', JSON.stringify(posts, null, 2));
        return posts;
    } catch (error) {
        throw new Error('Error fetching posts, comments, and likes with aggregate');
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

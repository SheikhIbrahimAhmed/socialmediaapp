import React, { useState } from "react";

const PostPage = () => {
    const [caption, setCaption] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Stored user data:", localStorage.getItem("user"));
        const user = JSON.parse(localStorage.getItem("user")); // Fetch the user object from local storage
        if (!user || !user._id) {
            alert("User data not found in local storage!");
            return;
        }

        const postData = {
            userId: user._id,
            userName: user.name,
            caption: caption,
            description: description,
        };

        console.log("Post Submitted:", postData);

        try {
            const response = await fetch("http://localhost:5000/api/auth/create-post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            const data = await response.json();

            if (response.ok) {
                // Handle successful post creation
                alert("Post created successfully!");
                console.log(data);
            } else {
                // Handle errors
                alert(data.error || "Failed to create post");
            }
        } catch (error) {
            console.error("Error creating post:", error);
            alert("An error occurred while creating the post.");
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Create a Post</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Caption Input */}
                    <div>
                        <label
                            htmlFor="caption"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Caption
                        </label>
                        <input
                            type="text"
                            id="caption"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Enter your caption"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter your description"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-300"
                            rows="5"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-200"
                    >
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostPage;

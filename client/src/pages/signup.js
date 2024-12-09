import React, { useState } from "react";
import '../App.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAddUser = async (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page

        const userData = { name, email, password };

        try {
            const response = await axios.post('http://localhost:5000/api/auth/create-user', userData);

            // Check if response status is not OK
            if (response.status !== 200) {
                throw new Error('Failed to create user');
            }

            setUsers((prevUsers) => [...prevUsers, response.data.user]);
            setName('');
            setEmail('');
            setPassword('');
            toast.success("User added successfully!");
        } catch (error) {
            toast.error(`Error adding user: ${error.message}`);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center">SignUp</h2>
                <form onSubmit={handleAddUser} className="mt-6">
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full mt-1 px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full mt-1 px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full mt-1 px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"  // Use submit instead of onClick
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        SignUp
                    </button>
                    <p className="mt-4 text-sm text-center text-gray-600">
                        Go back to?{" "}
                        <a
                            href="/login"
                            className="text-blue-500 hover:underline font-medium"
                        >
                            Login
                        </a>
                    </p>
                </form>
            </div>

            {/* Toast container */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeButton={false}
                className="mt-8" // Tailwind styling
                toastClassName="bg-blue-500 text-white rounded-lg shadow-lg p-4 mb-2" // Success Toast Style
                bodyClassName="text-lg" // Body style
            />
        </div>
    );
}

export default Signup;

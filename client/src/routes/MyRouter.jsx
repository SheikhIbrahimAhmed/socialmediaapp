import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayoutRoutes from "./PublicLayoutRoutes";
import Signup from "../pages/signup";
import Login from "../pages/login";
import ShowPosts from "../pages/showPosts";
import ShowMyPosts from "../pages/showmyposts";
import PostPage from "../pages/postpage";


const MyRouter = () => {
    return (
        <Router>
            <Routes>
                <Route element={<PublicLayoutRoutes />}>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/create-post" element={<PostPage />} />
                    <Route path="/show-posts" element={<ShowPosts />} />
                    <Route path="/show-my-posts" element={<ShowMyPosts />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default MyRouter;
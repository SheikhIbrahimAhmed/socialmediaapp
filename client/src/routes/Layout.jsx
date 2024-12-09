import React from "react";
import Navbar from "../components/navbar";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, hideNavbar }) => {
    return (
        <>
            <Toaster />
            {!hideNavbar && <Navbar />}
            <main className='mt-4'>{children}</main>
            {/* <Footer /> */}
        </>
    );
};

export default Layout;

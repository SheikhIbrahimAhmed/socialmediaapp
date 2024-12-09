import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Layout from "./Layout";

const PublicLayoutRoutes = () => {
    const location = useLocation();

    // Specify routes where the Navbar should not appear
    const hideNavbarRoutes = ["/login", "/signup"];
    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

    return (
        <>
            <Layout hideNavbar={shouldHideNavbar}>
                <Outlet />
            </Layout>
        </>
    );
};

export default PublicLayoutRoutes;

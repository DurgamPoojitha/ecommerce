import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-primary-50 dark:bg-dark-bg font-sans transition-colors duration-200">
            <Navbar />
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <Outlet />
            </main>
            <footer className="w-full py-8 text-center text-sm font-medium text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-dark-border mt-auto">
                &copy; {new Date().getFullYear()} NovaStore Premium Electronics. All rights reserved.
            </footer>
        </div>
    );
};

export default Layout;

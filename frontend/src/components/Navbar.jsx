import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, Package, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-md transition-colors duration-500 bg-white/75 dark:bg-dark-card/80 border-b border-gray-200 dark:border-dark-border shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <Package className="h-7 w-7 text-primary-600 dark:text-primary-500" />
                        <Link to="/" className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            NovaStore
                        </Link>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-sm font-semibold tracking-wide text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Products</Link>
                        {user ? (
                            <>
                                <Link to="/cart" className="relative text-gray-600 hover:text-primary-600 dark:text-gray-300 transition-colors dark:hover:text-primary-400">
                                    <ShoppingCart className="h-5 w-5" />
                                </Link>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-sm font-semibold tracking-wide text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Admin</Link>
                                )}
                                <button onClick={handleLogout} className="text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition-colors" title="Logout">
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-semibold tracking-wide text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Log In</Link>
                                <Link to="/signup" className="text-sm font-semibold tracking-wide px-5 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 shadow-md hover:shadow-lg transition-all">Sign Up</Link>
                            </>
                        )}
                        <div className="h-6 w-px bg-gray-300 dark:bg-dark-border mx-1"></div>
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors shadow-sm">
                            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

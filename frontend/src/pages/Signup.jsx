import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/signup', { username, email, password });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to sign up');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 bg-white dark:bg-dark-card p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-dark-border">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Create Account</h2>
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                    <input
                        type="text" required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                        value={username} onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                    <input
                        type="email" required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                    <input
                        type="password" required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="w-full py-3 px-4 mt-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all">
                    Sign Up
                </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account? <Link to="/login" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">Log in</Link>
            </p>
        </div>
    );
};
export default Signup;

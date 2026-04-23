import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { PackagePlus, Loader2, LayoutDashboard } from 'lucide-react';

const Admin = () => {
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/products/categories/');
                setCategories(data);
                if (data.length > 0) setCategoryId(data[0].id);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/products/', {
                title, description, price: parseFloat(price), stock: parseInt(stock), category_id: parseInt(categoryId)
            });
            alert('Product created successfully');
            setTitle(''); setDescription(''); setPrice(''); setStock('');
        } catch (err) {
            alert('Error creating product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-4">
            <div className="flex items-center gap-5 mb-8">
                <div className="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-[1.2rem]">
                    <LayoutDashboard className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Admin Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your centralized inventory and store metrics.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-dark-card rounded-3xl p-8 lg:p-10 border border-gray-100 dark:border-dark-border shadow-2xl shadow-gray-200/50 dark:shadow-none">
                <h2 className="text-2xl font-bold flex items-center gap-3 mb-8 text-gray-900 dark:text-white border-b border-gray-100 dark:border-dark-border pb-5">
                    <PackagePlus className="w-6 h-6 text-primary-500" />
                    Add New Product
                </h2>

                {categories.length === 0 ? (
                    <div className="p-8 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 rounded-2xl border border-amber-200 dark:border-amber-900/50 text-center font-medium">
                        <span className="block text-xl mb-2 text-amber-900 dark:text-amber-300">Action Required</span>
                        You need to create Categories via the API before adding products.
                    </div>
                ) : (
                    <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Product Title</label>
                            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white outline-none transition-all placeholder-gray-400 shadow-inner" placeholder="E.g., Wireless Noise-Cancelling Headphones" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Detailed Description</label>
                            <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white outline-none transition-all placeholder-gray-400 shadow-inner" placeholder="Highlight key features and specifications..."></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Price (INR)</label>
                            <input type="number" step="0.01" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white outline-none transition-all shadow-inner" placeholder="299.99" />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Initial Stock</label>
                            <input type="number" required value={stock} onChange={(e) => setStock(e.target.value)} className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white outline-none transition-all shadow-inner" placeholder="100" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Category Alignment</label>
                            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white outline-none transition-all cursor-pointer font-medium shadow-inner">
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>

                        <div className="md:col-span-2 mt-8">
                            <button disabled={loading} type="submit" className="w-full py-5 bg-gray-900 dark:bg-primary-600 hover:bg-black dark:hover:bg-primary-500 text-white font-extrabold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 transform hover:-translate-y-1">
                                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <PackagePlus className="w-7 h-7" />}
                                Publish Product to Storefront
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
export default Admin;

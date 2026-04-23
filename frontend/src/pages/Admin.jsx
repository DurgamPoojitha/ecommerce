import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { PackagePlus, Loader2, LayoutDashboard, Settings, Receipt, Trash2, Edit2, CheckCircle } from 'lucide-react';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('add'); // 'add', 'manage', 'transactions'
    const [categories, setCategories] = useState([]);

    // Add Product State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    // Manage Products State
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    // Transactions State
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchCategories();
        if (activeTab === 'manage') fetchProducts();
        if (activeTab === 'transactions') fetchOrders();
    }, [activeTab]);

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/products/categories/');
            setCategories(data);
            if (data.length > 0 && !categoryId) setCategoryId(data[0].id);
        } catch (err) { console.error(err); }
    };

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products/');
            setProducts(data);
        } catch (err) { console.error(err); }
    };

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders/all');
            setOrders(data);
        } catch (err) { console.error(err); }
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/products/', {
                title, description, price: parseFloat(price), stock: parseInt(stock), category_id: parseInt(categoryId), image_url: imageUrl
            });
            alert('Product created successfully');
            setTitle(''); setDescription(''); setPrice(''); setStock(''); setImageUrl('');
        } catch (err) {
            alert('Error creating product');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await api.delete(`/products/${id}`);
            fetchProducts();
        } catch (err) { alert('Error deleting product'); }
    };

    const handleUpdateProduct = async (e, id) => {
        e.preventDefault();
        try {
            await api.put(`/products/${id}`, editingProduct);
            alert('Product updated successfully');
            setEditingProduct(null);
            fetchProducts();
        } catch (err) { alert('Error updating product'); }
    };

    return (
        <div className="max-w-6xl mx-auto mt-4 px-4">
            <div className="flex items-center gap-5 mb-8">
                <div className="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-[1.2rem]">
                    <LayoutDashboard className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Admin Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your centralized inventory, modify products, and view transactions.</p>
                </div>
            </div>

            {/* TABS */}
            <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-dark-border pb-4 overflow-x-auto">
                <button onClick={() => setActiveTab('add')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'add' ? 'bg-primary-600 text-white shadow-lg' : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-50'}`}>
                    <PackagePlus className="w-5 h-5" /> Add Product
                </button>
                <button onClick={() => setActiveTab('manage')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'manage' ? 'bg-primary-600 text-white shadow-lg' : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-50'}`}>
                    <Settings className="w-5 h-5" /> Manage Products
                </button>
                <button onClick={() => setActiveTab('transactions')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'transactions' ? 'bg-primary-600 text-white shadow-lg' : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-50'}`}>
                    <Receipt className="w-5 h-5" /> Transactions
                </button>
            </div>

            <div className="bg-white dark:bg-dark-card rounded-3xl p-8 lg:p-10 border border-gray-100 dark:border-dark-border shadow-2xl shadow-gray-200/50 dark:shadow-none">

                {/* ADD PRODUCT TAB */}
                {activeTab === 'add' && (
                    <>
                        <h2 className="text-2xl font-bold flex items-center gap-3 mb-8 text-gray-900 dark:text-white border-b border-gray-100 dark:border-dark-border pb-5">
                            <PackagePlus className="w-6 h-6 text-primary-500" />
                            Launch New Product
                        </h2>
                        {categories.length === 0 ? (
                            <div className="p-8 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 rounded-2xl text-center">
                                You need to create Categories via the API before adding products.
                            </div>
                        ) : (
                            <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">PRODUCT TITLE</label>
                                    <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white outline-none" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">DESCRIPTION</label>
                                    <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white outline-none"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">PRICE (INR)</label>
                                    <input type="number" step="0.01" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">INITIAL STOCK</label>
                                    <input type="number" required value={stock} onChange={(e) => setStock(e.target.value)} className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">CATEGORY</label>
                                    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white outline-none">
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">IMAGE URL (Optional)</label>
                                    <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white outline-none" />
                                </div>
                                <div className="md:col-span-2 mt-4">
                                    <button disabled={loading} type="submit" className="w-full py-5 bg-gray-900 dark:bg-primary-600 hover:bg-black dark:hover:bg-primary-500 text-white font-extrabold text-lg rounded-2xl flex items-center justify-center gap-3">
                                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <PackagePlus className="w-7 h-7" />}
                                        Publish Product
                                    </button>
                                </div>
                            </form>
                        )}
                    </>
                )}

                {/* MANAGE PRODUCTS TAB */}
                {activeTab === 'manage' && (
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-dark-border pb-5">
                            <Settings className="w-6 h-6 text-primary-500" />
                            Inventory Management
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-gray-200 dark:border-dark-border text-gray-500 dark:text-gray-400">
                                        <th className="pb-4 font-bold text-sm">Product</th>
                                        <th className="pb-4 font-bold text-sm">Price</th>
                                        <th className="pb-4 font-bold text-sm">Stock</th>
                                        <th className="pb-4 font-bold text-sm text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id} className="border-b border-gray-100 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg/50">
                                            <td className="py-4 font-semibold text-gray-900 dark:text-white">
                                                {editingProduct?.id === product.id ?
                                                    <input type="text" className="w-full p-2 border rounded dark:bg-dark-bg dark:border-dark-border" value={editingProduct.title} onChange={e => setEditingProduct({ ...editingProduct, title: e.target.value })} />
                                                    : product.title}
                                            </td>
                                            <td className="py-4 text-primary-600 dark:text-primary-400 font-bold">
                                                {editingProduct?.id === product.id ?
                                                    <input type="number" className="w-24 p-2 border rounded dark:bg-dark-bg dark:border-dark-border" value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })} />
                                                    : `₹${product.price.toFixed(2)}`}
                                            </td>
                                            <td className="py-4 text-gray-600 dark:text-gray-300 font-medium">
                                                {editingProduct?.id === product.id ?
                                                    <input type="number" className="w-24 p-2 border rounded dark:bg-dark-bg dark:border-dark-border" value={editingProduct.stock} onChange={e => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })} />
                                                    : product.stock}
                                            </td>
                                            <td className="py-4 flex justify-end gap-2">
                                                {editingProduct?.id === product.id ? (
                                                    <button onClick={(e) => handleUpdateProduct(e, product.id)} className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg hover:bg-green-200">
                                                        <CheckCircle className="w-5 h-5" />
                                                    </button>
                                                ) : (
                                                    <button onClick={() => setEditingProduct(product)} className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg hover:bg-blue-200">
                                                        <Edit2 className="w-5 h-5" />
                                                    </button>
                                                )}
                                                <button onClick={() => handleDeleteProduct(product.id)} className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg hover:bg-red-200">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* TRANSACTIONS TAB */}
                {activeTab === 'transactions' && (
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-dark-border pb-5">
                            <Receipt className="w-6 h-6 text-primary-500" />
                            Customer Orders
                        </h2>

                        <div className="space-y-4">
                            {orders.length === 0 ? <p className="text-gray-500">No transactions recorded yet.</p> : orders.map(order => (
                                <div key={order.id} className="p-6 bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border rounded-xl flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">Order #{order.id}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                            User ID: {order.user_id} {order.user ? `(${order.user.username} - ${order.user.email})` : ''}
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1">{new Date(order.created_at).toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xl font-black text-primary-600 dark:text-primary-400">₹{order.total_price.toFixed(2)}</span>
                                        <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold rounded-lg uppercase tracking-wider">{order.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Admin;

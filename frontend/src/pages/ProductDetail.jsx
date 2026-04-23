import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, ArrowLeft, Loader2 } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get('/products/');
                const found = data.find(p => p.id === parseInt(id));
                setProduct(found);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCart = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            await api.post('/cart/', { product_id: product.id, quantity });
            alert('Added to cart!');
        } catch (err) {
            alert('Failed to add to cart: ' + err.message);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-[50vh]"><Loader2 className="w-12 h-12 animate-spin text-primary-500" /></div>;
    if (!product) return <div className="text-center mt-32 text-gray-500 dark:text-gray-400 text-2xl font-bold">Product not found</div>;

    return (
        <div className="max-w-5xl mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors font-medium">
                <ArrowLeft className="w-5 h-5" /> Back to Catalog
            </button>

            <div className="flex flex-col md:flex-row gap-12 bg-white dark:bg-dark-card p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-dark-border">
                <div className="w-full md:w-1/2 aspect-square bg-gray-50 dark:bg-dark-bg rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-dark-border relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <ShoppingCart className="w-32 h-32 text-gray-300 dark:text-gray-600 group-hover:scale-110 transition-transform duration-500" />
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">{product.title}</h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                        {product.description || "Designed for uncompromised performance and reliability. Elevate your everyday efficiency with this meticulously crafted piece of modern engineering."}
                    </p>

                    <div className="flex items-end gap-6 mb-10">
                        <span className="text-5xl lg:text-6xl font-black text-primary-600 dark:text-primary-400 tracking-tight">₹{product.price.toFixed(2)}</span>
                        <span className={`px-4 py-2 mb-2 rounded-xl text-sm font-bold shadow-sm ${product.stock > 0 ? 'bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:border-green-800/50 dark:text-green-400' : 'bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/40 dark:border-red-800/50 dark:text-red-400'}`}>
                            {product.stock > 0 ? `${product.stock} Units Available` : 'Out of Stock'}
                        </span>
                    </div>

                    <div className="flex items-center gap-4 mt-auto border-t border-gray-100 dark:border-dark-border pt-8">
                        <div className="flex items-center border-[3px] border-gray-100 dark:border-dark-bg bg-gray-50 dark:bg-dark-bg rounded-2xl overflow-hidden shadow-inner">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-6 py-4 text-xl font-black text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-border transition-colors">-</button>
                            <span className="px-6 py-4 font-bold text-gray-900 dark:text-white min-w-[3rem] text-center">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="px-6 py-4 text-xl font-black text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-border transition-colors">+</button>
                        </div>
                        <button
                            onClick={addToCart}
                            disabled={product.stock === 0}
                            className="flex-1 flex justify-center items-center gap-3 py-5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-primary-500/30 hover:-translate-y-1 transition-all duration-300"
                        >
                            <ShoppingCart className="w-6 h-6" /> {product.stock > 0 ? "Add to Cart" : "Unavailable"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductDetail;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { ShoppingBag, Loader2 } from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products/');
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-64 text-primary-600">
            <Loader2 className="h-10 w-10 animate-spin mb-4" />
            <span className="text-lg font-medium text-gray-600 dark:text-gray-400">Loading catalog...</span>
        </div>
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end mb-10 gap-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Our Collection</h1>
                    <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg">Discover the latest premium electronics and gear.</p>
                </div>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-dark-card rounded-2xl border border-dashed border-gray-300 dark:border-dark-border">
                    <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">No products found</h3>
                    <p className="text-gray-500">Check back later or contact an administrator to add inventory.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Link key={product.id} to={`/products/${product.id}`} className="group bg-white dark:bg-dark-card rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-dark-border hover:shadow-xl hover:border-primary-100 dark:hover:border-primary-900 transition-all duration-300 transform hover:-translate-y-1 block">
                            <div className="aspect-square w-full bg-gray-50 dark:bg-dark-bg rounded-xl mb-5 flex items-center justify-center overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500">
                                {product.image_url ? (
                                    <img src={product.image_url} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                ) : (
                                    <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-600 group-hover:scale-110 group-hover:text-primary-300 transition-all duration-500" />
                                )}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{product.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 h-10">{product.description || "Premium high-quality technical product with robust features."}</p>
                            <div className="flex justify-between items-center border-t border-gray-100 dark:border-dark-border pt-4 mt-auto">
                                <span className="text-xl font-extrabold text-primary-600 dark:text-primary-400">₹{product.price.toFixed(2)}</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded-md ${product.stock > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                    {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
export default Products;

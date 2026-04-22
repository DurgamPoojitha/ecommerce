import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Trash2, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const fetchCart = async () => {
        const { data } = await api.get('/cart/');
        setCartItems(data);
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleRemove = async (id) => {
        await api.delete(`/cart/${id}`);
        fetchCart();
    };

    const handleCheckout = async () => {
        try {
            await api.post('/orders/');
            alert('Order placed successfully!');
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.detail || 'Checkout failed');
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-dark-card rounded-2xl border border-dashed border-gray-300 dark:border-dark-border text-gray-500">
                    Your cart is empty.
                </div>
            ) : (
                <div className="space-y-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-6 bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border">
                            <div className="flex items-center gap-6">
                                <div className="h-20 w-20 bg-gray-100 dark:bg-dark-bg rounded-lg"></div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Product #{item.product_id}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <button onClick={() => handleRemove(item.id)} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-full transition-colors">
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                    <div className="flex justify-end mt-8">
                        <button onClick={handleCheckout} className="flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
                            <CreditCard className="h-5 w-5" />
                            Checkout Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Cart;

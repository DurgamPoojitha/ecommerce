import React, { useState } from 'react';
import { CreditCard, QrCode, X, ShieldCheck, Loader2 } from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose, onComplete, totalAmount }) => {
    const [method, setMethod] = useState('card'); // 'card' or 'upi'
    const [loading, setLoading] = useState(false);

    // Card state
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    if (!isOpen) return null;

    const handleCardNumberFormat = (e) => {
        const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = val.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            setCardNumber(parts.join(' '));
        } else {
            setCardNumber(val);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onComplete();
        }, 1500); // mock network delay
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-dark-card w-full max-w-lg rounded-3xl shadow-2xl border border-gray-100 dark:border-dark-border overflow-hidden transform transition-all">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-bg">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-green-500" />
                        Secure Checkout
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex gap-4 mb-8">
                        <button onClick={() => setMethod('card')} className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-2xl font-bold transition-all border-2 ${method === 'card' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'border-gray-200 dark:border-dark-border text-gray-500 hover:bg-gray-50 dark:hover:bg-dark-bg'}`}>
                            <CreditCard className="w-6 h-6" />
                            Credit/Debit Card
                        </button>
                        <button onClick={() => setMethod('upi')} className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-2xl font-bold transition-all border-2 ${method === 'upi' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'border-gray-200 dark:border-dark-border text-gray-500 hover:bg-gray-50 dark:hover:bg-dark-bg'}`}>
                            <QrCode className="w-6 h-6" />
                            UPI QR Scan
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {method === 'card' ? (
                            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Card Number</label>
                                    <input type="text" required maxLength="19" value={cardNumber} onChange={handleCardNumberFormat} placeholder="0000 0000 0000 0000" className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white font-mono tracking-widest outline-none transition-all" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
                                        <input type="text" required placeholder="MM/YY" maxLength="5" value={expiry} onChange={(e) => setExpiry(e.target.value)} className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white outline-none transition-all text-center" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">CVV</label>
                                        <input type="password" required maxLength="4" placeholder="***" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))} className="w-full px-5 py-4 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white outline-none transition-all text-center tracking-widest font-mono" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-6 animate-in fade-in zoom-in-95 duration-300">
                                <div className="p-4 bg-white rounded-2xl shadow-lg border border-gray-200 mb-4 inline-block">
                                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=merchant@upi&pn=EcommerceStore&am=${totalAmount}&cu=INR`} alt="UPI QR Code" className="w-48 h-48" />
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-center font-medium">Scan this QR Code with any UPI App<br />(GPay, PhonePe, Paytm)</p>
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-dark-border flex justify-between items-center">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-bold">Total to Pay</p>
                                <p className="text-3xl font-black text-gray-900 dark:text-white">₹{totalAmount.toFixed(2)}</p>
                            </div>
                            <button disabled={loading} type="submit" className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : null}
                                Pay Securely
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;

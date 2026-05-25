react
import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Menu, ArrowRight, ChevronRight, CheckCircle2, Globe, CreditCard, Bitcoin, Wallet, LayoutDashboard, Package, Settings, Copy } from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_PRODUCTS = [
{
id: 1,
name: 'Ivory Textured Zip Polo',
priceNGN: 45000,
image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
category: 'Tops',
stock: 15,
description: 'Minimalist luxury. Clean lines, premium textured fabric, and a flawless gold-zipper finish. Perfect for the modern man.'
},
{
id: 2,
name: 'Earth-Tone Jacquard Shirt',
priceNGN: 52000,
image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
category: 'Tops',
stock: 8,
description: 'Earth tones meet high fashion. The texture on this piece speaks for itself. Effortless luxury for your next link-up.'
},
{
id: 3,
name: 'Cobalt Ribbed Polo',
priceNGN: 48000,
image: 'https://images.unsplash.com/photo-1588359348347-9bc6cbb6826a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
category: 'Tops',
stock: 20,
description: 'Make a statement without saying a word. This rich royal blue textured piece balances classic casual with pure sophistication.'
},
{
id: 4,
name: 'Signature Monogram Co-ord Set',
priceNGN: 135000,
image: 'https://images.unsplash.com/photo-1593030736224-ca44b70db65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
category: 'Sets',
stock: 4,
description: 'The Ultimate Power Suit. Fully tailored monogram jacket paired with matching statement trousers. Designed for the 1% mindset.'
},
{
id: 5,
name: 'Classic Monogram Trousers',
priceNGN: 65000,
image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
category: 'Bottoms',
stock: 12,
description: 'Standalone trousers featuring the signature Topxy monogram. Perfect to pair with solid tees or the matching jacket.'
}
];

const EXCHANGE_RATE = 1450; // 1 USD = 1450 NGN
const BTC_RATE = 65000; // Mock 1 BTC = $65,000 USD for demo purposes

export default function App() {
// Store State
const [currentView, setCurrentView] = useState('home'); // home, shop, product, checkout, admin
const [products, setProducts] = useState(INITIAL_PRODUCTS);
const [selectedProduct, setSelectedProduct] = useState(null);
const [cart, setCart] = useState([]);
const [isCartOpen, setIsCartOpen] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [currency, setCurrency] = useState('NGN');

// Admin & Crypto State
const [isAdmin, setIsAdmin] = useState(false);
const [mockOrders, setMockOrders] = useState([]);
const [walletAddresses, setWalletAddresses] = useState({
USDT: 'TXYZ1234567890abcdefghijklmnopqrstuvwxyz', // Default placeholder TRC20
BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' // Default placeholder BTC
});

useEffect(() => {
window.scrollTo(0, 0);
}, [currentView, selectedProduct]);

// --- UTILS ---
const formatPrice = (priceInNGN) => {
if (currency === 'USD') return `$${(priceInNGN / EXCHANGE_RATE).toFixed(2)}`;
return `₦${priceInNGN.toLocaleString()}`;
};

const getUSDTPrice = (priceInNGN) => (priceInNGN / EXCHANGE_RATE).toFixed(2);
const getBTCPrice = (priceInNGN) => ((priceInNGN / EXCHANGE_RATE) / BTC_RATE).toFixed(6);

const getCartTotal = () => cart.reduce((total, item) => total + (item.priceNGN * item.quantity), 0);
const getCartCount = () => cart.reduce((total, item) => total + item.quantity, 0);

const addToCart = (product, size) => {
setCart(prev => {
const existing = prev.find(item => item.id === product.id && item.size === size);
if (existing) return prev.map(item => item.id === product.id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item);
return [...prev, { ...product, size, quantity: 1 }];
});
setIsCartOpen(true);
};

const removeFromCart = (productId, size) => setCart(prev => prev.filter(item => !(item.id === productId && item.size === size)));

const handleCopyToClipboard = (text) => {
navigator.clipboard.writeText(text);
alert('Copied to clipboard!'); // Simplified for preview
};

// --- NAVIGATION COMPONENT ---
const Navigation = () => {
if (isAdmin) return null; // Hide standard nav in Admin mode

return (
<nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex justify-between items-center h-20">
<div className="flex items-center md:hidden">
<button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-900 focus:outline-none">
{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
</button>
</div>
<div className="flex-shrink-0 flex items-center justify-center cursor-pointer" onClick={() => setCurrentView('home')}>
<h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tighter text-black uppercase">
Topxy<span className="font-light italic text-gray-500 lowercase">bespoke</span>
</h1>
</div>
<div className="hidden md:flex space-x-8 items-center">
<button onClick={() => setCurrentView('home')} className={`text-sm tracking-widest uppercase transition-colors ${currentView === 'home' ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}`}>Home</button>
<button onClick={() => setCurrentView('shop')} className={`text-sm tracking-widest uppercase transition-colors ${currentView === 'shop' ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}`}>Collection</button>
</div>
<div className="flex items-center space-x-4 md:space-x-6">
<button onClick={() => setCurrency(currency === 'NGN' ? 'USD' : 'NGN')} className="flex items-center text-xs font-semibold tracking-wider text-gray-500 hover:text-black transition-colors" title="Toggle Currency">
<Globe size={16} className="mr-1" /> {currency}
</button>
<button className="relative text-gray-900" onClick={() => setIsCartOpen(true)}>
<ShoppingBag size={24} strokeWidth={1.5} />
{getCartCount() > 0 && <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{getCartCount()}</span>}
</button>
</div>
</div>
</div>
{isMobileMenuOpen && (
<div className="md:hidden bg-white border-b border-gray-100 absolute w-full left-0 shadow-lg">
<div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
<button onClick={() => { setCurrentView('home'); setIsMobileMenuOpen(false); }} className="text-left text-lg font-medium text-gray-900 border-b border-gray-50 pb-2">Home</button>
<button onClick={() => { setCurrentView('shop'); setIsMobileMenuOpen(false); }} className="text-left text-lg font-medium text-gray-900 border-b border-gray-50 pb-2">The Collection</button>
</div>
</div>
)}
</nav>
);
};

// --- CART SLIDE-OVER ---
const CartDrawer = () => (
<div className={`fixed inset-0 z-[60] flex justify-end transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
<div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
<div className={`relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
<div className="flex items-center justify-between p-6 border-b border-gray-100">
<h2 className="text-xl font-serif tracking-wide text-black">Your Cart ({getCartCount()})</h2>
<button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-black transition-colors"><X size={24} /></button>
</div>
<div className="flex-1 overflow-y-auto p-6">
{cart.length === 0 ? (
<div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-500">
<ShoppingBag size={48} strokeWidth={1} className="text-gray-300" />
<p>Your shopping bag is empty.</p>
<button onClick={() => { setIsCartOpen(false); setCurrentView('shop'); }} className="mt-4 px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors text-sm tracking-widest uppercase">Discover Pieces</button>
</div>
) : (
<div className="space-y-6">
{cart.map((item, idx) => (
<div key={idx} className="flex gap-4">
<div className="h-24 w-20 flex-shrink-0 overflow-hidden bg-gray-100">
<img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
</div>
<div className="flex-1 flex flex-col">
<div className="flex justify-between text-sm font-medium text-gray-900">
<h3 className="pr-4">{item.name}</h3>
<p className="ml-4">{formatPrice(item.priceNGN * item.quantity)}</p>
</div>
<p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
<div className="flex flex-1 items-end justify-between text-sm">
<p className="text-gray-500">Qty {item.quantity}</p>
<button type="button" onClick={() => removeFromCart(item.id, item.size)} className="font-medium text-red-600 hover:text-red-500">Remove</button>
</div>
</div>
</div>
))}
</div>
)}
</div>
{cart.length > 0 && (
<div className="border-t border-gray-100 p-6 bg-gray-50">
<div className="flex justify-between text-base font-medium text-gray-900 mb-4"><p>Subtotal</p><p>{formatPrice(getCartTotal())}</p></div>
<button onClick={() => { setIsCartOpen(false); setCurrentView('checkout'); }} className="w-full flex items-center justify-center rounded-none border border-transparent bg-black px-6 py-4 text-sm tracking-widest uppercase font-medium text-white shadow-sm hover:bg-gray-900">Proceed to Checkout</button>
</div>
)}
</div>
</div>
);

// --- VIEWS ---
const HomeView = () => (
<div className="animate-in fade-in duration-700">
<div className="relative h-[80vh] w-full bg-gray-900 flex items-center justify-center overflow-hidden">
<img src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Luxury Fashion" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
<div className="relative z-10 text-center px-4">
<p className="text-white/80 tracking-[0.2em] uppercase text-sm mb-4">New Collection 2026</p>
<h2 className="text-5xl md:text-7xl font-serif text-white mb-8">Redefining<br/>Modern Tailoring.</h2>
<button onClick={() => setCurrentView('shop')} className="group inline-flex items-center bg-white text-black px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-gray-100 transition-all">Explore the Collection <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></button>
</div>
</div>
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
<h3 className="font-serif text-3xl md:text-4xl text-black mb-6">Crafted for the 1%</h3>
<p className="max-w-2xl mx-auto text-gray-500 text-lg">At Topxy Bespoke, we fuse premium fabrics with meticulous tailoring to create pieces that speak before you do.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-7xl mx-auto px-4 pb-24">
{products.slice(0, 2).map((prod) => (
<div key={prod.id} className="relative aspect-[3/4] group overflow-hidden cursor-pointer bg-gray-100" onClick={() => { setSelectedProduct(prod); setCurrentView('product'); }}>
<img src={prod.image} alt={prod.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" />
<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
<h4 className="text-white text-2xl font-serif">{prod.name}</h4>
<p className="text-white/80 mt-2 font-medium tracking-wide">{formatPrice(prod.priceNGN)}</p>
</div>
</div>
))}
</div>
</div>
);

const ShopView = () => {
const [activeFilter, setActiveFilter] = useState('All');
const categories = ['All', 'Tops', 'Bottoms', 'Sets'];
const filteredProducts = activeFilter === 'All' ? products : products.filter(p => p.category === activeFilter);

return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-500">
<div className="mb-8 border-b border-gray-200 pb-8 text-center">
<h2 className="text-4xl font-serif text-black mb-4">The Collection</h2>
<div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8">
{categories.map(cat => (
<button key={cat} onClick={() => setActiveFilter(cat)} className={`px-5 py-2 text-xs sm:text-sm font-medium tracking-wider uppercase transition-colors border ${activeFilter === cat ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-600 hover:border-black'}`}>{cat}</button>
))}
</div>
</div>
<div className="mb-6 flex justify-between items-center text-sm text-gray-500 font-medium">
<p>Showing {filteredProducts.length} {activeFilter === 'All' ? 'products' : activeFilter.toLowerCase()}</p>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
{filteredProducts.map((product) => (
<div key={product.id} className="group cursor-pointer flex flex-col" onClick={() => { setSelectedProduct(product); setCurrentView('product'); }}>
<div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
<img src={product.image} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
<div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-black">{product.stock} In Stock</div>
</div>
<h3 className="text-sm text-gray-900 font-medium mb-1">{product.name}</h3>
<p className="text-sm text-gray-500 mt-auto">{formatPrice(product.priceNGN)}</p>
</div>
))}
</div>
</div>
);
};

const ProductDetailView = () => {
const [selectedSize, setSelectedSize] = useState('M');
if (!selectedProduct) return null;

return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in slide-in-from-bottom-8 duration-500">
<button onClick={() => setCurrentView('shop')} className="flex items-center text-sm text-gray-500 hover:text-black mb-8 transition-colors">
<ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Back to Collection
</button>
<div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
<div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-8 lg:mb-0">
<img src={selectedProduct.image} alt={selectedProduct.name} className="object-cover w-full h-full" />
</div>
<div className="flex flex-col pt-4">
<h1 className="text-3xl sm:text-4xl font-serif text-gray-900 mb-4">{selectedProduct.name}</h1>
<p className="text-xl text-gray-900 mb-4">{formatPrice(selectedProduct.priceNGN)}</p>
<div className="flex items-center space-x-2 mb-8 bg-gray-50 w-fit px-4 py-2 rounded-full border border-gray-100">
<span className="relative flex h-2.5 w-2.5">
<span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${selectedProduct.stock > 0 ? 'bg-green-400' : 'bg-red-400'}`}></span>
<span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${selectedProduct.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
</span>
<p className="text-xs font-semibold tracking-wide uppercase text-gray-700">{selectedProduct.stock > 0 ? `${selectedProduct.stock} Available` : 'Sold Out'}</p>
</div>
<div className="prose prose-sm text-gray-500 mb-10 border-b border-gray-100 pb-10"><p>{selectedProduct.description}</p></div>
<div className="mb-8">
<div className="flex justify-between items-center mb-4"><h3 className="text-sm font-medium text-gray-900 tracking-wide">Size</h3></div>
<div className="grid grid-cols-4 gap-4">
{['S', 'M', 'L', 'XL'].map(size => (
<button key={size} onClick={() => setSelectedSize(size)} className={`py-3 text-sm font-medium border transition-colors ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-900 hover:border-black'}`}>{size}</button>
))}
</div>
</div>
<button onClick={() => addToCart(selectedProduct, selectedSize)} className="w-full bg-black text-white py-4 text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors" disabled={selectedProduct.stock === 0}>
{selectedProduct.stock > 0 ? 'Add to Bag' : 'Sold Out'}
</button>
</div>
</div>
</div>
);
};

const CheckoutView = () => {
const [step, setStep] = useState('form'); 
const [paymentMethod, setPaymentMethod] = useState('crypto'); // 'card' or 'crypto'
const [cryptoType, setCryptoType] = useState('USDT'); // 'USDT' or 'BTC'
const [txHash, setTxHash] = useState('');
const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', country: 'Nigeria' });

const totalNGN = getCartTotal();
const totalStr = formatPrice(totalNGN);

const handleCheckoutSubmit = (e) => {
e.preventDefault();
if (paymentMethod === 'crypto' && !txHash) {
alert("Please enter your transaction hash to verify payment.");
return;
}

setStep('processing');
// Mock order creation for Admin panel
const newOrder = {
id: `ORD-${Math.floor(Math.random() * 10000)}`,
customer: `${formData.firstName} ${formData.lastName}`,
date: new Date().toLocaleDateString(),
total: totalStr,
status: paymentMethod === 'crypto' ? 'Pending Verification' : 'Paid',
method: paymentMethod === 'crypto' ? cryptoType : 'Card'
};

setTimeout(() => {
setMockOrders([newOrder, ...mockOrders]);
setCart([]);
setStep('success');
}, 3000);
};

if (cart.length === 0 && step === 'form') return <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4"><p className="text-xl font-serif mb-4">Your cart is empty.</p><button onClick={() => setCurrentView('shop')} className="underline">Return to Shop</button></div>;

if (step === 'processing') return <div className="min-h-[60vh] flex flex-col items-center justify-center"><div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-6"></div><p className="text-lg font-serif">Processing your order...</p></div>;

if (step === 'success') return (
<div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4 animate-in zoom-in duration-500">
<CheckCircle2 size={64} className="text-green-600 mb-6" />
<h2 className="text-4xl font-serif text-black mb-4">Order Received.</h2>
<p className="text-gray-600 max-w-md mx-auto mb-8">Thank you, {formData.firstName}. {paymentMethod === 'crypto' ? "We are verifying your crypto transaction. Once confirmed on the blockchain, we will begin preparing your bespoke order." : "Your order has been confirmed."}</p>
<button onClick={() => setCurrentView('home')} className="border border-black px-8 py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors">Back to Home</button>
</div>
);

return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
<h1 className="text-3xl font-serif text-black mb-10">Checkout</h1>
<div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
<div className="lg:col-span-7 mb-10 lg:mb-0">
<form onSubmit={handleCheckoutSubmit} className="space-y-8">
{/* Shipping Details form - simplified for code brevity */}
<div>
<h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">Shipping Details</h2>
<div className="grid grid-cols-2 gap-4">
<input required placeholder="First Name" className="border p-3 focus:border-black" onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
<input required placeholder="Last Name" className="border p-3 focus:border-black" onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
<input required placeholder="Email" type="email" className="col-span-2 border p-3 focus:border-black" onChange={(e) => setFormData({...formData, email: e.target.value})} />
<input required placeholder="Address" className="col-span-2 border p-3 focus:border-black" onChange={(e) => setFormData({...formData, address: e.target.value})} />
</div>
</div>

{/* PAYMENT METHOD SELECTOR */}
<div>
<h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">Payment Method</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
<div 
onClick={() => setPaymentMethod('card')}
className={`border p-4 cursor-pointer flex flex-col items-center justify-center transition-colors ${paymentMethod === 'card' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
>
<CreditCard size={28} className="mb-2 text-gray-700" />
<span className="text-sm font-medium">Credit / Debit Card</span>
</div>
<div 
onClick={() => setPaymentMethod('crypto')}
className={`border p-4 cursor-pointer flex flex-col items-center justify-center transition-colors ${paymentMethod === 'crypto' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
>
<Bitcoin size={28} className="mb-2 text-gray-700" />
<span className="text-sm font-medium">Cryptocurrency</span>
</div>
</div>

{/* CRYPTO PAYMENT UI */}
{paymentMethod === 'crypto' && (
<div className="bg-gray-50 p-6 border border-gray-200 animate-in fade-in">
<h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-center">Select Crypto</h3>
<div className="flex justify-center space-x-4 mb-6">
<button type="button" onClick={() => setCryptoType('USDT')} className={`px-6 py-2 border text-sm font-medium ${cryptoType === 'USDT' ? 'bg-black text-white border-black' : 'bg-white border-gray-300'}`}>USDT (TRC20)</button>
<button type="button" onClick={() => setCryptoType('BTC')} className={`px-6 py-2 border text-sm font-medium ${cryptoType === 'BTC' ? 'bg-black text-white border-black' : 'bg-white border-gray-300'}`}>Bitcoin (BTC)</button>
</div>

<div className="bg-white p-4 border border-gray-200 text-center mb-6">
<p className="text-sm text-gray-500 mb-1">Amount to Send:</p>
<p className="text-2xl font-serif text-black font-bold">
{cryptoType === 'USDT' ? `${getUSDTPrice(totalNGN)} USDT` : `${getBTCPrice(totalNGN)} BTC`}
</p>
</div>

<div className="mb-6">
<p className="text-sm text-gray-500 mb-2">Send exactly the amount above to this wallet address:</p>
<div className="flex items-center bg-white border border-gray-300 p-3">
<code className="flex-1 text-xs break-all text-gray-800">{walletAddresses[cryptoType]}</code>
<button type="button" onClick={() => handleCopyToClipboard(walletAddresses[cryptoType])} className="ml-2 text-gray-400 hover:text-black">
<Copy size={18} />
</button>
</div>
</div>

<div>
<label className="block text-sm font-medium text-gray-700 mb-2">Transaction Hash (TXID)</label>
<input 
required 
type="text" 
placeholder="Paste your transaction hash here after sending..." 
className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black"
onChange={(e) => setTxHash(e.target.value)}
/>
<p className="text-xs text-gray-500 mt-2">Required. We use this to verify your payment on the blockchain.</p>
</div>
</div>
)}
</div>

<button type="submit" className="w-full bg-black text-white py-4 text-sm font-bold tracking-widest uppercase hover:bg-gray-800 shadow-lg">
{paymentMethod === 'crypto' ? 'Submit Order for Verification' : `Pay ${totalStr}`}
</button>
</form>
</div>

{/* Order Summary sidebar (Abbreviated) */}
<div className="lg:col-span-5">
<div className="bg-gray-50 p-6 sticky top-28 border border-gray-100">
<h2 className="text-lg font-medium mb-6 border-b pb-2">Order Summary</h2>
{cart.map((item, idx) => (
<div key={idx} className="flex gap-4 mb-4">
<div className="h-16 w-12 bg-white flex-shrink-0 relative">
<img src={item.image} alt={item.name} className="h-full w-full object-cover" />
</div>
<div className="flex-1"><h4 className="text-sm font-medium">{item.name}</h4></div>
<p className="text-sm">{formatPrice(item.priceNGN * item.quantity)}</p>
</div>
))}
<div className="border-t pt-4 mt-4 flex justify-between font-bold"><p>Total</p><p>{totalStr}</p></div>
</div>
</div>
</div>
</div>
);
};

// --- ADMIN OWNER DASHBOARD VIEW ---
const AdminDashboard = () => {
const [activeTab, setActiveTab] = useState('overview'); // overview, products, settings
const [localWallets, setLocalWallets] = useState(walletAddresses);

const handleSaveWallets = (e) => {
e.preventDefault();
setWalletAddresses(localWallets);
alert('Wallet Addresses Saved Successfully!');
};

return (
<div className="min-h-screen bg-gray-50 flex flex-col md:flex-row animate-in fade-in">
{/* Admin Sidebar */}
<div className="w-full md:w-64 bg-black text-white p-6 flex flex-col">
<h2 className="font-serif text-2xl tracking-tighter uppercase mb-10">Topxy<span className="font-light italic text-gray-400 lowercase">admin</span></h2>
<nav className="space-y-4 flex-1">
<button onClick={() => setActiveTab('overview')} className={`flex items-center w-full p-3 rounded text-sm font-medium ${activeTab === 'overview' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><LayoutDashboard size={18} className="mr-3" /> Dashboard</button>
<button onClick={() => setActiveTab('products')} className={`flex items-center w-full p-3 rounded text-sm font-medium ${activeTab === 'products' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><Package size={18} className="mr-3" /> Products</button>
<button onClick={() => setActiveTab('settings')} className={`flex items-center w-full p-3 rounded text-sm font-medium ${activeTab === 'settings' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><Settings size={18} className="mr-3" /> Settings & Wallets</button>
</nav>
<button onClick={() => { setIsAdmin(false); setCurrentView('home'); }} className="mt-auto border border-gray-700 p-3 text-sm text-gray-400 hover:text-white text-center w-full rounded">Back to Store</button>
</div>

{/* Admin Content */}
<div className="flex-1 p-8">
{activeTab === 'overview' && (
<div>
<h1 className="text-3xl font-serif mb-8">Dashboard Overview</h1>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
<div className="bg-white p-6 border shadow-sm"><p className="text-gray-500 text-sm mb-2">Total Sales</p><p className="text-3xl font-serif">₦0.00</p></div>
<div className="bg-white p-6 border shadow-sm"><p className="text-gray-500 text-sm mb-2">Pending Crypto Orders</p><p className="text-3xl font-serif">{mockOrders.filter(o => o.status === 'Pending Verification').length}</p></div>
<div className="bg-white p-6 border shadow-sm"><p className="text-gray-500 text-sm mb-2">Low Stock Items</p><p className="text-3xl font-serif">{products.filter(p => p.stock < 5).length}</p></div>
</div>
<h2 className="text-xl font-medium mb-4">Recent Orders</h2>
<div className="bg-white border rounded overflow-hidden">
{mockOrders.length === 0 ? <p className="p-6 text-gray-500 text-center">No recent orders.</p> : (
<table className="w-full text-left text-sm">
<thead className="bg-gray-50 border-b"><tr><th className="p-4">Order ID</th><th className="p-4">Customer</th><th className="p-4">Total</th><th className="p-4">Method</th><th className="p-4">Status</th></tr></thead>
<tbody>
{mockOrders.map(order => (
<tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
<td className="p-4 font-medium">{order.id}</td><td className="p-4">{order.customer}</td><td className="p-4">{order.total}</td>
<td className="p-4"><span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold">{order.method}</span></td>
<td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold ${order.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status}</span></td>
</tr>
))}
</tbody>
</table>
)}
</div>
</div>
)}

{activeTab === 'products' && (
<div>
<div className="flex justify-between items-center mb-8">
<h1 className="text-3xl font-serif">Manage Inventory</h1>
<button className="bg-black text-white px-4 py-2 text-sm font-medium rounded">+ Add New Product</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{products.map(p => (
<div key={p.id} className="bg-white border p-4 flex gap-4">
<img src={p.image} className="w-20 h-24 object-cover" />
<div>
<h3 className="text-sm font-bold mb-1">{p.name}</h3>
<p className="text-xs text-gray-500 mb-2">{formatPrice(p.priceNGN)}</p>
<span className={`text-xs font-bold px-2 py-1 rounded ${p.stock > 5 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>Stock: {p.stock}</span>
</div>
</div>
))}
</div>
</div>
)}

{activeTab === 'settings' && (
<div className="max-w-2xl">
<h1 className="text-3xl font-serif mb-8">Store Settings</h1>
<div className="bg-white border p-6 rounded shadow-sm">
<div className="flex items-center mb-6 border-b pb-4">
<Wallet className="mr-3 text-gray-400" />
<h2 className="text-xl font-medium">Cryptocurrency Wallets</h2>
</div>
<p className="text-sm text-gray-500 mb-6">Enter your wallet addresses here. When a customer chooses to pay with crypto, these addresses will be shown to them during checkout.</p>

<form onSubmit={handleSaveWallets} className="space-y-6">
<div>
<label className="block text-sm font-bold text-gray-700 mb-2">USDT Wallet Address (TRC20 network recommended)</label>
<input 
type="text" 
value={localWallets.USDT}
onChange={(e) => setLocalWallets({...localWallets, USDT: e.target.value})}
className="w-full border p-3 focus:border-black font-mono text-sm" 
/>
</div>
<div>
<label className="block text-sm font-bold text-gray-700 mb-2">Bitcoin (BTC) Wallet Address</label>
<input 
type="text" 
value={localWallets.BTC}
onChange={(e) => setLocalWallets({...localWallets, BTC: e.target.value})}
className="w-full border p-3 focus:border-black font-mono text-sm" 
/>
</div>
<button type="submit" className="bg-black text-white px-6 py-3 text-sm font-medium rounded hover:bg-gray-800">Save Wallet Addresses</button>
</form>
</div>
</div>
)}
</div>
</div>
);
};

if (isAdmin) return <AdminDashboard />;

return (
<div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-200">
<Navigation />
<CartDrawer />
<main>
{currentView === 'home' && <HomeView />}
{currentView === 'shop' && <ShopView />}
{currentView === 'product' && <ProductDetailView />}
{currentView === 'checkout' && <CheckoutView />}
</main>

<footer className="bg-black text-white mt-20">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center md:text-left">
<p className="text-gray-400 text-sm mb-8">Lagos, Nigeria. Delivering premium tailored experiences locally and worldwide.</p>
<div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
<p>&copy; 2026 Topxy Bespoke. All rights reserved.</p>
{/* ADMIN LOGIN TOGGLE */}
<button onClick={() => setIsAdmin(true)} className="mt-4 md:mt-0 text-gray-600 hover:text-white underline">Owner / Admin Login</button>
</div>
</div>
</footer>
</div>
);
}

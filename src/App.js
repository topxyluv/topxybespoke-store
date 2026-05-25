import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Menu, ArrowRight, ChevronRight, CheckCircle2, Globe, CreditCard, Bitcoin, Wallet, LayoutDashboard, Package, Settings, Copy } from 'lucide-react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Ivory Textured Zip Polo', priceNGN: 45000, image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Tops', stock: 15, description: 'Minimalist luxury.' },
  { id: 2, name: 'Earth-Tone Jacquard Shirt', priceNGN: 52000, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Tops', stock: 8, description: 'Earth tones.' },
  { id: 3, name: 'Cobalt Ribbed Polo', priceNGN: 48000, image: 'https://images.unsplash.com/photo-1588359348347-9bc6cbb6826a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Tops', stock: 20, description: 'Royal sophistication.' },
  { id: 4, name: 'Signature Monogram Co-ord Set', priceNGN: 135000, image: 'https://images.unsplash.com/photo-1593030736224-ca44b70db65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Sets', stock: 4, description: 'The Ultimate Power Suit.' }
];

const EXCHANGE_RATE = 1450;
const BTC_RATE = 65000;

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [products] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currency, setCurrency] = useState('NGN');

  const formatPrice = (p) => currency === 'USD' ? `$${(p / EXCHANGE_RATE).toFixed(2)}` : `₦${p.toLocaleString()}`;
  
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b p-6 flex justify-between items-center">
        <h1 className="font-serif font-bold text-xl cursor-pointer" onClick={() => setCurrentView('home')}>TOPXYBESPOKE</h1>
        <div className="flex gap-4">
          <button onClick={() => setCurrentView('shop')} className="text-xs uppercase tracking-widest">Collection</button>
          <ShoppingBag size={20} onClick={() => setIsCartOpen(true)} className="cursor-pointer" />
        </div>
      </nav>
      
      <main className="p-10">
        {currentView === 'home' && (
          <div className="text-center py-20">
            <h2 className="text-5xl font-serif mb-6">Modern Tailoring.</h2>
            <button onClick={() => setCurrentView('shop')} className="bg-black text-white px-8 py-3 rounded-full">Explore</button>
          </div>
        )}
        {currentView === 'shop' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map(p => (
              <div key={p.id} className="border p-4">
                <img src={p.image} className="w-full h-64 object-cover mb-4" />
                <h3 className="font-bold">{p.name}</h3>
                <p>{formatPrice(p.priceNGN)}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <footer className="p-10 border-t text-center">
        <button onClick={() => setIsAdmin(!isAdmin)} className="text-gray-400 text-xs underline">Admin Login</button>
      </footer>
    </div>
  );
}

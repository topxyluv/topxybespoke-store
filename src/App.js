```javascript
import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Menu, ArrowRight, ChevronRight, CheckCircle2, Globe, CreditCard, Bitcoin, Wallet, LayoutDashboard, Package, Settings, Copy } from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_PRODUCTS = [
  { id: 1, name: 'Ivory Textured Zip Polo', priceNGN: 45000, image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=800&q=80', category: 'Tops', stock: 15, description: 'Minimalist luxury.' },
  { id: 2, name: 'Earth-Tone Jacquard Shirt', priceNGN: 52000, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ce3?auto=format&fit=crop&w=800&q=80', category: 'Tops', stock: 8, description: 'Earth tones.' },
  { id: 3, name: 'Cobalt Ribbed Polo', priceNGN: 48000, image: 'https://images.unsplash.com/photo-1588359348347-9bc6cbb6826a?auto=format&fit=crop&w=800&q=80', category: 'Tops', stock: 20, description: 'Royal sophistication.' },
  { id: 4, name: 'Signature Monogram Co-ord Set', priceNGN: 135000, image: 'https://images.unsplash.com/photo-1593030736224-ca44b70db65a?auto=format&fit=crop&w=800&q=80', category: 'Sets', stock: 4, description: 'The Ultimate Power Suit.' }
];

const EXCHANGE_RATE = 1450; // NGN to USD
const BTC_RATE = 65000;

export default function App() {
  const [currency, setCurrency] = useState('NGN');
  const [view, setView] = useState('home');
  const [cart, setCart] = useState([]);

  const formatPrice = (priceNGN) => {
    if (currency === 'NGN') return `₦${priceNGN.toLocaleString()}`;
    if (currency === 'USD') return `$${(priceNGN / EXCHANGE_RATE).toFixed(2)}`;
    return `${(priceNGN / BTC_RATE).toFixed(4)} BTC`;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md p-6 border-b border-gray-100 flex justify-between items-center z-50">
        <h1 className="font-serif font-bold text-xl cursor-pointer" onClick={() => setView('home')}>TOPXYBESPOKE</h1>
        <div className="flex gap-6 items-center">
          <select className="text-xs uppercase bg-transparent outline-none cursor-pointer" onChange={(e) => setCurrency(e.target.value)}>
            <option value="NGN">NGN</option>
            <option value="USD">USD</option>
            <option value="BTC">BTC</option>
          </select>
          <button onClick={() => setView('cart')} className="relative"><ShoppingBag size={20} /></button>
          <Menu size={20} className="md:hidden" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {view === 'home' && (
          <div className="space-y-24">
            <section className="text-center py-20">
              <h2 className="text-6xl md:text-8xl font-serif mb-6 leading-tight">Artisan<br/>Tailoring.</h2>
              <p className="text-gray-500 max-w-sm mx-auto mb-10">Crafted for the modern individual who values precision, texture, and silence.</p>
              <button onClick={() => setView('shop')} className="bg-black text-white px-10 py-4 rounded-full flex items-center gap-2 mx-auto hover:scale-105 transition-all">
                Shop Collection <ArrowRight size={18} />
              </button>
            </section>

            <section>
              <h3 className="text-2xl font-serif mb-12">Featured Pieces</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {INITIAL_PRODUCTS.map(p => (
                  <div key={p.id} className="group cursor-pointer">
                    <img src={p.image} alt={p.name} className="w-full aspect-[3/4] object-cover mb-4 rounded-sm" />
                    <h4 className="font-semibold">{p.name}</h4>
                    <p className="text-gray-500">{formatPrice(p.priceNGN)}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

```

```javascript
import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Menu } from 'lucide-react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Ivory Textured Zip Polo', priceNGN: 45000, image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=800&q=80', category: 'Tops' },
  { id: 2, name: 'Earth-Tone Jacquard Shirt', priceNGN: 52000, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ce3?auto=format&fit=crop&w=800&q=80', category: 'Tops' },
  { id: 3, name: 'Cobalt Ribbed Polo', priceNGN: 48000, image: 'https://images.unsplash.com/photo-1588359348347-9bc6cbb6826a?auto=format&fit=crop&w=800&q=80', category: 'Tops' },
  { id: 4, name: 'Signature Monogram Co-ord Set', priceNGN: 135000, image: 'https://images.unsplash.com/photo-1593030736224-ca44b70db65a?auto=format&fit=crop&w=800&q=80', category: 'Sets' }
];

const EXCHANGE_RATE = 1450;
const BTC_RATE = 65000;

export default function App() {
  const [currency, setCurrency] = useState('NGN');
  const [view, setView] = useState('home');

  const formatPrice = (priceNGN) => {
    if (currency === 'NGN') {
      return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(priceNGN);
    }
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceNGN / EXCHANGE_RATE);
    }
    return `${(priceNGN / BTC_RATE / EXCHANGE_RATE).toFixed(4)} BTC`;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md p-6 border-b flex justify-between items-center z-50">
        <h1 className="font-serif font-bold text-xl cursor-pointer" onClick={() => setView('home')}>TOPXYBESPOKE</h1>
        <div className="flex gap-6 items-center">
          <select className="text-xs uppercase bg-transparent outline-none" onChange={(e) => setCurrency(e.target.value)}>
            <option value="NGN">NGN</option>
            <option value="USD">USD</option>
            <option value="BTC">BTC</option>
          </select>
          <ShoppingBag size={20} />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {view === 'home' && (
          <div className="space-y-24">
            <section className="text-center py-20">
              <h2 className="text-6xl md:text-8xl font-serif mb-6 leading-tight">Artisan<br/>Tailoring.</h2>
              <button onClick={() => setView('shop')} className="bg-black text-white px-10 py-4 rounded-full flex items-center gap-2 mx-auto hover:bg-neutral-800">
                Shop Collection <ArrowRight size={18} />
              </button>
            </section>
            
            <section>
              <h3 className="text-2xl font-serif mb-12">Featured Pieces</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {INITIAL_PRODUCTS.map(p => (
                  <div key={p.id} className="group cursor-pointer">
                    <img src={p.image} alt={p.name} className="w-full aspect-[3/4] object-cover mb-4" />
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

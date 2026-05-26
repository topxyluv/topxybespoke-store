```javascript
import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Menu, X, LayoutDashboard, Settings, Package } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'Ivory Textured Zip Polo', priceNGN: 45000, image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=800&q=80', category: 'Tops' },
  { id: 2, name: 'Earth-Tone Jacquard Shirt', priceNGN: 52000, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ce3?auto=format&fit=crop&w=800&q=80', category: 'Tops' }
];

export default function App() {
  const [currency, setCurrency] = useState('NGN');
  const [view, setView] = useState('home');
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const formatPrice = (n) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: currency === 'USD' ? 'USD' : 'NGN' }).format(currency === 'USD' ? n / 1450 : n);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md p-6 border-b flex justify-between items-center z-50">
        <h1 className="font-serif font-bold text-xl cursor-pointer tracking-tighter" onClick={() => setView('home')}>TOPXYBESPOKE</h1>
        <div className="flex gap-6 items-center">
          <select onChange={(e) => setCurrency(e.target.value)} className="text-xs uppercase outline-none bg-transparent cursor-pointer">
            <option value="NGN">NGN</option>
            <option value="USD">USD</option>
          </select>
          <button onClick={() => setView('cart')} className="relative"><ShoppingBag size={20} /></button>
          <button onClick={() => setIsAdmin(!isAdmin)} className="text-xs font-bold uppercase">{isAdmin ? 'Shop' : 'Admin'}</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {isAdmin ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside className="border-r pr-8 space-y-4">
              <div className="flex items-center gap-2 font-bold"><LayoutDashboard size={18} /> Dashboard</div>
              <div className="flex items-center gap-2"><Package size={18} /> Orders</div>
              <div className="flex items-center gap-2"><Settings size={18} /> Settings</div>
            </aside>
            <section className="col-span-3">
              <h2 className="text-2xl font-serif mb-6">Store Management</h2>
              <div className="bg-gray-50 p-8 rounded-sm">Content for product management will be here.</div>
            </section>
          </div>
        ) : view === 'home' ? (
          <section className="text-center py-20">
            <h2 className="text-6xl md:text-8xl font-serif mb-6 leading-tight">Artisan<br/>Tailoring.</h2>
            <button onClick={() => setView('shop')} className="bg-black text-white px-10 py-4 rounded-full hover:bg-neutral-800 transition">Shop Collection</button>
          </section>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PRODUCTS.map(p => (
              <div key={p.id} className="group cursor-pointer">
                <img src={p.image} alt={p.name} className="w-full aspect-[3/4] object-cover mb-4 transition-transform duration-500 group-hover:scale-[1.02]" />
                <h4 className="font-semibold">{p.name}</h4>
                <p className="text-gray-500 text-sm">{formatPrice(p.priceNGN)}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

```

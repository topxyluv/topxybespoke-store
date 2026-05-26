```javascript
import React, { useState } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Ivory Textured Zip Polo', priceNGN: 45000, image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'Earth-Tone Jacquard Shirt', priceNGN: 52000, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ce3?auto=format&fit=crop&w=800&q=80' }
];

function App() {
  const [currency, setCurrency] = useState('NGN');
  const [view, setView] = useState('home');

  const formatPrice = (n) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: currency === 'USD' ? 'USD' : 'NGN' 
    }).format(currency === 'USD' ? n / 1450 : n);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <nav className="p-6 border-b flex justify-between items-center">
        <h1 className="font-serif font-bold text-xl cursor-pointer" onClick={() => setView('home')}>TOPXYBESPOKE</h1>
        <div className="flex gap-4">
          <select onChange={(e) => setCurrency(e.target.value)} className="outline-none bg-transparent">
            <option value="NGN">NGN</option>
            <option value="USD">USD</option>
          </select>
          <ShoppingBag size={20} />
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-12">
        {view === 'home' ? (
          <div className="text-center py-20">
            <h2 className="text-6xl font-serif mb-6">Artisan Tailoring.</h2>
            <button onClick={() => setView('shop')} className="bg-black text-white px-10 py-4 rounded-full">Shop Collection</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8">
            {INITIAL_PRODUCTS.map(p => (
              <div key={p.id} className="border p-4">
                <h4 className="font-bold">{p.name}</h4>
                <p>{formatPrice(p.priceNGN)}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

```

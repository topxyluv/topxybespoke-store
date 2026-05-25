import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Menu, ArrowRight, ChevronRight, CheckCircle2, Globe, CreditCard, Bitcoin, Wallet, LayoutDashboard, Package, Settings, Copy } from 'lucide-react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Ivory Textured Zip Polo', priceNGN: 45000, image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Tops', stock: 15, description: 'Minimalist luxury.' },
  { id: 2, name: 'Earth-Tone Jacquard Shirt', priceNGN: 52000, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Tops', stock: 8, description: 'Earth tones.' },
  { id: 3, name: 'Cobalt Ribbed Polo', priceNGN: 48000, image: 'https://images.unsplash.com/photo-1588359348347-9bc6cbb6826a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Tops', stock: 20, description: 'Royal sophistication.' },
  { id: 4, name: 'Signature Monogram Co-ord Set', priceNGN: 135000, image: 'https://images.unsplash.com/photo-1593030736224-ca44b70db65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Sets', stock: 4, description: 'The Ultimate Power Suit.' }
];

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="p-6 flex justify-between items-center border-b">
        <h1 className="font-serif font-bold text-xl cursor-pointer" onClick={() => setCurrentView('home')}>TOPXYBESPOKE</h1>
        <div className="flex gap-4">
          <button onClick={() => setCurrentView('shop')} className="text-xs uppercase">Collection</button>
          <ShoppingBag size={20} />
        </div>
      </nav>
      <main className="p-10 text-center">
        <h2 className="text-5xl font-serif mb-6">Artisan Tailoring</h2>
        <p className="text-gray-500">Crafted for the modern individual.</p>
      </main>
    </div>
  );
}

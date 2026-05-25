```react
import React, { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot, collection, deleteDoc, addDoc, getDocs } from 'firebase/firestore';
import { ShoppingCart, Package, Trash2, Plus, Minus, ArrowLeft, History, CreditCard } from 'lucide-react';

const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    signInAnonymously(auth);
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const cartRef = collection(db, 'artifacts', appId, 'users', user.uid, 'cart');
    return onSnapshot(cartRef, (snapshot) => {
      const items = {};
      snapshot.forEach(doc => items[doc.id] = doc.data());
      setCart(items);
    });
  }, [user]);

  const updateCartItem = async (product, qtyChange) => {
    if (!user) return;
    const itemRef = doc(db, 'artifacts', appId, 'users', user.uid, 'cart', product.id);
    const newQty = (cart[product.id]?.quantity || 0) + qtyChange;
    if (newQty <= 0) await deleteDoc(itemRef);
    else await setDoc(itemRef, { ...product, quantity: newQty });
  };

  const checkout = async () => {
    if (!user) return;
    const orderRef = collection(db, 'artifacts', appId, 'users', user.uid, 'orders');
    await addDoc(orderRef, { items: Object.values(cart), date: new Date().toISOString(), total: Object.values(cart).reduce((sum, i) => sum + (i.price * i.quantity), 0) });
    // Clear cart
    const cartRef = collection(db, 'artifacts', appId, 'users', user.uid, 'cart');
    const snapshot = await getDocs(cartRef);
    snapshot.forEach(doc => deleteDoc(doc.ref));
  };

  return <CartContext.Provider value={{ cart, updateCartItem, checkout, user }}>{children}</CartContext.Provider>;
};

const App = () => {
  const [view, setView] = useState({ page: 'home' });
  return (
    <CartProvider>
      <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen">
        <nav className="flex justify-between mb-6 bg-white p-4 rounded-xl shadow-sm">
          <h1 className="font-bold cursor-pointer" onClick={() => setView({ page: 'home' })}>MyStore</h1>
          <div className="flex gap-4">
            <History size={20} onClick={() => setView({ page: 'history' })} className="cursor-pointer" />
            <ShoppingCart size={20} onClick={() => setView({ page: 'cart' })} className="cursor-pointer" />
          </div>
        </nav>
        {view.page === 'home' && <div className="grid gap-4">{[{id:'1', name:'Coffee', price:15}, {id:'2', name:'Mug', price:10}].map(p => <div key={p.id} className="bg-white p-4 rounded-lg flex justify-between">{p.name} <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => {}}>Add</button></div>)}</div>}
        {view.page === 'cart' && <Cart onBack={() => setView({ page: 'home' })} />}
        {view.page === 'history' && <HistoryView />}
      </div>
    </CartProvider>
  );
};

const Cart = ({ onBack }) => {
  const { cart, checkout } = useContext(CartContext);
  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {Object.values(cart).map(i => <div key={i.id}>{i.name} x {i.quantity}</div>)}
      <button className="w-full bg-green-500 text-white py-2 mt-4 rounded" onClick={checkout}>Checkout</button>
    </div>
  );
};

const HistoryView = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(CartContext);
    useEffect(() => {
        if(!user) return;
        getDocs(collection(db, 'artifacts', appId, 'users', user.uid, 'orders')).then(s => setOrders(s.docs.map(d => d.data())));
    }, [user]);
    return <div className="bg-white p-4 rounded-lg">{orders.map((o, i) => <div key={i} className="mb-2 border-b">Order: ${o.total}</div>)}</div>;
};

export default App;

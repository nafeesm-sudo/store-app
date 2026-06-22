import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, products } from "./data";

type AppState = {
  cart: CartItem[];
  myList: typeof products;
  addToCart: (product: typeof products[0]) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  toggleMyList: (product: typeof products[0]) => void;
  cartTotal: number;
  cartCount: number;
};

const AppCtx = createContext<AppState>(null!);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [myList, setMyList] = useState<typeof products>([]);

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.product.id !== id));

  const updateQty = (id: number, qty: number) => {
    if (qty <= 0) removeFromCart(id);
    else setCart(prev => prev.map(i => i.product.id === id ? { ...i, quantity: qty } : i));
  };

  const toggleMyList = (product: typeof products[0]) => {
    setMyList(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <AppCtx.Provider value={{ cart, myList, addToCart, removeFromCart, updateQty, toggleMyList, cartTotal, cartCount }}>
      {children}
    </AppCtx.Provider>
  );
}

export const useApp = () => useContext(AppCtx);

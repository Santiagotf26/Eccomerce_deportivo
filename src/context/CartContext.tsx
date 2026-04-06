import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { CartItem, Product } from '../types';

/* --- Tipos del Carrito --- */
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity?: number; size?: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] };

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number, size?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const STORAGE_KEY = 'kinetic_cart';

/* --- Utilidades --- */
function calcTotals(items: CartItem[]): { totalItems: number; totalPrice: number } {
  return {
    totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
    totalPrice: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  let newItems: CartItem[];

  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.product.id === action.product.id);
      if (existing) {
        newItems = state.items.map(i =>
          i.product.id === action.product.id
            ? { ...i, quantity: i.quantity + (action.quantity || 1) }
            : i
        );
      } else {
        newItems = [...state.items, { product: action.product, quantity: action.quantity || 1, size: action.size }];
      }
      return { items: newItems, ...calcTotals(newItems) };
    }
    case 'REMOVE_ITEM':
      newItems = state.items.filter(i => i.product.id !== action.productId);
      return { items: newItems, ...calcTotals(newItems) };
    case 'UPDATE_QUANTITY':
      newItems = state.items.map(i =>
        i.product.id === action.productId ? { ...i, quantity: Math.max(1, action.quantity) } : i
      ).filter(i => i.quantity > 0);
      return { items: newItems, ...calcTotals(newItems) };
    case 'CLEAR_CART':
      return { items: [], totalItems: 0, totalPrice: 0 };
    case 'LOAD_CART':
      return { items: action.items, ...calcTotals(action.items) };
    default:
      return state;
  }
}

/* --- Context --- */
const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], totalItems: 0, totalPrice: 0 });

  // Cargar carrito del localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        dispatch({ type: 'LOAD_CART', items: JSON.parse(stored) });
      } catch { /* ignore corrupt data */ }
    }
  }, []);

  // Persistir en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product, quantity = 1, size?: number) =>
    dispatch({ type: 'ADD_ITEM', product, quantity, size });
  const removeFromCart = (productId: string) =>
    dispatch({ type: 'REMOVE_ITEM', productId });
  const updateQuantity = (productId: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de CartProvider');
  return context;
}

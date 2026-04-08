import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { CartItem, Product, ProductVariant } from '../types';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; variant?: ProductVariant; quantity?: number }
  | { type: 'REMOVE_ITEM'; productId: string; variantId?: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; variantId?: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] };

interface CartContextType extends CartState {
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
}

const STORAGE_KEY = 'kinetic_cart';

function cartItemKey(item: CartItem) {
  return item.variant ? `${item.product.id}-${item.variant.id}` : item.product.id;
}

function calcTotals(items: CartItem[]) {
  return {
    totalItems: items.reduce((s, i) => s + i.quantity, 0),
    totalPrice: items.reduce((s, i) => s + i.product.price * i.quantity, 0),
  };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  let newItems: CartItem[];

  switch (action.type) {
    case 'ADD_ITEM': {
      const key = action.variant
        ? `${action.product.id}-${action.variant.id}`
        : action.product.id;

      const existing = state.items.find(i => cartItemKey(i) === key);
      if (existing) {
        newItems = state.items.map(i =>
          cartItemKey(i) === key
            ? { ...i, quantity: i.quantity + (action.quantity ?? 1) }
            : i
        );
      } else {
        newItems = [
          ...state.items,
          { product: action.product, variant: action.variant, quantity: action.quantity ?? 1 },
        ];
      }
      return { items: newItems, ...calcTotals(newItems) };
    }

    case 'REMOVE_ITEM': {
      newItems = state.items.filter(i => {
        if (action.variantId) return !(i.product.id === action.productId && i.variant?.id === action.variantId);
        return i.product.id !== action.productId;
      });
      return { items: newItems, ...calcTotals(newItems) };
    }

    case 'UPDATE_QUANTITY': {
      newItems = state.items
        .map(i => {
          const match = action.variantId
            ? i.product.id === action.productId && i.variant?.id === action.variantId
            : i.product.id === action.productId;
          return match ? { ...i, quantity: Math.max(1, action.quantity) } : i;
        })
        .filter(i => i.quantity > 0);
      return { items: newItems, ...calcTotals(newItems) };
    }

    case 'CLEAR_CART':
      return { items: [], totalItems: 0, totalPrice: 0 };

    case 'LOAD_CART':
      return { items: action.items, ...calcTotals(action.items) };

    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], totalItems: 0, totalPrice: 0 });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { dispatch({ type: 'LOAD_CART', items: JSON.parse(stored) }); } catch { }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product, variant?: ProductVariant, quantity = 1) =>
    dispatch({ type: 'ADD_ITEM', product, variant, quantity });

  const removeFromCart = (productId: string, variantId?: string) =>
    dispatch({ type: 'REMOVE_ITEM', productId, variantId });

  const updateQuantity = (productId: string, quantity: number, variantId?: string) =>
    dispatch({ type: 'UPDATE_QUANTITY', productId, variantId, quantity });

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

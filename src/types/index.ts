/* ===========================
   Tipos centralizados del sistema
   ========================== */

export interface Category {
  id: string;
  name: string;
  icon: string; // Material Symbols icon name
  productCount?: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  category: string;
  sport: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: number;
}

export interface StoreInfo {
  name: string;
  description: string;
  logoUrl: string;
  email: string;
  phone: string;
  address: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

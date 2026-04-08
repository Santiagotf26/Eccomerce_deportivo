/* ===========================
   Tipos centralizados del sistema
   ========================== */

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  productCount?: number;
}

export interface ProductVariant {
  id: string;
  sku: string;
  size: string;
  color: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  // El backend devuelve base_price / discount_price, el adaptador los mapea a price/originalPrice
  price: number;
  originalPrice?: number;
  costPrice?: number;
  categoryId: string;
  category: string;
  sport?: string;
  rating: number;
  reviews?: number;
  image?: string;
  badge?: string;
  shortDescription?: string;
  description?: string;
  color?: string;
  weight?: number;
  minStock?: number;
  variants?: ProductVariant[];
  isPublished?: boolean;
  isActive?: boolean;
  isFeatured?: boolean;

  // Detalles adicionales
  images?: string[];
  colors?: { name: string; hex: string; image: string }[];
  features?: { icon: string; title: string; desc: string }[];
  techSpecs?: { label: string; value: string }[];
  specsDescription?: string;
  careInstructions?: string;
  warranty?: string;
  shippingDetails?: string;
  stadiumGrade?: { title: string; desc: string; icon: string };
}

export interface CartItem {
  product: Product;
  quantity: number;
  // Variante seleccionada (talla + color)
  variant?: ProductVariant;
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
  role: 'ADMIN' | 'EDITOR' | 'USER';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}


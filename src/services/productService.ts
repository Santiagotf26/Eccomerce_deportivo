/**
 * Servicio de Productos — Simula una API REST
 * Preparado para reemplazar por fetch/axios a un backend real.
 */
import type { Product } from '../types';

const STORAGE_KEY = 'kinetic_products';
const DELAY = 300; // ms de latencia simulada

// Datos seed iniciales
const SEED_PRODUCTS: Product[] = [
  {
    id: 'vortex-elite-fg',
    name: 'Vortex Elite FG',
    price: 219.99,
    categoryId: 'cat-footwear',
    category: 'Calzado',
    sport: 'Fútbol',
    rating: 4.9,
    reviews: 128,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwG3PC6Nr9e7cDTRQlqNDUb1-YPV6JyLX-h-Ik4RLu-YE2jQ6Q6zOYboQDiWBrXMnuEHkzD5H3J8dYDa8jLOf_MXTWg2yxvV5fmDWUcOrZHOAMKbOhdTDd_3k5Y1oK9Tk3-Bnol9B7a5aJ_rX9zEx8E1O54Bcp_Bl8mULb2JmK50a5RifHL37vJr37dF1e61fBprfnOhooLqnYxRyNoFjTrpAwJMEdiT77VKUVq04Fc-wOKLao5hkTJUNrv8NqyCRzznuUax323xo',
    badge: 'Novedad',
    description: 'Ingeniería de precisión para delanteros de élite. Parte superior sintética aerodinámica con sistema de tracción adaptable.',
  },
  {
    id: 'aero-pulse-jersey',
    name: 'Camiseta Aero-Pulse',
    price: 65.00,
    categoryId: 'cat-apparel',
    category: 'Ropa',
    sport: 'Entrenamiento',
    rating: 4.7,
    reviews: 84,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV2frIJwtHfB3vavtIRx3_8bgnjQuRoE4M95-FQQ6t2tVasqp70nlKcWfcoeI8TG_kngRv0sS0v20F4Khm8aWKtOO3o1jqduIrxaV1XaSFmtPx9hVfDjuU69-US6XOCk7HFrwDEr55YvtZOF9MAXeyHoiFXKVjK3-M3CVpiOM1dTA4c7pgqIz0LF8zIJVTwlbiaM319Kk3uUBHCZfpcgwaEsAWiDNECpgMDSAL7PJ2elFBzQCtqqoPefBcYDxABSycVNuGxVhMSqQ',
    description: 'Camiseta de entrenamiento negra de alto rendimiento con marca de impulso cinético.',
  },
  {
    id: 'momentum-pro-ball',
    name: 'Balón Momentum Pro',
    price: 140.00,
    categoryId: 'cat-equipment',
    category: 'Equipamiento',
    sport: 'Fútbol',
    rating: 5.0,
    reviews: 215,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQJIW8nCboO0XaTqaGoQ9BlqUOABc4zo8Tiilis_ygPNS0g-XTLPTLCkHat-RPYv8FiWAiB2_8CQLkOPzYDHnH7DQy6gRK23gnOz5h4L0fMFTSW7poyhnL9QFRh2btFcrliV-FPVSqWpm47e-w57ehLBALkinzI2oSub_gOK1TQkfiO4CIwFlpAzfNs6u3l7wfnx-n5ygV0ElhyfIrO7pcWDIEOrp0Zbf7qp5pSRDgKIi3ohd0PpvmBOOcfs7FruedMEEQG6T74xo',
    description: 'Balón de fútbol premium de nivel profesional con patrones geométricos y detalles en naranja brillante.',
  },
  {
    id: 'velocity-trainer-z',
    name: 'Zapatillas Velocity Trainer Z',
    price: 128.00,
    originalPrice: 160.00,
    categoryId: 'cat-footwear',
    category: 'Calzado',
    sport: 'Entrenamiento',
    rating: 4.8,
    reviews: 312,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLHSCBPQ6llBDoXzXTXE6THX5SmxAqotbwo94v8zQ6J0ZWYhKrG4EOR4Kajm6IEg1ycbm7q7FkUteSij3EPuI-mWa5rQHRK5cJ7abyCsCtVKkSBNF9HMtzc0LyKqa9D_91tCzo8Xgew0vKHTduDYrPpkuTw8zJfGsdZ9D5eWk3knhUyQPaJrkPyM-614BHaWBFTfIFsnYFPxZmAApeAN51PijW0BrWJZD0vYZ4kRHmF5zHmw9YNAAfWqqjAvdoBx6jYGPbJQpdOho',
    badge: 'Oferta -20%',
    description: 'Zapatillas de running atléticas verde lima con malla transpirable y diseño de suela dinámica.',
  },
  {
    id: 'kinetix-base-layer',
    name: 'Capa Base Kinetix',
    price: 45.00,
    categoryId: 'cat-apparel',
    category: 'Ropa',
    sport: 'Entrenamiento',
    rating: 4.6,
    reviews: 56,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEPNnshFeAUV9182Phh_lHQko-to8_kVQeBbjU_-Fohrfuy-_fmElnVmI78zQJ6kjFOSd5A4EhnyKCV97jDDOPtA4e2q4CXQe_MvtJ-kjpT2Z5e08IFB3pn7iIWWq28rdN-NSJWG_3u9uWoUKxCG6N7kPtqbO1K0RR9mCrksav0bueD8HYrx5O6n95KcKzotuo8NCgMMQzNMrkPUYNdjv4dtqnfO3XkMM0pzOAgF8h5JrvL8lc6oMOs9lt6ZL0vyc8Kfsh5EoOXLU',
    description: 'Mallas de compresión negras para atletas con costuras ergonómicas y detalles reflectantes.',
  },
  {
    id: 'precision-chrono-x',
    name: 'Precision Chrono X',
    price: 89.00,
    categoryId: 'cat-equipment',
    category: 'Equipamiento',
    sport: 'Entrenador',
    rating: 4.9,
    reviews: 42,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLA6WzA8kI1sLf7SpxoBdOeAz3PTyMMT4-tgf1JZLmONL0nSshP1h-IliSeBp92Ug9NGZO-_oMYtIcblpxxndz-5Yc-CF41ieHqZrT9WB5L3Fo_5MsVLEyKaNDSFo1ksSKYejOA6wHVi1nGs_9n1BclfluV8tufs84LS2grHzzcPoYUz4NYpNU80NSnJmFZjqYFpCFZDgqjhSpoAq19Nmy8jhlQhXoJf1AnRoQc2AnnSO-xBM-7WFLMrgnppsC0hDmrbHcEATKKds',
    description: 'Cronómetro deportivo profesional con pantalla digital y diseño táctil robusto.',
  },
];

function delay<T>(data: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), DELAY));
}

function getStoredProducts(): Product[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PRODUCTS));
  return SEED_PRODUCTS;
}

function saveProducts(products: Product[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export const productService = {
  async getAll(): Promise<Product[]> {
    return delay(getStoredProducts());
  },

  async getById(id: string): Promise<Product | undefined> {
    const products = getStoredProducts();
    return delay(products.find(p => p.id === id));
  },

  async create(product: Omit<Product, 'id' | 'rating' | 'reviews'>): Promise<Product> {
    const products = getStoredProducts();
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      rating: 0,
      reviews: 0,
    };
    products.push(newProduct);
    saveProducts(products);
    return delay(newProduct);
  },

  async update(id: string, updates: Partial<Product>): Promise<Product> {
    const products = getStoredProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Producto no encontrado');
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
    return delay(products[index]);
  },

  async delete(id: string): Promise<void> {
    const products = getStoredProducts().filter(p => p.id !== id);
    saveProducts(products);
    return delay(undefined);
  },

  async getByCategory(categoryId: string): Promise<Product[]> {
    const products = getStoredProducts();
    return delay(products.filter(p => p.categoryId === categoryId));
  },
};

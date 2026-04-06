/**
 * Servicio de Categorías — Simula una API REST
 */
import type { Category } from '../types';

const STORAGE_KEY = 'kinetic_categories';
const DELAY = 200;

const SEED_CATEGORIES: Category[] = [
  { id: 'cat-footwear', name: 'Calzado', icon: 'steps', productCount: 2 },
  { id: 'cat-apparel', name: 'Ropa', icon: 'checkroom', productCount: 2 },
  { id: 'cat-equipment', name: 'Equipamiento', icon: 'sports_soccer', productCount: 2 },
];

function delay<T>(data: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), DELAY));
}

function getStored(): Category[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_CATEGORIES));
  return SEED_CATEGORIES;
}

function save(categories: Category[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
}

export const categoryService = {
  async getAll(): Promise<Category[]> {
    return delay(getStored());
  },

  async getById(id: string): Promise<Category | undefined> {
    return delay(getStored().find(c => c.id === id));
  },

  async create(data: Omit<Category, 'id' | 'productCount'>): Promise<Category> {
    const categories = getStored();
    const newCat: Category = { ...data, id: `cat-${Date.now()}`, productCount: 0 };
    categories.push(newCat);
    save(categories);
    return delay(newCat);
  },

  async update(id: string, updates: Partial<Category>): Promise<Category> {
    const categories = getStored();
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Categoría no encontrada');
    categories[index] = { ...categories[index], ...updates };
    save(categories);
    return delay(categories[index]);
  },

  async delete(id: string): Promise<void> {
    save(getStored().filter(c => c.id !== id));
    return delay(undefined);
  },
};

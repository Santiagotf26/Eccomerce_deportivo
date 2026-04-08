/**
 * categoryService.ts — Conectado al backend NestJS real.
 */
import type { Category } from '../types';
import { api } from '../lib/apiClient';



function mapCategory(raw: any): Category {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    icon: raw.icon || 'category',
    productCount: raw._count?.products ?? 0,
  };
}

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const data = await api.get<any[]>('/products/categories/all');
    return data.map(mapCategory);
  },

  async getById(id: string): Promise<Category | undefined> {
    const all = await this.getAll();
    return all.find(c => c.id === id);
  },

  // Solo ADMIN
  async create(data: { name: string; slug: string; icon?: string }): Promise<Category> {
    const raw = await api.post<any>('/products/categories', data);
    return mapCategory(raw);
  },

  async update(id: string, updates: Partial<Category>): Promise<Category> {
    const raw = await api.patch<any>(`/products/categories/${id}`, updates);
    return mapCategory(raw);
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/products/categories/${id}`);
  },
};

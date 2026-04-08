/**
 * productService.ts — Conectado al backend NestJS real.
 * Adaptador: traduce el formato del backend al tipo Product del frontend.
 */
import type { Product } from '../types';
import { api } from '../lib/apiClient';

// --------------------------------------------------------------------------
// Adaptador: traduce el formato del backend al tipo Product del frontend
// --------------------------------------------------------------------------
function mapProduct(raw: any): Product {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    sku: raw.sku ?? undefined,
    price: raw.discount_price ?? raw.base_price,
    originalPrice: raw.discount_price ? raw.base_price : undefined,
    costPrice: raw.cost_price ?? undefined,
    categoryId: raw.category_id,
    category: raw.category?.name ?? '',
    sport: raw.sport ?? raw.category?.name ?? 'General',
    rating: raw.rating ?? 0,
    reviews: 0,
    image: raw.image_url ?? '',
    badge:
      raw.badge ??
      (raw.discount_price
        ? `Oferta -${Math.round((1 - raw.discount_price / raw.base_price) * 100)}%`
        : undefined),
    shortDescription: raw.short_description ?? undefined,
    description: raw.description ?? 'Sin descripción.',
    color: raw.color ?? undefined,
    variants: raw.variants ?? [],
    isPublished: raw.is_published ?? true,
    isActive: raw.is_active ?? true,
    isFeatured: raw.is_featured ?? false,
    images: raw.images || [],
    colors: raw.colors || [],
    features: raw.features,
    techSpecs: raw.tech_specs,
    specsDescription: raw.specs_description,
    careInstructions: raw.care_instructions,
    warranty: raw.warranty,
    shippingDetails: raw.shipping_details,
    stadiumGrade: raw.stadium_grade,
  };
}

export const productService = {
  async getAll(): Promise<Product[]> {
    const data = await api.get<any[]>('/products');
    return data.map(mapProduct);
  },

  async getAllAdmin(): Promise<Product[]> {
    const data = await api.get<any[]>('/products/admin');
    return data.map(mapProduct);
  },

  async getById(id: string): Promise<Product | undefined> {
    try {
      const data = await api.get<any>(`/products/${id}`);
      return mapProduct(data);
    } catch {
      return undefined;
    }
  },

  async getBySlug(slug: string): Promise<Product | undefined> {
    const all = await this.getAll();
    return all.find((p) => p.slug === slug);
  },

  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const token = localStorage.getItem('kinetic_token');
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

    const res = await fetch(`${baseUrl}/products/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });
    if (!res.ok) throw new Error('Error al subir imagen');
    const data = await res.json();
    const backendHost = baseUrl.replace('/api', '');
    return `${backendHost}${data.url}`;
  },

  // Solo ADMIN — requiere JWT
  async create(product: Partial<Product>): Promise<Product> {
    const data = await api.post<any>('/products', {
      name: product.name,
      // El slug viene desde el form (auto-generado); el service del backend
      // también lo puede autogenerar si viene vacío
      slug: product.slug || undefined,
      sku: product.sku || undefined,
      base_price: product.originalPrice ?? product.price,
      discount_price: product.originalPrice ? product.price : null,
      cost_price: product.costPrice || undefined,
      category_id: product.categoryId,
      image_url: product.image,
      badge: product.badge,
      short_description: product.shortDescription,
      description: product.description,
      sport: product.sport,
      color: product.color,
      weight: product.weight || undefined,
      min_stock: product.minStock ?? 0,
      is_active: product.isActive ?? true,
      is_featured: product.isFeatured ?? false,
      colors: product.colors,
      images: product.images,
      features: product.features,
      tech_specs: product.techSpecs,
      specs_description: product.specsDescription,
      care_instructions: product.careInstructions,
      warranty: product.warranty,
      shipping_details: product.shippingDetails,
      stadium_grade: product.stadiumGrade,
      variants: product.variants,
    });
    return mapProduct(data);
  },

  async update(id: string, updates: Partial<Product>): Promise<Product> {
    const data = await api.patch<any>(`/products/${id}`, {
      name: updates.name,
      slug: updates.slug,
      sku: updates.sku,
      base_price: updates.originalPrice ?? updates.price,
      discount_price: updates.originalPrice ? updates.price : null,
      cost_price: updates.costPrice,
      image_url: updates.image,
      badge: updates.badge,
      short_description: updates.shortDescription,
      description: updates.description,
      sport: updates.sport,
      color: updates.color,
      weight: updates.weight,
      min_stock: updates.minStock,
      is_published: updates.isPublished,
      is_active: updates.isActive,
      is_featured: updates.isFeatured,
      colors: updates.colors,
      images: updates.images,
      features: updates.features,
      tech_specs: updates.techSpecs,
      specs_description: updates.specsDescription,
      care_instructions: updates.careInstructions,
      warranty: updates.warranty,
      shipping_details: updates.shippingDetails,
      stadium_grade: updates.stadiumGrade,
      variants: updates.variants,
    });
    return mapProduct(data);
  },

  async delete(id: string): Promise<Product> {
    const data = await api.delete<any>(`/products/${id}`);
    return mapProduct(data);
  },

  async getByCategory(categoryId: string): Promise<Product[]> {
    const all = await this.getAll();
    return all.filter((p) => p.categoryId === categoryId);
  },

  async createCategory(category: any): Promise<any> {
    return api.post<any>('/products/categories', category);
  },
};

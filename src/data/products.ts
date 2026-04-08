import { richSeedProducts } from './seedData';
import type { Product } from '../types';

/**
 * products.ts — Adaptado para usar el dataset enriquecido como base.
 * Esto asegura que el mockup y la realidad técnica coincidan.
 */

export const products: Product[] = (richSeedProducts as any[]).map((p, index) => ({
  ...p,
  id: p.slug, // Usamos el slug como ID para el mockup
  category: p.categoryName,
  categoryId: `cat-0${(index % 3) + 1}`, // IDs genéricos para el mockup
  rating: 4.5 + (index % 5) * 0.1,
  reviews: 10 + (index * 5),
  isPublished: true,
  isActive: true,
  isFeatured: index < 4
})) as Product[];

export const featuredProducts = {
  hero: {
    id: products[0].id,
    name: products[0].name.toUpperCase(),
    subtitle: products[0].shortDescription,
    image: products[0].image
  },
  small: products.slice(1, 3).map(p => ({
    id: p.id,
    tag: p.sport,
    name: p.name.toUpperCase(),
    price: `$${p.price.toFixed(2)}`,
    image: p.image
  }))
};

export const relatedProducts = products.slice(3, 6).map(p => ({
  name: p.name.toUpperCase(),
  price: `$${p.price.toFixed(2)}`,
  image: p.image
}));

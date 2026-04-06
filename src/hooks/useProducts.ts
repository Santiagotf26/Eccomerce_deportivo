import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types';
import { productService } from '../services/productService';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await productService.getAll();
      setProducts(data);
      setError(null);
    } catch {
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const createProduct = async (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
    const newProduct = await productService.create(product);
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    const updated = await productService.update(id, updates);
    setProducts(prev => prev.map(p => p.id === id ? updated : p));
    return updated;
  };

  const deleteProduct = async (id: string) => {
    await productService.delete(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return { products, loading, error, fetchProducts, createProduct, updateProduct, deleteProduct };
}

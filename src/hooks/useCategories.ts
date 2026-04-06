import { useState, useEffect, useCallback } from 'react';
import type { Category } from '../types';
import { categoryService } from '../services/categoryService';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await categoryService.getAll();
      setCategories(data);
      setError(null);
    } catch {
      setError('Error al cargar categorías');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const createCategory = async (data: Omit<Category, 'id' | 'productCount'>) => {
    const newCat = await categoryService.create(data);
    setCategories(prev => [...prev, newCat]);
    return newCat;
  };

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    const updated = await categoryService.update(id, updates);
    setCategories(prev => prev.map(c => c.id === id ? updated : c));
    return updated;
  };

  const deleteCategory = async (id: string) => {
    await categoryService.delete(id);
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  return { categories, loading, error, fetchCategories, createCategory, updateCategory, deleteCategory };
}

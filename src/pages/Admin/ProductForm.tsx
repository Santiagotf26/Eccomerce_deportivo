import { useState, type FormEvent } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import type { Product } from '../../types';
import './ProductForm.css';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function ProductForm({ product, onClose }: Props) {
  const { createProduct, updateProduct } = useProducts();
  const { categories } = useCategories();
  const isEditing = !!product;

  const [form, setForm] = useState({
    name: product?.name || '',
    price: product?.price?.toString() || '',
    originalPrice: product?.originalPrice?.toString() || '',
    categoryId: product?.categoryId || categories[0]?.id || '',
    sport: product?.sport || '',
    image: product?.image || '',
    badge: product?.badge || '',
    description: product?.description || '',
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Nombre requerido';
    if (!form.price || isNaN(Number(form.price))) errs.price = 'Precio válido requerido';
    if (!form.categoryId) errs.categoryId = 'Categoría requerida';
    if (!form.sport.trim()) errs.sport = 'Deporte requerido';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    const category = categories.find(c => c.id === form.categoryId);
    const data = {
      name: form.name,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
      categoryId: form.categoryId,
      category: category?.name || '',
      sport: form.sport,
      image: form.image,
      badge: form.badge || undefined,
      description: form.description,
    };

    try {
      if (isEditing && product) {
        await updateProduct(product.id, data);
      } else {
        await createProduct(data);
      }
      onClose();
    } catch {
      // error handling
    } finally {
      setSaving(false);
    }
  };

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="product-form">
      <div className="product-form__header">
        <button className="product-form__back" onClick={onClose}>
          <span className="material-symbols-outlined">arrow_back</span>
          Volver a Productos
        </button>
        <h1 className="product-form__title">{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</h1>
      </div>

      <form className="product-form__body" onSubmit={handleSubmit}>
        <div className="product-form__grid">
          {/* Left: Fields */}
          <div className="product-form__fields">
            <div className={`pf-field ${errors.name ? 'pf-field--error' : ''}`}>
              <label>Nombre del Producto *</label>
              <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Ej: Vortex Elite FG" />
              {errors.name && <span className="pf-field__error">{errors.name}</span>}
            </div>

            <div className="pf-field__row">
              <div className={`pf-field ${errors.price ? 'pf-field--error' : ''}`}>
                <label>Precio ($) *</label>
                <input type="number" step="0.01" value={form.price} onChange={e => update('price', e.target.value)} placeholder="0.00" />
                {errors.price && <span className="pf-field__error">{errors.price}</span>}
              </div>
              <div className="pf-field">
                <label>Precio Original ($)</label>
                <input type="number" step="0.01" value={form.originalPrice} onChange={e => update('originalPrice', e.target.value)} placeholder="Dejar vacío si no hay descuento" />
              </div>
            </div>

            <div className="pf-field__row">
              <div className={`pf-field ${errors.categoryId ? 'pf-field--error' : ''}`}>
                <label>Categoría *</label>
                <select value={form.categoryId} onChange={e => update('categoryId', e.target.value)}>
                  <option value="">Seleccionar...</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                {errors.categoryId && <span className="pf-field__error">{errors.categoryId}</span>}
              </div>
              <div className={`pf-field ${errors.sport ? 'pf-field--error' : ''}`}>
                <label>Deporte *</label>
                <input type="text" value={form.sport} onChange={e => update('sport', e.target.value)} placeholder="Ej: Fútbol" />
                {errors.sport && <span className="pf-field__error">{errors.sport}</span>}
              </div>
            </div>

            <div className="pf-field">
              <label>URL de Imagen</label>
              <input type="url" value={form.image} onChange={e => update('image', e.target.value)} placeholder="https://..." />
            </div>

            <div className="pf-field">
              <label>Badge (Etiqueta)</label>
              <input type="text" value={form.badge} onChange={e => update('badge', e.target.value)} placeholder="Ej: Novedad, Oferta -20%" />
            </div>

            <div className="pf-field">
              <label>Descripción</label>
              <textarea value={form.description} onChange={e => update('description', e.target.value)} placeholder="Descripción del producto..." rows={4} />
            </div>
          </div>

          {/* Right: Preview */}
          <div className="product-form__preview">
            <h3 className="product-form__preview-title">Vista Previa</h3>
            <div className="product-form__preview-card">
              {form.image ? (
                <img src={form.image} alt="Preview" className="product-form__preview-img" />
              ) : (
                <div className="product-form__preview-placeholder">
                  <span className="material-symbols-outlined">image</span>
                  <p>Sin imagen</p>
                </div>
              )}
              <div className="product-form__preview-info">
                <p className="product-form__preview-sport">{form.sport || 'Deporte'} • {categories.find(c => c.id === form.categoryId)?.name || 'Categoría'}</p>
                <h4>{form.name || 'Nombre del producto'}</h4>
                <p className="product-form__preview-price">
                  {form.price ? `$${parseFloat(form.price).toFixed(2)}` : '$0.00'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="product-form__actions">
          <button type="button" className="product-form__cancel" onClick={onClose}>Cancelar</button>
          <button type="submit" className="product-form__save" disabled={saving}>
            {saving ? 'Guardando...' : isEditing ? 'Guardar Cambios' : 'Crear Producto'}
          </button>
        </div>
      </form>
    </div>
  );
}

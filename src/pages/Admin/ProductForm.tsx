import {
  useState,
  type FormEvent,
  type ChangeEvent,
  useRef,
  useEffect,
} from 'react';
import { useCategories } from '../../hooks/useCategories';
import { productService } from '../../services/productService';
import type { Product } from '../../types';
import './ProductForm.css';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Props {
  product: Product | null;
  onClose: () => void;
  onSaved: () => Promise<void> | void;
}

type Tab = 'basic' | 'images' | 'inventory' | 'details' | 'settings';

interface Toast {
  type: 'success' | 'error';
  msg: string;
}

// ---------------------------------------------------------------------------
// Slug helper (mirror of backend logic)
// ---------------------------------------------------------------------------
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function ProductForm({ product, onClose, onSaved }: Props) {
  const { categories } = useCategories();
  const isEditing = !!product;

  // ---- Form state ----
  const [form, setForm] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    sku: product?.sku || '',
    price: product?.price?.toString() || '',
    originalPrice: product?.originalPrice?.toString() || '',
    costPrice: product?.costPrice?.toString() || '',
    categoryId: product?.categoryId || '',
    sport: product?.sport || '',
    color: product?.color || '',
    weight: product?.weight?.toString() || '',
    minStock: product?.minStock?.toString() || '0',
    badge: product?.badge || '',
    shortDescription: product?.shortDescription || '',
    description: product?.description || '',
    image: product?.image || '',
    isActive: product?.isActive ?? true,
    isFeatured: product?.isFeatured ?? false,
    images: product?.images || [] as string[],
    features: product?.features || [] as { icon: string; title: string; desc: string }[],
    techSpecs: product?.techSpecs || [] as { label: string; value: string }[],
    specsDescription: product?.specsDescription || '',
    careInstructions: product?.careInstructions || '',
    warranty: product?.warranty || '',
    shippingDetails: product?.shippingDetails || '',
    colors: product?.colors || [] as { name: string; hex: string; image: string }[],
    variants: product?.variants || [] as { id: string; size: string; stock: number; sku: string; color: string }[],
  });

  const [activeTab, setActiveTab] = useState<Tab>('basic');
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<Toast | null>(null);
  const [slugManual, setSlugManual] = useState(isEditing); // si es edición el slug ya existe

  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRefGallery = useRef<HTMLInputElement>(null);
  const fileInputRefColor = useRef<HTMLInputElement>(null);
  const activeUploadField = useRef<string>('image');
  const activeGalleryIndex = useRef<number>(0);
  const activeColorIndex = useRef<number>(0);

  // ---- Auto-slug desde nombre ----
  useEffect(() => {
    if (!slugManual && form.name) {
      setForm((prev) => ({ ...prev, slug: toSlug(form.name) }));
    }
  }, [form.name, slugManual]);

  // ---- Toast auto-close ----
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  // ---- Derived values ----
  const price = parseFloat(form.price || '0');
  const costPrice = parseFloat(form.costPrice || '0');
  const profit = costPrice > 0 && price > 0 ? price - costPrice : null;
  const profitPct = profit !== null && costPrice > 0 ? ((profit / costPrice) * 100).toFixed(1) : null;
  const totalStock = form.variants.reduce((acc, v) => acc + (Number(v.stock) || 0), 0);

  // ---- Sync form when product prop changes (important for modal reuse) ----
  useEffect(() => {
    const fetchFullProduct = async () => {
      if (product?.id) {
        try {
          const full = await productService.getById(product.id);
          if (full) {
            setForm({
              name: full.name || '',
              slug: full.slug || '',
              sku: full.sku || '',
              price: full.price?.toString() || '',
              originalPrice: full.originalPrice?.toString() || '',
              costPrice: full.costPrice?.toString() || '',
              categoryId: full.categoryId || '',
              sport: full.sport || '',
              color: full.color || '',
              weight: full.weight?.toString() || '',
              minStock: full.minStock?.toString() || '0',
              badge: full.badge || '',
              shortDescription: full.shortDescription || '',
              description: full.description || '',
              image: full.image || '',
              isActive: full.isActive ?? true,
              isFeatured: full.isFeatured ?? false,
              images: full.images || [],
              features: full.features || [],
              techSpecs: full.techSpecs || [],
              specsDescription: full.specsDescription || '',
              careInstructions: full.careInstructions || '',
              warranty: full.warranty || '',
              shippingDetails: full.shippingDetails || '',
              colors: full.colors || [],
              variants: full.variants || [],
            });
            setSlugManual(true);
            return;
          }
        } catch (err) {
          console.error("Error fetching full product for edit:", err);
        }
      }

      // Fallback or initial set for new product
      if (product) {
        setForm({
          name: product.name || '',
          slug: product.slug || '',
          sku: product.sku || '',
          price: product.price?.toString() || '',
          originalPrice: product.originalPrice?.toString() || '',
          costPrice: product.costPrice?.toString() || '',
          categoryId: product.categoryId || '',
          sport: product.sport || '',
          color: product.color || '',
          weight: product.weight?.toString() || '',
          minStock: product.minStock?.toString() || '0',
          badge: product.badge || '',
          shortDescription: product.shortDescription || '',
          description: product.description || '',
          image: product.image || '',
          isActive: product.isActive ?? true,
          isFeatured: product.isFeatured ?? false,
          images: product.images || [],
          features: product.features || [],
          techSpecs: product.techSpecs || [],
          specsDescription: product.specsDescription || '',
          careInstructions: product.careInstructions || '',
          warranty: product.warranty || '',
          shippingDetails: product.shippingDetails || '',
          colors: product.colors || [],
          variants: product.variants || [],
        });
        setSlugManual(true);
      } else {
        // Reset for new products
        setForm({
          name: '', slug: '', sku: '', price: '', originalPrice: '', costPrice: '',
          categoryId: '', sport: '', color: '', weight: '', minStock: '0',
          badge: '', shortDescription: '', description: '', image: '',
          isActive: true, isFeatured: false, images: [], features: [],
          techSpecs: [], specsDescription: '', careInstructions: '',
          warranty: '', shippingDetails: '', colors: [], variants: [],
        });
        setSlugManual(false);
      }
    };

    fetchFullProduct();
  }, [product]);

  // ---------------------------------------------------------------------------
  // Validation
  // ---------------------------------------------------------------------------
  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Nombre requerido';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      errs.price = 'Precio válido requerido (> 0)';
    if (!form.categoryId) errs.categoryId = 'Categoría requerida';
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      setActiveTab('basic'); // lleva al usuario a la primera pestaña con error
      return false;
    }
    return true;
  };

  // ---------------------------------------------------------------------------
  // Submit
  // ---------------------------------------------------------------------------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    const category = categories.find((c) => c.id === form.categoryId);

    const data: Partial<Product> = {
      name: form.name,
      slug: form.slug || toSlug(form.name),
      sku: form.sku || undefined,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
      costPrice: form.costPrice ? parseFloat(form.costPrice) : undefined,
      categoryId: form.categoryId,
      category: category?.name || '',
      sport: form.sport,
      color: form.color,
      weight: form.weight ? parseFloat(form.weight) : undefined,
      minStock: parseInt(form.minStock) || 0,
      image: form.image,
      badge: form.badge || undefined,
      shortDescription: form.shortDescription,
      description: form.description,
      isActive: form.isActive,
      isFeatured: form.isFeatured,
      images: form.images,
      colors: form.colors,
      features: form.features,
      techSpecs: form.techSpecs,
      specsDescription: form.specsDescription,
      careInstructions: form.careInstructions,
      warranty: form.warranty,
      shippingDetails: form.shippingDetails,
      variants: form.variants,
    };

    try {
      if (isEditing && product) {
        await productService.update(product.id, data);
      } else {
        await productService.create(data);
      }
      setToast({ type: 'success', msg: isEditing ? '✅ Producto actualizado correctamente' : '✅ Producto creado correctamente' });
      await onSaved();
      if (!isEditing) {
        // Limpiar form al crear
        setTimeout(() => onClose(), 1500);
      }
    } catch (err: any) {
      let msg =
        err?.response?.data?.message ||
        err?.message ||
        'Error al guardar el producto';

      if (Array.isArray(msg)) msg = msg.join(', ');
      else if (typeof msg === 'object') msg = JSON.stringify(msg);

      setToast({ type: 'error', msg: `❌ ${msg}` });
    } finally {
      setSaving(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Generic field updater
  // ---------------------------------------------------------------------------
  const update = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  // ---------------------------------------------------------------------------
  // Image upload helpers
  // ---------------------------------------------------------------------------
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const field = activeUploadField.current;
    setUploadingField(field);
    try {
      const url = await productService.uploadImage(file);
      update(field, url);
    } catch {
      setToast({ type: 'error', msg: '❌ Error al subir la imagen' });
    } finally {
      setUploadingField(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const triggerUpload = (field: string) => {
    activeUploadField.current = field;
    fileInputRef.current?.click();
  };

  const handleGalleryUpload = async (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingField(`images-${index}`);
    try {
      const url = await productService.uploadImage(file);
      const newImages = [...form.images];
      newImages[index] = url;
      update('images', newImages);
    } catch {
      setToast({ type: 'error', msg: '❌ Error al subir la imagen' });
    } finally {
      setUploadingField(null);
      if (fileInputRefGallery.current) fileInputRefGallery.current.value = '';
    }
  };

  const triggerGalleryUpload = (index: number) => {
    activeGalleryIndex.current = index;
    fileInputRefGallery.current?.click();
  };

  const handleColorImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const index = activeColorIndex.current;
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(`color-${index}`);
    try {
      const url = await productService.uploadImage(file);
      updateColorOption(index, 'image', url);
    } catch {
      setToast({ type: 'error', msg: '❌ Error al subir la imagen del color' });
    } finally {
      setUploadingField(null);
      if (fileInputRefColor.current) fileInputRefColor.current.value = '';
    }
  };

  const triggerColorUpload = (index: number) => {
    activeColorIndex.current = index;
    fileInputRefColor.current?.click();
  };

  const addImage = () => update('images', [...form.images, '']);
  const removeImage = (i: number) => update('images', form.images.filter((_, idx) => idx !== i));
  const setPrimaryImage = (img: string) => update('image', img);

  // ---------------------------------------------------------------------------
  // Features helpers
  // ---------------------------------------------------------------------------
  const addFeature = () =>
    update('features', [...form.features, { icon: 'speed', title: '', desc: '' }]);
  const removeFeature = (i: number) =>
    update('features', form.features.filter((_, idx) => idx !== i));
  const updateFeature = (i: number, field: string, value: string) => {
    const arr = [...form.features];
    arr[i] = { ...arr[i], [field]: value };
    update('features', arr);
  };

  // ---------------------------------------------------------------------------
  // Tech specs helpers
  // ---------------------------------------------------------------------------
  const addTechSpec = () =>
    update('techSpecs', [...form.techSpecs, { label: '', value: '' }]);
  const removeTechSpec = (i: number) =>
    update('techSpecs', form.techSpecs.filter((_, idx) => idx !== i));
  const updateTechSpec = (i: number, field: string, value: string) => {
    const arr = [...form.techSpecs];
    arr[i] = { ...arr[i], [field]: value };
    update('techSpecs', arr);
  };

  // ---------------------------------------------------------------------------
  // Colors helpers
  // ---------------------------------------------------------------------------
  const addColorOption = () =>
    update('colors', [...form.colors, { name: '', hex: '#000000', image: '' }]);
  const removeColorOption = (i: number) =>
    update('colors', form.colors.filter((_, idx) => idx !== i));
  const updateColorOption = (i: number, field: string, value: string) => {
    const arr = [...form.colors];
    arr[i] = { ...arr[i], [field]: value };
    update('colors', arr);
  };

  // ---------------------------------------------------------------------------
  // Variants / inventory helpers
  // ---------------------------------------------------------------------------
  const addVariant = () =>
    update('variants', [
      ...form.variants,
      { id: Math.random().toString(), size: '', stock: 0, sku: '', color: '' },
    ]);
  const removeVariant = (i: number) =>
    update('variants', form.variants.filter((_, idx) => idx !== i));
  const updateVariant = (i: number, field: string, value: any) => {
    const arr = [...form.variants];
    arr[i] = { ...arr[i], [field]: value };
    update('variants', arr);
  };

  const generateDefaultSizes = () => {
    const cat = categories.find((c) => c.id === form.categoryId)?.name.toLowerCase();
    let sizes: string[] = [];
    if (cat === 'calzado') sizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'];
    else if (cat === 'ropa') sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    if (sizes.length > 0) {
      update(
        'variants',
        sizes.map((s) => ({ id: Math.random().toString(), size: s, stock: 10, sku: '', color: 'N/A' }))
      );
    }
  };

  // ---------------------------------------------------------------------------
  // Tab config
  // ---------------------------------------------------------------------------
  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'basic', label: 'Básico', icon: 'info' },
    { id: 'images', label: 'Imágenes', icon: 'collections' },
    { id: 'inventory', label: 'Inventario', icon: 'inventory' },
    { id: 'details', label: 'Detalles', icon: 'description' },
    { id: 'settings', label: 'Ajustes', icon: 'settings' },
  ];

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="pf-wrap">

      {/* Toast */}
      {toast && (
        <div className={`pf-toast pf-toast--${toast.type}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="pf-header">
        <button className="pf-back" type="button" onClick={onClose}>
          <span className="material-symbols-outlined">arrow_back</span>
          Volver
        </button>
        <div>
          <h1 className="pf-title">{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</h1>
          <p className="pf-subtitle">
            {isEditing ? `Editando: ${product?.name}` : 'Completa los campos para crear un producto'}
          </p>
        </div>
      </div>

      <form className="pf-body" onSubmit={handleSubmit} noValidate>
        <div className="pf-layout">

          {/* ============================================================
              LEFT COLUMN — Tabs + Fields
          ============================================================ */}
          <div className="pf-main">
            {/* Tab nav */}
            <nav className="pf-tabs">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`pf-tab ${activeTab === t.id ? 'pf-tab--active' : ''}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  <span className="material-symbols-outlined">{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </nav>

            <div className="pf-panel">

              {/* ==================== TAB: BASIC ==================== */}
              {activeTab === 'basic' && (
                <div className="pf-section-content">
                  <h3 className="pf-section-heading">
                    <span className="material-symbols-outlined">info</span>
                    Información Básica
                  </h3>

                  {/* Name */}
                  <div className={`pff ${errors.name ? 'pff--error' : ''}`}>
                    <label htmlFor="pf-name">Nombre del Producto *</label>
                    <input
                      id="pf-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Ej: Vortex Elite FG Pro"
                    />
                    {errors.name && <span className="pff__err">{errors.name}</span>}
                  </div>



                  {/* Prices row */}
                  <div className="pff__row">
                    <div className={`pff ${errors.price ? 'pff--error' : ''}`}>
                      <label htmlFor="pf-price">Precio de Venta ($) *</label>
                      <div className="pff__input-icon">
                        <span>$</span>
                        <input
                          id="pf-price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={form.price}
                          onChange={(e) => update('price', e.target.value)}
                          placeholder="0.00"
                        />
                      </div>
                      {errors.price && <span className="pff__err">{errors.price}</span>}
                    </div>
                    <div className="pff">
                      <label htmlFor="pf-oprice">Precio Original ($)</label>
                      <div className="pff__input-icon">
                        <span>$</span>
                        <input
                          id="pf-oprice"
                          type="number"
                          step="0.01"
                          min="0"
                          value={form.originalPrice}
                          onChange={(e) => update('originalPrice', e.target.value)}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cost & Profit */}
                  <div className="pff__row">
                    <div className="pff">
                      <label htmlFor="pf-cost">Precio de Costo ($)</label>
                      <div className="pff__input-icon">
                        <span>$</span>
                        <input
                          id="pf-cost"
                          type="number"
                          step="0.01"
                          min="0"
                          value={form.costPrice}
                          onChange={(e) => update('costPrice', e.target.value)}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    {profit !== null && (
                      <div className="pff pf-profit-box">
                        <label>Ganancia estimada</label>
                        <div className={`pf-profit ${profit >= 0 ? 'pf-profit--pos' : 'pf-profit--neg'}`}>
                          <span className="material-symbols-outlined">{profit >= 0 ? 'trending_up' : 'trending_down'}</span>
                          <span>${profit.toFixed(2)}</span>
                          {profitPct && <span className="pf-profit__pct">{profitPct}%</span>}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Category + Sport */}
                  <div className="pff__row">
                    <div className={`pff ${errors.categoryId ? 'pff--error' : ''}`}>
                      <label htmlFor="pf-cat">Categoría *</label>
                      <select
                        id="pf-cat"
                        value={form.categoryId}
                        onChange={(e) => update('categoryId', e.target.value)}
                      >
                        <option value="">Seleccionar...</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                      {errors.categoryId && <span className="pff__err">{errors.categoryId}</span>}
                    </div>
                    <div className="pff">
                      <label htmlFor="pf-sport">Deporte</label>
                      <input
                        id="pf-sport"
                        type="text"
                        value={form.sport}
                        onChange={(e) => update('sport', e.target.value)}
                        placeholder="Ej: Fútbol"
                      />
                    </div>
                  </div>

                  {/* Variantes de Color Centralizadas */}
                  <div className="pf-section-divider" style={{
                    margin: '1.5rem 0 1rem',
                    padding: '1rem 0',
                    borderTop: '1px solid var(--outline-variant)',
                  }}>
                    <h4 className="pf-section-heading" style={{ fontSize: '1rem' }}>
                      <span className="material-symbols-outlined">palette</span>
                      Gestión de Colores y Variantes
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', marginBottom: '1rem' }}>
                      Define los colores disponibles y sube la imagen correspondiente para cada uno.
                    </p>

                    <div className="pf-variants-compact">
                      {form.colors && form.colors.map((color, i) => (
                        <div key={i} className="pf-color-card" style={{
                          background: 'var(--surface-container-low)',
                          padding: '1rem',
                          borderRadius: 'var(--radius-lg)',
                          marginBottom: '0.75rem',
                          display: 'grid',
                          gridTemplateColumns: 'auto 1fr auto auto',
                          gap: '1rem',
                          alignItems: 'center',
                          border: i === 0 ? '2px solid var(--primary)' : '1px solid var(--outline-variant)'
                        }}>
                          {/* Picker & Preview */}
                          <div style={{ position: 'relative', width: '40px', height: '40px' }}>
                            <div style={{
                              width: '100%',
                              height: '100%',
                              borderRadius: '50%',
                              background: color.hex || '#ccc',
                              border: '2px solid var(--outline-variant)'
                            }} />
                            <input
                              type="color"
                              value={color.hex || '#000000'}
                              onChange={(e) => updateColorOption(i, 'hex', e.target.value)}
                              style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
                            />
                          </div>

                          {/* Name Input */}
                          <div className="pff" style={{ gap: '0' }}>
                            <input
                              type="text"
                              value={color.name}
                              placeholder="Nombre del color"
                              onChange={(e) => {
                                updateColorOption(i, 'name', e.target.value);
                                if (i === 0) update('color', e.target.value);
                              }}
                              style={{ background: 'transparent', padding: '0.5rem 0', borderBottom: '1px solid var(--outline-variant)', borderRadius: 0 }}
                            />
                          </div>

                          {/* Image Upload Area */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                              width: '44px', height: '44px', borderRadius: '6px',
                              background: 'var(--surface-container-high)', overflow: 'hidden',
                              border: '1px solid var(--outline-variant)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                              {color.image ? (
                                <img src={color.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              ) : (
                                <span className="material-symbols-outlined" style={{ fontSize: '1.2rem', color: 'var(--on-surface-variant)' }}>image</span>
                              )}
                            </div>
                            <button
                              type="button"
                              className="pf-auto-btn"
                              onClick={() => triggerColorUpload(i)}
                              disabled={uploadingField === `color-${i}`}
                              style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                            >
                              {uploadingField === `color-${i}` ? <span className="pf-spinner pf-spinner--sm" /> : 'Subir Imagen'}
                            </button>
                          </div>

                          {/* Actions */}
                          {i > 0 && (
                            <button type="button" className="pf-btn-icon" onClick={() => removeColorOption(i)}>
                              <span className="material-symbols-outlined">delete</span>
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        className="pf-dyn-add"
                        onClick={addColorOption}
                      >
                        <span className="material-symbols-outlined">add_circle</span>
                        Añadir otra variante de color
                      </button>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="pff">
                    <label htmlFor="pf-badge">Badge / Etiqueta</label>
                    <input
                      id="pf-badge"
                      type="text"
                      value={form.badge}
                      onChange={(e) => update('badge', e.target.value)}
                      placeholder="Ej: Nuevo, Oferta, Popular"
                    />
                  </div>

                  {/* Short description */}
                  <div className="pff">
                    <label htmlFor="pf-sdesc">Descripción Corta</label>
                    <textarea
                      id="pf-sdesc"
                      rows={2}
                      value={form.shortDescription}
                      onChange={(e) => update('shortDescription', e.target.value)}
                      placeholder="Resumen para tarjetas de producto (máx. 300 caracteres)"
                      maxLength={300}
                    />
                    <span className="pff__hint">{form.shortDescription.length}/300</span>
                  </div>

                  {/* Description */}
                  <div className="pff">
                    <label htmlFor="pf-desc">Descripción Completa</label>
                    <textarea
                      id="pf-desc"
                      rows={5}
                      value={form.description}
                      onChange={(e) => update('description', e.target.value)}
                      placeholder="Descripción detallada del producto..."
                    />
                  </div>

                </div>
              )}

              {/* ==================== TAB: IMAGES ==================== */}
              {activeTab === 'images' && (
                <div className="pf-section-content">
                  <h3 className="pf-section-heading">
                    <span className="material-symbols-outlined">collections</span>
                    Imágenes del Producto
                  </h3>

                  {/* Cover image */}
                  <p className="pf-label-sm">Foto Principal</p>
                  <div
                    className={`pf-cover ${!form.image ? 'pf-cover--empty' : ''}`}
                    onClick={() => !form.image && triggerUpload('image')}
                  >
                    {form.image ? (
                      <>
                        <img src={form.image} alt="Portada" className="pf-cover__img" />
                        <div className="pf-cover__overlay">
                          <button
                            type="button"
                            className="pf-cover__btn"
                            onClick={(e) => { e.stopPropagation(); triggerUpload('image'); }}
                          >
                            <span className="material-symbols-outlined">edit</span>
                            Cambiar foto
                          </button>
                          <button
                            type="button"
                            className="pf-cover__btn pf-cover__btn--del"
                            onClick={(e) => { e.stopPropagation(); update('image', ''); }}
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="pf-cover__placeholder">
                        <span className="material-symbols-outlined">add_a_photo</span>
                        <p>{uploadingField === 'image' ? 'Subiendo...' : 'Clic para añadir foto principal'}</p>
                      </div>
                    )}
                  </div>

                  {/* Gallery */}
                  <p className="pf-label-sm" style={{ marginTop: '1.5rem' }}>
                    Galería ({form.images.length} imágenes)
                  </p>
                  <div className="pf-gallery">
                    {form.images.map((img, i) => (
                      <div key={i} className={`pf-gallery__item ${!img ? 'pf-gallery__item--empty' : ''}`}>
                        {img ? (
                          <>
                            <img src={img} alt={`Gallery ${i + 1}`} />
                            <div className="pf-gallery__actions">
                              <button
                                type="button"
                                title="Establecer como principal"
                                onClick={() => setPrimaryImage(img)}
                              >
                                <span className="material-symbols-outlined">star</span>
                              </button>
                              <button
                                type="button"
                                title="Cambiar imagen"
                                onClick={() => triggerGalleryUpload(i)}
                              >
                                <span className="material-symbols-outlined">sync</span>
                              </button>
                              <button
                                type="button"
                                title="Eliminar"
                                className="pf-gallery__del"
                                onClick={() => removeImage(i)}
                              >
                                <span className="material-symbols-outlined">delete</span>
                              </button>
                            </div>
                          </>
                        ) : (
                          <button
                            type="button"
                            className="pf-gallery__add-box"
                            onClick={() => triggerGalleryUpload(i)}
                            disabled={uploadingField === `images-${i}`}
                          >
                            <span className="material-symbols-outlined">add_photo_alternate</span>
                            <span>{uploadingField === `images-${i}` ? '...' : 'Subir'}</span>
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" className="pf-gallery__new" onClick={addImage}>
                      <span className="material-symbols-outlined">add</span>
                      <span>Añadir</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ==================== TAB: INVENTORY ==================== */}
              {activeTab === 'inventory' && (
                <div className="pf-section-content">
                  <h3 className="pf-section-heading">
                    <span className="material-symbols-outlined">inventory</span>
                    Tallas y Stock
                  </h3>

                  {/* Summary bar */}
                  <div className="pf-stock-summary">
                    <div className="pf-stock-stat">
                      <span className="material-symbols-outlined">layers</span>
                      <div>
                        <strong>{form.variants.length}</strong>
                        <small>variantes</small>
                      </div>
                    </div>
                    <div className="pf-stock-stat">
                      <span className="material-symbols-outlined">inventory_2</span>
                      <div>
                        <strong>{totalStock}</strong>
                        <small>stock total</small>
                      </div>
                    </div>
                    <div className="pf-stock-stat">
                      <span className="material-symbols-outlined">warning</span>
                      <div>
                        <strong>{parseInt(form.minStock) || 0}</strong>
                        <small>stock mínimo</small>
                      </div>
                    </div>
                    {totalStock <= (parseInt(form.minStock) || 0) && form.variants.length > 0 && (
                      <div className="pf-stock-alert">
                        <span className="material-symbols-outlined">warning_amber</span>
                        Stock bajo
                      </div>
                    )}
                  </div>

                  {/* Min stock */}
                  <div className="pff" style={{ maxWidth: '200px', marginBottom: '1.5rem' }}>
                    <label htmlFor="pf-minstock">Stock Mínimo (alerta)</label>
                    <input
                      id="pf-minstock"
                      type="number"
                      min="0"
                      value={form.minStock}
                      onChange={(e) => update('minStock', e.target.value)}
                    />
                  </div>

                  {/* Auto-generate */}
                  <button
                    type="button"
                    className="pf-auto-btn"
                    onClick={generateDefaultSizes}
                  >
                    <span className="material-symbols-outlined">auto_awesome</span>
                    Generar tallas automáticas
                  </button>

                  {/* Variants list */}
                  <div className="pf-variants">
                    {form.variants.length === 0 && (
                      <div className="pf-variants__empty">
                        <span className="material-symbols-outlined">inventory_2</span>
                        <p>Sin variantes. Añade tallas manualmente o usa el generador.</p>
                      </div>
                    )}
                    {form.variants.map((v, i) => (
                      <div key={v.id || i} className="pf-variant-row">
                        <input
                          type="text"
                          placeholder="Talla (9.5, M…)"
                          value={v.size}
                          onChange={(e) => updateVariant(i, 'size', e.target.value)}
                        />
                        <input
                          type="number"
                          placeholder="Stock"
                          min="0"
                          value={v.stock}
                          onChange={(e) => updateVariant(i, 'stock', parseInt(e.target.value) || 0)}
                        />
                        <button
                          type="button"
                          className="pf-variant-row__del"
                          onClick={() => removeVariant(i)}
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  <button type="button" className="pf-dyn-add" onClick={addVariant}>
                    <span className="material-symbols-outlined">add_circle</span>
                    Añadir talla manualmente
                  </button>
                </div>
              )}

              {/* ==================== TAB: DETAILS ==================== */}
              {activeTab === 'details' && (
                <div className="pf-section-content">
                  {/* Features */}
                  <h3 className="pf-section-heading">
                    <span className="material-symbols-outlined">bolt</span>
                    Características Destacadas
                  </h3>
                  <div className="pf-dyn-list">
                    {form.features.map((feat, i) => (
                      <div key={i} className="pf-dyn-item">
                        <div className="pf-dyn-item__fields">
                          <input
                            type="text"
                            placeholder="Icono (speed, shield…)"
                            value={feat.icon}
                            onChange={(e) => updateFeature(i, 'icon', e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Título (Protección…)"
                            value={feat.title}
                            onChange={(e) => updateFeature(i, 'title', e.target.value)}
                          />
                          <textarea
                            placeholder="Descripción breve"
                            value={feat.desc}
                            onChange={(e) => updateFeature(i, 'desc', e.target.value)}
                            rows={2}
                            style={{ gridColumn: 'span 2' }}
                          />
                        </div>
                        <button
                          type="button"
                          className="pf-dyn-item__del"
                          onClick={() => removeFeature(i)}
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    ))}
                    <button type="button" className="pf-dyn-add" onClick={addFeature}>
                      <span className="material-symbols-outlined">add_circle</span>
                      Añadir característica
                    </button>
                  </div>

                  {/* Tech Specs */}
                  <h3 className="pf-section-heading" style={{ marginTop: '2rem' }}>
                    <span className="material-symbols-outlined">precision_manufacturing</span>
                    Especificaciones Técnicas
                  </h3>
                  <div className="pff" style={{ marginBottom: '1rem' }}>
                    <label>Descripción de especificaciones</label>
                    <textarea
                      rows={3}
                      value={form.specsDescription}
                      onChange={(e) => update('specsDescription', e.target.value)}
                      placeholder="Texto introductorio para la sección técnica..."
                    />
                  </div>
                  <div className="pf-dyn-list">
                    {form.techSpecs.map((spec, i) => (
                      <div key={i} className="pf-dyn-item">
                        <div className="pf-dyn-item__fields">
                          <input
                            type="text"
                            placeholder="Etiqueta (Peso, Suela…)"
                            value={spec.label}
                            onChange={(e) => updateTechSpec(i, 'label', e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Valor (165g, Fibra…)"
                            value={spec.value}
                            onChange={(e) => updateTechSpec(i, 'value', e.target.value)}
                          />
                        </div>
                        <button
                          type="button"
                          className="pf-dyn-item__del"
                          onClick={() => removeTechSpec(i)}
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    ))}
                    <button type="button" className="pf-dyn-add" onClick={addTechSpec}>
                      <span className="material-symbols-outlined">add_circle</span>
                      Añadir especificación
                    </button>
                  </div>

                  {/* Post-sale & Care (Moved here for better visibility) */}
                  <h3 className="pf-section-heading" style={{ marginTop: '2.5rem' }}>
                    <span className="material-symbols-outlined">verified_user</span>
                    Post-venta y Cuidados
                  </h3>
                  
                  <div className="pff">
                    <label htmlFor="pf-care">Instrucciones de Cuidado</label>
                    <textarea
                      id="pf-care"
                      rows={3}
                      value={form.careInstructions}
                      onChange={(e) => update('careInstructions', e.target.value)}
                      placeholder="Ej: Lavar a mano, no usar blanqueador..."
                    />
                  </div>

                  <div className="pff">
                    <label htmlFor="pf-warranty">Garantía</label>
                    <textarea
                      id="pf-warranty"
                      rows={3}
                      value={form.warranty}
                      onChange={(e) => update('warranty', e.target.value)}
                      placeholder="Ej: 3 meses por defectos de fábrica..."
                    />
                  </div>

                  <div className="pff">
                    <label htmlFor="pf-shipping">Detalles de Envío</label>
                    <textarea
                      id="pf-shipping"
                      rows={3}
                      value={form.shippingDetails}
                      onChange={(e) => update('shippingDetails', e.target.value)}
                      placeholder="Ej: Envío gratis a nivel nacional..."
                    />
                  </div>
                </div>
              )}

              {/* ==================== TAB: SETTINGS ==================== */}
              {activeTab === 'settings' && (
                <div className="pf-section-content">
                  <h3 className="pf-section-heading">
                    <span className="material-symbols-outlined">settings</span>
                    Visibilidad y Estado
                  </h3>

                  <div className="pf-toggles">
                    {/* isActive */}
                    <label className="pf-toggle-row" htmlFor="pf-active">
                      <div>
                        <strong>Producto activo</strong>
                        <p>Disponible para compra (visible en catálogo)</p>
                      </div>
                      <div
                        className={`pf-toggle ${form.isActive ? 'pf-toggle--on' : ''}`}
                        onClick={() => update('isActive', !form.isActive)}
                        role="switch"
                        aria-checked={form.isActive}
                        id="pf-active"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && update('isActive', !form.isActive)}
                      >
                        <div className="pf-toggle__thumb" />
                      </div>
                    </label>

                    {/* isFeatured */}
                    <label className="pf-toggle-row" htmlFor="pf-featured">
                      <div>
                        <strong>Producto destacado</strong>
                        <p>Mostrar en secciones hero y portada</p>
                      </div>
                      <input
                        type="checkbox"
                        id="pf-featured"
                        checked={form.isFeatured}
                        onChange={(e) => update('isFeatured', e.target.checked)}
                        className="pf-checkbox"
                      />
                    </label>
                  </div>
                </div>
              )}

            </div>{/* /pf-panel */}
          </div>{/* /pf-main */}

          {/* ============================================================
              RIGHT COLUMN — Live Preview
          ============================================================ */}
          <div className="pf-preview">
            <h3 className="pf-preview__title">Vista previa</h3>

            {/* Product card preview */}
            <div className="pf-preview__card">
              <div
                className={`pf-preview__img-wrap ${!form.image ? 'pf-preview__img-wrap--empty' : ''}`}
                onClick={() => { setActiveTab('images'); !form.image && triggerUpload('image'); }}
              >
                {form.image ? (
                  <img src={form.image} alt="Preview" />
                ) : (
                  <div className="pf-preview__no-img">
                    <span className="material-symbols-outlined">add_a_photo</span>
                    <p>Añadir foto</p>
                  </div>
                )}
                {form.badge && <span className="pf-preview__badge">{form.badge}</span>}
                {form.isFeatured && (
                  <span className="pf-preview__featured">
                    <span className="material-symbols-outlined">star</span>
                  </span>
                )}
              </div>

              <div className="pf-preview__info">
                {form.sport && <p className="pf-preview__sport">{form.sport}</p>}
                <h4 className="pf-preview__name">{form.name || 'Nombre del producto'}</h4>
                {form.shortDescription && (
                  <p className="pf-preview__sdesc">{form.shortDescription}</p>
                )}
                <div className="pf-preview__pricing">
                  <span className="pf-preview__price">
                    ${parseFloat(form.price || '0').toFixed(2)}
                  </span>
                  {form.originalPrice && (
                    <span className="pf-preview__original">
                      ${parseFloat(form.originalPrice).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="pf-preview__meta">
                  {totalStock > 0 && (
                    <span className="pf-preview__stock pf-preview__stock--ok">
                      <span className="material-symbols-outlined">inventory_2</span>
                      {totalStock} en stock
                    </span>
                  )}
                  {!form.isActive && (
                    <span className="pf-preview__stock pf-preview__stock--off">Inactivo</span>
                  )}
                </div>
              </div>
            </div>

            {/* Profit summary */}
            {profit !== null && (
              <div className={`pf-preview__profit ${profit >= 0 ? '' : 'pf-preview__profit--neg'}`}>
                <span className="material-symbols-outlined">{profit >= 0 ? 'trending_up' : 'trending_down'}</span>
                <div>
                  <strong>Ganancia: ${profit.toFixed(2)}</strong>
                  {profitPct && <small>{profitPct}% sobre costo</small>}
                </div>
              </div>
            )}

            {/* Gallery count */}
            {form.images.length > 0 && (
              <div className="pf-preview__gallery-count">
                <span className="material-symbols-outlined">collections</span>
                {form.images.length} imágenes en galería
              </div>
            )}
          </div>

        </div>{/* /pf-layout */}

        {/* ============================================================
            Footer actions
        ============================================================ */}
        <div className="pf-actions">
          <button type="button" className="pf-btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="pf-btn-save" disabled={saving}>
            {saving ? (
              <>
                <span className="pf-spinner" />
                Guardando…
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">save</span>
                {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
              </>
            )}
          </button>
        </div>
      </form>

      {/* Hidden file inputs */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRefGallery}
        style={{ display: 'none' }}
        onChange={(e) => handleGalleryUpload(e, activeGalleryIndex.current)}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRefColor}
        style={{ display: 'none' }}
        onChange={handleColorImageUpload}
      />
    </div>
  );
}

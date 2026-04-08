import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import type { Product, ProductVariant } from '../../types';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedColorOption, setSelectedColorOption] = useState<{ name: string, hex: string, image: string } | null>(null);
  const [added, setAdded] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [selectionError, setSelectionError] = useState<string | null>(null);

  const toggleAccordion = (key: string) => {
    setActiveAccordion(prev => prev === key ? null : key);
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    productService.getById(id).then(p => {
      if (!p) {
        setLoading(false);
        return;
      }

      // Calcular stock total
      const totalStock = p.variants?.reduce((sum, v) => sum + (Number(v.stock) || 0), 0) || 0;

      if (totalStock <= 0) {
        // Redirigir si no hay stock
        navigate('/catalog', { replace: true });
        return;
      }

      setProduct(p);
      // Eliminamos la auto-selección automática para forzar al usuario a elegir
      
      // Fetch suggested products
      if (p.categoryId) {
        productService.getAll().then(all => {
          const others = all.filter(item => item.categoryId === p.categoryId && item.id !== p.id);
          setSuggested(others.slice(0, 4));
        });
      }

      setLoading(false);
    });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const hasVariants = product.variants && product.variants.length > 0;
    const hasColors = product.colors && product.colors.length > 0;

    if (hasVariants && !selectedVariant) {
      setSelectionError('POR FAVOR, SELECCIONA UNA TALLA');
      return;
    }

    if (hasColors && !selectedColorOption) {
      setSelectionError('POR FAVOR, SELECCIONA UN COLOR');
      return;
    }

    setSelectionError(null);
    addToCart(product, selectedVariant ?? undefined, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <main className="detail" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="loading-spinner"><div className="loading-spinner__ring" /><span className="loading-spinner__logo">K</span></div>
      </main>
    );
  }

  const baseImage = selectedColorOption?.image || product?.image;
  // Convertimos a Set para eliminar duplicados (si la baseImage también está en images)
  const productImages = product
    ? Array.from(new Set([baseImage, ...(product.images || [])].filter(Boolean)))
    : [];

  const displayName = product?.name || 'VELOCITY X-1';
  const displayPrice = product?.price || 285;

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % productImages.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length);

  return (
    <main className="detail">
      <section className="detail__hero">
        <div className="detail__gallery">
          <div className="detail__gallery-main">
            <div className="detail__gallery-counter">
              {currentImage + 1} / {productImages.length}
            </div>

            <img src={productImages[currentImage]} alt={displayName} key={currentImage} />

            {productImages.length > 1 && (
              <div className="detail__gallery-nav">
                <button className="detail__nav-btn" onClick={prevImage}>
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="detail__nav-btn" onClick={nextImage}>
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            )}
          </div>

          <div className="detail__accordion-wrapper detail__accordion-wrapper--gallery">
            {/* Features/Characteristics */}
            <div className="detail__accordion">
              <button className="detail__accordion-btn" onClick={() => toggleAccordion('features')}>
                <span>Características</span>
                <span className="material-symbols-outlined" style={{ transform: activeAccordion === 'features' ? 'rotate(180deg)' : 'rotate(0)' }}>keyboard_arrow_down</span>
              </button>
              <div className={`detail__accordion-content ${activeAccordion === 'features' ? 'detail__accordion-content--open' : ''}`}>
                <div className="detail__accordion-inner">
                  {product?.features && product.features.length > 0 && (
                    <div className="detail__desc-block">
                      <h4>Características Destacadas</h4>
                      <div className="detail__features-card" style={{ marginTop: '0', background: 'transparent', padding: '0' }}>
                        {product.features.map((feat, i) => (
                          <div className="detail__feature-item" key={i}>
                            <span className="material-symbols-outlined">{feat.icon}</span>
                            <div className="detail__feature-text"><strong>{feat.title}</strong><p>{feat.desc}</p></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {product?.techSpecs && product.techSpecs.length > 0 && (
                    <div className="detail__desc-block">
                      <h4>Especificaciones Técnicas</h4>
                      <p style={{ marginBottom: '1rem', fontSize: '0.85rem' }}>{product?.specsDescription}</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                        {product.techSpecs.map((spec, i) => (
                          <div key={i} style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '1rem' }}>
                            <small style={{ color: 'var(--slate-400)', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.6rem' }}>{spec.label}</small>
                            <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>{spec.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Care */}
            <div className="detail__accordion">
              <button className="detail__accordion-btn" onClick={() => toggleAccordion('care')}>
                <span>Cuidados</span>
                <span className="material-symbols-outlined" style={{ transform: activeAccordion === 'care' ? 'rotate(180deg)' : 'rotate(0)' }}>keyboard_arrow_down</span>
              </button>
              <div className={`detail__accordion-content ${activeAccordion === 'care' ? 'detail__accordion-content--open' : ''}`}>
                <div className="detail__accordion-inner">
                  <p style={{ fontSize: '0.95rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                    {product?.careInstructions || 'Para mantener tus artículos en óptimas condiciones, límpialos regularmente con un paño húmedo y evita la exposición prolongada al sol directo.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Warranty */}
            <div className="detail__accordion">
              <button className="detail__accordion-btn" onClick={() => toggleAccordion('warranty')}>
                <span>Garantía</span>
                <span className="material-symbols-outlined" style={{ transform: activeAccordion === 'warranty' ? 'rotate(180deg)' : 'rotate(0)' }}>keyboard_arrow_down</span>
              </button>
              <div className={`detail__accordion-content ${activeAccordion === 'warranty' ? 'detail__accordion-content--open' : ''}`}>
                <div className="detail__accordion-inner">
                  <p style={{ fontSize: '0.95rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                    {product?.warranty || 'Este producto cuenta con una garantía de 3 meses por defectos de fabricación bajo condiciones normales de uso.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="detail__accordion">
              <button className="detail__accordion-btn" onClick={() => toggleAccordion('shipping')}>
                <span>Detalles de Envío</span>
                <span className="material-symbols-outlined" style={{ transform: activeAccordion === 'shipping' ? 'rotate(180deg)' : 'rotate(0)' }}>keyboard_arrow_down</span>
              </button>
              <div className={`detail__accordion-content ${activeAccordion === 'shipping' ? 'detail__accordion-content--open' : ''}`}>
                <div className="detail__accordion-inner">
                  <p style={{ fontSize: '0.95rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                    {product?.shippingDetails || 'Realizamos envíos a todo el país. El tiempo estimado de entrega es de 2 a 5 días hábiles dependiendo de tu ubicación.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="detail__info">
          <div className="detail__header-row">
            <span className="detail__series-badge">{product?.badge || 'PRO SERIES'}</span>
            <div className="detail__stars-row">
              <div className="detail__stars-icons">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className="material-symbols-outlined filled star-sm">star</span>
                ))}
              </div>
              <span className="detail__reviews-count">(48 Reviews)</span>
            </div>
          </div>

          <h1 className="detail__name-italic">{displayName.toUpperCase()}</h1>
          <p className="detail__price-large">${displayPrice.toFixed(2)}</p>

          {product?.description && (
            <p className="detail__description-long">
              {product.description}
            </p>
          )}




          {product?.colors && product.colors.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 className="detail__section-label">
                COLOR SELECCIONADO: <span style={{ color: 'var(--on-surface)' }}>{selectedColorOption?.name}</span>
              </h3>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                {product.colors.map((colorObj, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedColorOption(colorObj);
                      setCurrentImage(0); // Volver al inicio de las imagenes
                      setSelectionError(null);
                    }}
                    title={colorObj.name}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: colorObj.hex || '#000',
                      border: selectedColorOption?.name === colorObj.name
                        ? '2px solid var(--on-surface)'
                        : '2px solid transparent',
                      outline: selectedColorOption?.name === colorObj.name
                        ? '2px solid var(--surface-container)'
                        : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    aria-label={`Seleccionar color ${colorObj.name}`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="detail__sizes-section">
            <h3 className="detail__section-label">
              {product?.category?.toLowerCase() === 'calzado' ? 'ELIGE TU TALLA (US)' :
                product?.category?.toLowerCase() === 'ropa' ? 'SELECCIONA TU TALLA' :
                  'VERSIONES DISPONIBLES'}
            </h3>
            <div className="detail__sizes-grid-compact">
              {product?.variants && product.variants.length > 0 ? (
                product.variants.map(v => (
                  <button
                    key={v.id}
                    className={`detail__size-box ${selectedVariant?.id === v.id ? 'detail__size-box--active' : ''} ${v.stock === 0 ? 'detail__size-box--disabled' : ''}`}
                    onClick={() => {
                      if (v.stock > 0) {
                        setSelectedVariant(v);
                        setSelectionError(null);
                      }
                    }}
                    disabled={v.stock === 0}
                  >
                    {v.size}
                  </button>
                ))
              ) : (
                <p className="detail__no-variants">Talla única / Estándar</p>
              )}
            </div>
          </div>

          <div className="detail__stock-indicator">
            <div className={`detail__stock-status ${selectedVariant && selectedVariant.stock < 5 ? 'detail__stock-status--low' : ''}`}>
              <span className="material-symbols-outlined">inventory_2</span>
              <span>
                {selectedVariant
                  ? (selectedVariant.stock > 0 ? `${selectedVariant.stock} unidades disponibles` : 'Sin stock disponible')
                  : 'Selecciona una variante'}
              </span>
            </div>
            {selectedVariant && selectedVariant.stock > 0 && (
              <div className="detail__stock-bar-bg">
                <div
                  className="detail__stock-bar-fill"
                  style={{ width: `${Math.min((selectedVariant.stock / 20) * 100, 100)}%` }}
                />
              </div>
            )}
          </div>


          <div className="detail__actions-vertical">
            {selectionError && (
              <div className="detail__selection-warning fade-in">
                <span className="material-symbols-outlined">warning</span>
                {selectionError}
              </div>
            )}
            <button className="btn-solid-orange" onClick={handleAddToCart}>
              {added ? 'ADDED TO CART' : 'ADD TO CART'}
            </button>
            <button className="btn-outline-gray" onClick={() => { 
              const hasVariants = product?.variants && product.variants.length > 0;
              const hasColors = product?.colors && product.colors.length > 0;
              
              if ((hasVariants && !selectedVariant) || (hasColors && !selectedColorOption)) {
                handleAddToCart(); // Esto disparará el error
                return;
              }
              handleAddToCart(); 
              navigate('/checkout'); 
            }}>
              BUY NOW
            </button>
          </div>
        </div>
      </section>

      <section className="suggested">
        <div className="suggested__header">
          <h2 className="suggested__title-italic">También te podría interesar</h2>
        </div>

        <div className="suggested__grid">
          {suggested.map(item => (
            <div key={item.id} className="suggested__card-minimal" onClick={() => { navigate(`/product/${item.id}`); window.scrollTo(0, 0); }}>
              <div className="suggested__card-img-wrap">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="suggested__card-info-minimal">
                <h4>{item.name.toUpperCase()}</h4>
                <p className="suggested__card-price-orange">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

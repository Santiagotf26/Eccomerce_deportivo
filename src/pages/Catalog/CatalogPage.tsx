import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { useCart } from '../../context/CartContext';
import './CatalogPage.css';

export default function CatalogPage() {
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { categories } = useCategories();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<number | null>(9);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [priceRange, setPriceRange] = useState(500);
  const [addedId, setAddedId] = useState<string | null>(null);
  const sizes = [7, 8, 9, 10, 11];

  const sports = useMemo(() => {
    const allSports = products.map(p => p.sport).filter((s): s is string => !!s);
    return [...new Set(allSports)];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (selectedCats.length > 0 && !selectedCats.includes(p.categoryId)) return false;
      if (selectedSport && p.sport !== selectedSport) return false;
      if (p.price > priceRange) return false;
      return true;
    });
  }, [products, selectedCats, selectedSport, priceRange]);

  const toggleCat = (catId: string) => {
    setSelectedCats(prev =>
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
  };

  const handleAddToCart = (e: React.MouseEvent, product: typeof products[0]) => {
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <main className="catalog">
      <div className="catalog__header">
        <h1 className="catalog__title">Catálogo de <span className="catalog__title--accent">Rendimiento</span></h1>
        <p className="catalog__subtitle">Equipa tu viaje con equipo de grado profesional diseñado para movimientos explosivos y una precisión sin igual en el campo.</p>
      </div>

      <div className="catalog__layout">
        <aside className="catalog__sidebar">
          <div className="catalog__sidebar-inner">
            <div className="filter-group">
              <h3 className="filter-group__title">Categoría</h3>
              <div className="filter-group__options">
                {categories.map(cat => (
                  <label className="filter-checkbox" key={cat.id}>
                    <input
                      type="checkbox"
                      className="filter-checkbox__input"
                      checked={selectedCats.includes(cat.id)}
                      onChange={() => toggleCat(cat.id)}
                    />
                    <span className="filter-checkbox__label">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3 className="filter-group__title">Deporte</h3>
              <div className="filter-chips">
                <span className={`filter-chip ${!selectedSport ? 'filter-chip--active' : ''}`} onClick={() => setSelectedSport('')}>Todos</span>
                {sports.map(s => (
                  <span key={s} className={`filter-chip ${selectedSport === s ? 'filter-chip--active' : ''}`} onClick={() => setSelectedSport(s)}>{s}</span>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3 className="filter-group__title">Talla</h3>
              <div className="filter-sizes">
                {sizes.map(s => (
                  <button key={s} className={`filter-size ${selectedSize === s ? 'filter-size--active' : ''}`} onClick={() => setSelectedSize(s)}>{s}</button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3 className="filter-group__title">Rango de Precio</h3>
              <input type="range" className="filter-range" min="0" max="500" value={priceRange} onChange={e => setPriceRange(Number(e.target.value))} />
              <div className="filter-range__labels">
                <span>$0</span>
                <span>${priceRange}+</span>
              </div>
            </div>

            <div className="sidebar-banner">
              <div className="sidebar-banner__bg">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2Gy26KZFxzQbwuDbNdNEWfDUQDOlNFKTsuGoJ1-DmzPdZx6onbvsreLGtpadTz_RZuLIABnPm3-wq9u2_h6wXiAsB10IhDwF4BK7YrVIs-SWfsjluJCYvMMCfTQ3UxQ1rxpnlgm7K4nTX2LWY0eYmZJ4W2mgsBdnmi-JKhf9QczkolNc9VOuJYqgAUt7d4FsOmK1KiA3vbU0pdh92nEDSs6CD7ddDMgXxAqZT3YZebKD-MKGtN3ccTv1aPT1puarVfXMbIlIg27U" alt="" />
              </div>
              <div className="sidebar-banner__content">
                <h4 className="sidebar-banner__title">ACADEMIA<br/>KINETIC</h4>
                <p className="sidebar-banner__desc">Domina el campo con entrenamiento de élite. Inscripciones abiertas para primavera 2024.</p>
                <button className="sidebar-banner__btn" onClick={() => navigate('/academy')}>Postular Ahora</button>
              </div>
            </div>
          </div>
        </aside>

        <div className="catalog__products">
          {loading ? (
            <div className="catalog__loading">
              <div className="loading-spinner"><div className="loading-spinner__ring" /><span className="loading-spinner__logo">K</span></div>
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map(product => {
                const isOutOfStock = product.variants && product.variants.length > 0 
                  ? product.variants.reduce((sum, v) => sum + (Number(v.stock) || 0), 0) <= 0 
                  : false;

                return (
                <div 
                  className={`product-card ${isOutOfStock ? 'product-card--out-of-stock' : ''}`} 
                  key={product.id} 
                  onClick={() => !isOutOfStock && navigate(`/product/${product.id}`)}
                  style={{ cursor: isOutOfStock ? 'default' : 'pointer' }}
                >
                  <div className={`product-card__image-wrap ${product.badge?.includes('Oferta') ? 'product-card__image-wrap--sale' : ''}`} style={{ overflow: 'hidden' }}>
                    {isOutOfStock && (
                      <div className="product-card__out-of-stock-ribbon">
                        Agotado
                      </div>
                    )}
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="product-card__img" style={{ filter: isOutOfStock ? 'grayscale(100%) opacity(0.6)' : 'none' }} />
                    ) : (
                      <div className="product-card__img" />
                    )}
                    {product.badge && !isOutOfStock && (
                      <div className={`product-card__badge ${product.badge.includes('Oferta') ? 'product-card__badge--sale' : ''}`}>{product.badge}</div>
                    )}
                  </div>
                  <div className="product-card__info">
                    <div className="product-card__meta">
                      <p className="product-card__category">{product.sport} • {product.category}</p>
                      <h3 className="product-card__name">{product.name}</h3>
                      {product.shortDescription && (
                        <p style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', marginTop: '0.3rem', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {product.shortDescription}
                        </p>
                      )}
                      <div className="product-card__rating">
                        <span className="material-symbols-outlined filled star-icon">star</span>
                        <span className="product-card__rating-text">{product.rating} ({product.reviews} reseñas)</span>
                      </div>
                    </div>
                    <div className="product-card__price-wrap">
                      {product.originalPrice && <span className="product-card__original-price">${product.originalPrice.toFixed(2)}</span>}
                      <span className="product-card__price">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <button 
                    className={`product-card__add-btn ${addedId === product.id ? 'product-card__add-btn--added' : ''} ${isOutOfStock ? 'product-card__add-btn--disabled' : ''}`} 
                    onClick={(e) => !isOutOfStock && handleAddToCart(e, product)}
                    disabled={isOutOfStock}
                    style={{
                      opacity: isOutOfStock ? 0.5 : 1,
                      cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                      background: isOutOfStock ? 'var(--surface-container-highest)' : ''
                    }}
                  >
                    <span className="material-symbols-outlined">{addedId === product.id ? 'check' : isOutOfStock ? 'block' : 'shopping_bag'}</span>
                    {addedId === product.id ? '¡Añadido!' : isOutOfStock ? 'Extinto / Agotado' : 'Añadir al Carrito'}
                  </button>
                </div>
                );
              })}
              {filtered.length === 0 && !loading && (
                <div className="catalog__empty">
                  <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--on-surface-variant)' }}>search_off</span>
                  <p>No se encontraron productos con los filtros seleccionados.</p>
                </div>
              )}
            </div>
          )}

          <div className="catalog-banner">
            <div className="catalog-banner__bg">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEtIFkzwVOYzdgYy6_W91TAne3X_z1sv_92YZ1SocBuPXa8Yzq0Z6dIa9GroRlZN19q3hYw3SDU0oyJnCjLLQ_XV0g01AB94boC-TDvLJmq325NGaYWMA9ldrtxRETN8OGLaC9HqHbEW0ZRouhpaGuA88K0fDdjuWHVRUqmf23sZ4bQ_xLM7HdesCBR74zJPzO91MfWLPI9lz4pWZ4TjVnkImX55SdhwCyep0mZv2hdUy_u22B16e1m5lJJAzbu8r7dkg_4PlIQqk" alt="" />
            </div>
            <div className="catalog-banner__content">
              <h2 className="catalog-banner__title">Desata tu <br /><span className="catalog-banner__accent">Máximo Potencial.</span></h2>
              <p className="catalog-banner__desc">Nuestra Academia no es solo una escuela—es un trampolín para la próxima generación de atletas de élite.</p>
              <div className="catalog-banner__actions">
                <button className="btn btn--primary btn--lg" onClick={() => navigate('/academy')}>Inscribirse en la Academia</button>
                <button className="btn btn--ghost btn--lg">Descargar Currículo</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

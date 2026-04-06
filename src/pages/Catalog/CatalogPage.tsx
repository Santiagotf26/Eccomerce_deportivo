import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import './CatalogPage.css';

export default function CatalogPage() {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<number | null>(9);
  const sizes = [7, 8, 9, 10, 11];

  return (
    <main className="catalog">
      {/* Header */}
      <div className="catalog__header">
        <h1 className="catalog__title">Performance <span className="catalog__title--accent">Catalog</span></h1>
        <p className="catalog__subtitle">Equip your journey with pro-grade gear designed for explosive movement and unmatched precision on the pitch.</p>
      </div>

      <div className="catalog__layout">
        {/* Sidebar */}
        <aside className="catalog__sidebar">
          <div className="catalog__sidebar-inner">
            {/* Category */}
            <div className="filter-group">
              <h3 className="filter-group__title">Category</h3>
              <div className="filter-group__options">
                {['Shoes', 'Apparel', 'Equipment'].map(cat => (
                  <label className="filter-checkbox" key={cat}>
                    <input type="checkbox" className="filter-checkbox__input" />
                    <span className="filter-checkbox__label">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sport */}
            <div className="filter-group">
              <h3 className="filter-group__title">Sport</h3>
              <div className="filter-chips">
                <span className="filter-chip filter-chip--active">Soccer</span>
                <span className="filter-chip">Basketball</span>
                <span className="filter-chip">Training</span>
              </div>
            </div>

            {/* Size */}
            <div className="filter-group">
              <h3 className="filter-group__title">Size</h3>
              <div className="filter-sizes">
                {sizes.map(s => (
                  <button
                    key={s}
                    className={`filter-size ${selectedSize === s ? 'filter-size--active' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="filter-group">
              <h3 className="filter-group__title">Price Range</h3>
              <input type="range" className="filter-range" min="0" max="500" />
              <div className="filter-range__labels">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>

            {/* Academy Banner */}
            <div className="sidebar-banner">
              <div className="sidebar-banner__bg">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2Gy26KZFxzQbwuDbNdNEWfDUQDOlNFKTsuGoJ1-DmzPdZx6onbvsreLGtpadTz_RZuLIABnPm3-wq9u2_h6wXiAsB10IhDwF4BK7YrVIs-SWfsjluJCYvMMCfTQ3UxQ1rxpnlgm7K4nTX2LWY0eYmZJ4W2mgsBdnmi-JKhf9QczkolNc9VOuJYqgAUt7d4FsOmK1KiA3vbU0pdh92nEDSs6CD7ddDMgXxAqZT3YZebKD-MKGtN3ccTv1aPT1puarVfXMbIlIg27U" alt="" />
              </div>
              <div className="sidebar-banner__content">
                <h4 className="sidebar-banner__title">KINETIC<br/>ACADEMY</h4>
                <p className="sidebar-banner__desc">Master the pitch with elite coaching. Enrollment now open for Spring 2024.</p>
                <button className="sidebar-banner__btn" onClick={() => navigate('/academy')}>Apply Now</button>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="catalog__products">
          <div className="product-grid">
            {products.map(product => (
              <div className="product-card" key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
                <div className={`product-card__image-wrap ${product.badge?.includes('Sale') ? 'product-card__image-wrap--sale' : ''}`}>
                  <img src={product.image} alt={product.name} className="product-card__img" />
                  {product.badge && (
                    <div className={`product-card__badge ${product.badge.includes('Sale') ? 'product-card__badge--sale' : ''}`}>
                      {product.badge}
                    </div>
                  )}
                </div>
                <div className="product-card__info">
                  <div className="product-card__meta">
                    <p className="product-card__category">{product.sport} • {product.category}</p>
                    <h3 className="product-card__name">{product.name}</h3>
                    <div className="product-card__rating">
                      <span className="material-symbols-outlined filled star-icon">star</span>
                      <span className="product-card__rating-text">{product.rating} ({product.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="product-card__price-wrap">
                    {product.originalPrice && (
                      <span className="product-card__original-price">${product.originalPrice.toFixed(2)}</span>
                    )}
                    <span className="product-card__price">${product.price.toFixed(2)}</span>
                  </div>
                </div>
                <button className="product-card__add-btn" onClick={(e) => { e.stopPropagation(); }}>
                  <span className="material-symbols-outlined">shopping_bag</span>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Bottom Academy Banner */}
          <div className="catalog-banner">
            <div className="catalog-banner__bg">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEtIFkzwVOYzdgYy6_W91TAne3X_z1sv_92YZ1SocBuPXa8Yzq0Z6dIa9GroRlZN19q3hYw3SDU0oyJnCjLLQ_XV0g01AB94boC-TDvLJmq325NGaYWMA9ldrtxRETN8OGLaC9HqHbEW0ZRouhpaGuA88K0fDdjuWHVRUqmf23sZ4bQ_xLM7HdesCBR74zJPzO91MfWLPI9lz4pWZ4TjVnkImX55SdhwCyep0mZv2hdUy_u22B16e1m5lJJAzbu8r7dkg_4PlIQqk" alt="" />
            </div>
            <div className="catalog-banner__content">
              <h2 className="catalog-banner__title">Unleash Your <br /><span className="catalog-banner__accent">Full Potential.</span></h2>
              <p className="catalog-banner__desc">Our Academy isn't just a school—it's a launchpad for the next generation of elite athletes.</p>
              <div className="catalog-banner__actions">
                <button className="btn btn--primary btn--lg" onClick={() => navigate('/academy')}>Enroll in Academy</button>
                <button className="btn btn--ghost btn--lg">Download Curriculum</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

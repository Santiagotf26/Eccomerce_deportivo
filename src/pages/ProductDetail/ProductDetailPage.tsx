import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { relatedProducts } from '../../data/products';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(9);
  const sizes = [7, 8, 9, 10, 11, 12];

  const images = {
    main: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPxQ9N4WY2QRmEVDHV80HMasPKkIu9yqdbKTm2HrbZQYfINkTSdIFwpzfyL1ZHPKmF4dZV5rr6JLOCs9ZTkkp9_Ti7QuJ3ktb4Q8o1aGlVm-IINF8AG2bUNEwVRR_54GypR6PzmkjGtm4na8ap6T8qmc44l45HZG19g2ZmAdf6zgFqg1wO8e4L25-0Kyi8l04Y40X4wEBP1VoeEpJIaURbEzxrrmrqg_bA9RV4ruN8ODMnOaAQVIl8UHCa37WSMFEIqFvOBrx_gAI',
    secondary: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-z6xNbA6uGjsrwHUIEQ-c1_7zlC95f3RxeDTl1ZRzidxhyBGEvpzjIX0sw5ShXqKgB9_E3paV8tXyV1rIsUkUf0bR6oQ0tbZi6C0odFflsAc35X38n2ghCchwSwihQZhUBBqqd84a_z0NYb_-CBSYTblC8W72jT45AQjHCgEB1Q709DoZxOQDVrQl_CQYwBTi90_LQaBJJultZFSsJxJu3xj-0el_ZctENNkjp0xU7TSS0XcLgTfo9_geomWeF8QNW5Nt909Vb-Y',
    action: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7JEdFlexqT_pr1Rmlz-po-pEmU_ujHO4M8fBC_kXFFJuBPz6rn08of0VFbrLj8MpyHwqsePqv81Btqem3_yreK7SxK1SJlnylWVK9poEx02bd7pfrcKbQN5Nta8wVVNF4cUGlo7YvxKUqJ0CeLnJaehDiXnwxGPwNrVycVX578LeNExfZGNqWsEH836HEXEKS2u42kjqZa-EVoRIYEr24FaikkWAA0-xL5ripmFkGUQe2yk9XzkN2_6ixbY7YYmxHkewylLTH-Bo',
  };

  return (
    <main className="detail">
      {/* Product Hero */}
      <section className="detail__hero">
        <div className="detail__gallery">
          <div className="detail__gallery-main">
            <img src={images.main} alt="VELOCITY X-1 profile" />
          </div>
          <div className="detail__gallery-thumb">
            <img src={images.secondary} alt="Sole view" />
          </div>
          <div className="detail__gallery-thumb detail__gallery-thumb--zoom">
            <img src={images.action} alt="Action shot" />
            <div className="detail__zoom-overlay">
              <span className="material-symbols-outlined">zoom_in</span>
            </div>
          </div>
        </div>

        <div className="detail__info">
          <div className="detail__badges">
            <span className="detail__series-badge">Pro Series</span>
            <div className="detail__stars">
              {[1,2,3,4].map(i => (
                <span key={i} className="material-symbols-outlined filled star-sm">star</span>
              ))}
              <span className="material-symbols-outlined star-sm">star</span>
              <span className="detail__reviews-count">(48 Reviews)</span>
            </div>
          </div>

          <h1 className="detail__name">VELOCITY X-1</h1>
          <p className="detail__price">$285.00</p>

          <div className="detail__sizes">
            <h3 className="detail__sizes-label">Select Size (US)</h3>
            <div className="detail__sizes-grid">
              {sizes.map(s => (
                <button
                  key={s}
                  className={`detail__size-btn ${selectedSize === s ? 'detail__size-btn--active' : ''}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
              <button className="detail__size-btn detail__size-btn--disabled" disabled>13</button>
            </div>
          </div>

          <div className="detail__actions">
            <button className="btn btn--primary detail__add-btn" onClick={() => navigate('/checkout')}>ADD TO CART</button>
            <button className="btn btn--ghost detail__buy-btn">BUY NOW</button>
          </div>

          <div className="detail__features-box">
            <div className="detail__feature">
              <span className="material-symbols-outlined feature-icon">speed</span>
              <div>
                <h4>Ultra-Lite Carbon</h4>
                <p>Engineered for explosive acceleration and maximum energy return on firm ground.</p>
              </div>
            </div>
            <div className="detail__feature">
              <span className="material-symbols-outlined feature-icon">precision_manufacturing</span>
              <div>
                <h4>GripControl Skin</h4>
                <p>Precision texture for decisive command over the ball in all weather conditions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="specs">
        <h2 className="specs__title">TECHNICAL SPECIFICATIONS</h2>
        <div className="specs__grid">
          <div className="specs__main">
            <div className="specs__main-content">
              <h3>AERODYNAMIC SUPERIORITY</h3>
              <p>The Velocity X-1 features a micro-textured synthetic upper that reduces drag during high-speed sprints. The seamless construction provides a second-skin feel, eliminating distractions at the moment of impact.</p>
              <ul className="specs__list">
                <li><span className="specs__dot" /> Weight: 165g</li>
                <li><span className="specs__dot" /> Material: KinetiSkin Pro</li>
                <li><span className="specs__dot" /> Outsole: RapidFlex TPU</li>
              </ul>
            </div>
            <div className="specs__glow" />
          </div>
          <div className="specs__badge-card">
            <span className="material-symbols-outlined specs__bolt">bolt</span>
            <h3>STADIUM GRADE</h3>
            <p>Tested by elite athletes in the highest-intensity environments. Ready for match day.</p>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="related">
        <div className="related__header">
          <h2 className="related__title">GEAR UP THE SQUAD</h2>
          <a className="related__view-all" onClick={() => navigate('/catalog')}>
            VIEW COLLECTION <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
        <div className="related__scroll hide-scrollbar">
          {relatedProducts.map((item, i) => (
            <div className="related__card" key={i}>
              <div className="related__card-image">
                <img src={item.image} alt={item.name} />
                <button className="related__quick-add">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
              <h4 className="related__card-name">{item.name}</h4>
              <p className="related__card-price">{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews">
        <div className="reviews__grid">
          <div className="reviews__summary">
            <h2 className="reviews__heading">PLAYER FEEDBACK</h2>
            <div className="reviews__score-row">
              <span className="reviews__big-score">4.8</span>
              <div>
                <div className="reviews__stars">
                  {[1,2,3,4].map(i => <span key={i} className="material-symbols-outlined filled">star</span>)}
                  <span className="material-symbols-outlined filled">star_half</span>
                </div>
                <p className="reviews__count">Based on 124 ratings</p>
              </div>
            </div>
            <div className="reviews__bars">
              {[{n: 5, w: 85}, {n: 4, w: 10}, {n: 3, w: 3}].map(b => (
                <div className="reviews__bar-row" key={b.n}>
                  <span className="reviews__bar-label">{b.n}</span>
                  <div className="reviews__bar-track">
                    <div className="reviews__bar-fill" style={{ width: `${b.w}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reviews__list">
            <div className="reviews__item">
              <div className="reviews__item-header">
                <div>
                  <h4>MARCUS T.</h4>
                  <div className="reviews__item-stars">
                    {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined filled">star</span>)}
                  </div>
                </div>
                <span className="reviews__item-date">2 DAYS AGO</span>
              </div>
              <p className="reviews__item-text">"Incredible lockdown. The carbon fiber plate feels like it's pushing you forward with every step. Worth every penny for serious players."</p>
            </div>
            <div className="reviews__item">
              <div className="reviews__item-header">
                <div>
                  <h4>SARAH K.</h4>
                  <div className="reviews__item-stars">
                    {[1,2,3,4].map(i => <span key={i} className="material-symbols-outlined filled">star</span>)}
                    <span className="material-symbols-outlined">star</span>
                  </div>
                </div>
                <span className="reviews__item-date">1 WEEK AGO</span>
              </div>
              <p className="reviews__item-text">"Best touch on the ball I've ever had. A bit tight at first, but once they break in, they feel like part of your foot."</p>
            </div>
            <button className="reviews__load-more">LOAD MORE REVIEWS</button>
          </div>
        </div>
      </section>
    </main>
  );
}

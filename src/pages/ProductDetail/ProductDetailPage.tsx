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
            <img src={images.main} alt="Perfil VELOCITY X-1" />
          </div>
          <div className="detail__gallery-thumb">
            <img src={images.secondary} alt="Vista de la suela" />
          </div>
          <div className="detail__gallery-thumb detail__gallery-thumb--zoom">
            <img src={images.action} alt="Foto en acción" />
            <div className="detail__zoom-overlay">
              <span className="material-symbols-outlined">zoom_in</span>
            </div>
          </div>
        </div>

        <div className="detail__info">
          <div className="detail__badges">
            <span className="detail__series-badge">Serie Pro</span>
            <div className="detail__stars">
              {[1,2,3,4].map(i => (
                <span key={i} className="material-symbols-outlined filled star-sm">star</span>
              ))}
              <span className="material-symbols-outlined star-sm">star</span>
              <span className="detail__reviews-count">(48 Reseñas)</span>
            </div>
          </div>

          <h1 className="detail__name">VELOCITY X-1</h1>
          <p className="detail__price">$285.00</p>

          <div className="detail__sizes">
            <h3 className="detail__sizes-label">Seleccionar Talla (US)</h3>
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
            <button className="btn btn--primary detail__add-btn" onClick={() => navigate('/checkout')}>AÑADIR AL CARRITO</button>
            <button className="btn btn--ghost detail__buy-btn">COMPRAR AHORA</button>
          </div>

          <div className="detail__features-box">
            <div className="detail__feature">
              <span className="material-symbols-outlined feature-icon">speed</span>
              <div>
                <h4>Carbono Ultra-Ligero</h4>
                <p>Diseñado para una aceleración explosiva y el máximo retorno de energía en terreno firme.</p>
              </div>
            </div>
            <div className="detail__feature">
              <span className="material-symbols-outlined feature-icon">precision_manufacturing</span>
              <div>
                <h4>Piel GripControl</h4>
                <p>Textura de precisión para un mando decisivo sobre el balón en todas las condiciones climáticas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="specs">
        <h2 className="specs__title">ESPECIFICACIONES TÉCNICAS</h2>
        <div className="specs__grid">
          <div className="specs__main">
            <div className="specs__main-content">
              <h3>SUPERIORIDAD AERODINÁMICA</h3>
              <p>El Velocity X-1 presenta una parte superior sintética micro-texturizada que reduce la resistencia durante los sprints de alta velocidad. La construcción sin costuras proporciona una sensación de segunda piel, eliminando distracciones en el momento del impacto.</p>
              <ul className="specs__list">
                <li><span className="specs__dot" /> Peso: 165g</li>
                <li><span className="specs__dot" /> Material: KinetiSkin Pro</li>
                <li><span className="specs__dot" /> Suela: RapidFlex TPU</li>
              </ul>
            </div>
            <div className="specs__glow" />
          </div>
          <div className="specs__badge-card">
            <span className="material-symbols-outlined specs__bolt">bolt</span>
            <h3>GRADO DE ESTADIO</h3>
            <p>Probado por atletas de élite en los entornos de mayor intensidad. Listo para el día del partido.</p>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="related">
        <div className="related__header">
          <h2 className="related__title">EQUIPA AL EQUIPO</h2>
          <a className="related__view-all" onClick={() => navigate('/catalog')}>
            VER COLECCIÓN <span className="material-symbols-outlined">arrow_forward</span>
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
            <h2 className="reviews__heading">COMENTARIOS DE JUGADORES</h2>
            <div className="reviews__score-row">
              <span className="reviews__big-score">4.8</span>
              <div>
                <div className="reviews__stars">
                  {[1,2,3,4].map(i => <span key={i} className="material-symbols-outlined filled">star</span>)}
                  <span className="material-symbols-outlined filled">star_half</span>
                </div>
                <p className="reviews__count">Basado en 124 valoraciones</p>
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
                <span className="reviews__item-date">HACE 2 DÍAS</span>
              </div>
              <p className="reviews__item-text">"Increíble ajuste. La placa de fibra de carbono se siente como si te estuviera empujando hacia adelante con cada paso. Vale cada céntimo para los jugadores serios."</p>
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
                <span className="reviews__item-date">HACE 1 SEMANA</span>
              </div>
              <p className="reviews__item-text">"El mejor toque de balón que he tenido. Un poco apretadas al principio, pero una vez que se amoldan, se sienten como parte de tu propio pie."</p>
            </div>
            <button className="reviews__load-more">CARGAR MÁS RESEÑAS</button>
          </div>
        </div>
      </section>
    </main>
  );
}


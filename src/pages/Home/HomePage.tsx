import { useNavigate } from 'react-router-dom';
import { featuredProducts } from '../../data/products';
import { useProducts } from '../../hooks/useProducts';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const { products } = useProducts();

  const getStockById = (id: string) => {
    const p = products.find(prod => prod.id === id);
    if (!p) return 1; // Default to in-stock if not found in list yet
    return p.variants?.reduce((sum, v) => sum + (Number(v.stock) || 0), 0) || 0;
  };

  return (
    <main className="home">
      {/* ... (Hero section omission for brevity) ... */}
      <section className="featured">
        <div className="featured__header">
          <div>
            <h2 className="section-title">Diseñado para los 90'</h2>
            <p className="section-subtitle">Equipamiento de grado profesional probado al más alto nivel.</p>
          </div>
          <a className="featured__view-all" onClick={() => navigate('/catalog')}>
            Ver Catálogo <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
        <div className="featured__grid">
          <div 
            className={`featured__hero-card ${getStockById('vortex-elite-fg') === 0 ? 'featured__hero-card--disabled' : ''}`} 
            onClick={() => getStockById('vortex-elite-fg') > 0 && navigate('/product/vortex-elite-fg')}
            style={{ cursor: getStockById('vortex-elite-fg') === 0 ? 'default' : 'pointer' }}
          >
            <img 
              src={featuredProducts.hero.image} 
              alt={featuredProducts.hero.name} 
              style={{ filter: getStockById('vortex-elite-fg') === 0 ? 'grayscale(100%) opacity(0.6)' : 'none' }}
            />
            <div className="featured__hero-info">
              <h3>{featuredProducts.hero.name}</h3>
              <p>{featuredProducts.hero.subtitle}</p>
              <span className="featured__shop-label">
                {getStockById('vortex-elite-fg') === 0 ? 'Agotado' : 'Comprar Ahora'}
              </span>
            </div>
            {getStockById('vortex-elite-fg') === 0 && (
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--error)', color: 'white', padding: '0.2rem 0.8rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>AGOTADO</div>
            )}
          </div>
          <div className="featured__side">
            {featuredProducts.small.map((item, i) => {
              const stock = getStockById(item.id);
              return (
              <div 
                className={`featured__side-card ${stock === 0 ? 'featured__side-card--disabled' : ''}`} 
                key={i}
                onClick={() => stock > 0 && navigate(`/product/${item.id}`)}
                style={{ 
                  cursor: stock === 0 ? 'default' : 'pointer',
                  opacity: stock === 0 ? 0.7 : 1
                }}
              >
                <div className="featured__side-text">
                  <span className="featured__side-tag">{stock === 0 ? 'SIN STOCK' : item.tag}</span>
                  <h4 className="featured__side-name" dangerouslySetInnerHTML={{ __html: item.name.replace(' ', '<br/>') }} />
                  <p className="featured__side-price">{item.price}</p>
                </div>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="featured__side-img" 
                  style={{ filter: stock === 0 ? 'grayscale(100%)' : 'none' }}
                />
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* Academy Promotion */}
      <section className="academy-promo">
        <div className="academy-promo__inner">
          <div className="academy-promo__image-wrap">
            <div className="academy-promo__image-frame">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc3s5WZzJvGrWpZW616sk--udjPB3RmsMnN64_nv_2x5YwToaTpNGMrLN7oi6VBL5S0E9w3CTypM-3_ibYDic26r1D8Xk-WhhcLIijONLq2_Lm6fsmeL0WSHbsOCpW3t--3r0d5CJTQMxH3I4LwjBs9V2rRo4aBlv5EjmnG766DHblKN2aKMUJ0xIBjVhpDqQQJU3dEkIgzuXD3_tQXC2g15lHE2rv5hBFs9jIbmvZ54RCNnsSyPd8ZP8U-YTetZ5PL0iTj1ggkVU"
                alt="Entrenador enseñando posicionamiento táctico"
              />
            </div>
            <div className="academy-promo__stat-card">
              <div className="academy-promo__stat-num">01.</div>
              <p className="academy-promo__stat-title">Instrucción Táctica de Élite</p>
              <p className="academy-promo__stat-desc">Personal de entrenamiento de las mejores ligas europeas y academias profesionales.</p>
            </div>
            <div className="academy-promo__blur-orb" />
          </div>

          <div className="academy-promo__text">
            <span className="academy-promo__eyebrow">Escuela de Fútbol Kinetic</span>
            <h2 className="academy-promo__heading">DONDE NACEN<br />LOS PROS.</h2>
            <p className="academy-promo__body">
              Nuestra academia no se trata solo de ejercicios; se trata de desarrollar la inteligencia táctica y la precisión técnica de la próxima generación. Únete a los más de 500 atletas que han pasado a sistemas profesionales.
            </p>
            <ul className="academy-promo__features">
              <li>
                <span className="material-symbols-outlined filled">check_circle</span>
                <div>
                  <p className="academy-promo__feature-title">Personal con Licencia UEFA Pro</p>
                  <p className="academy-promo__feature-desc">Guía experta de los mejores en el juego.</p>
                </div>
              </li>
              <li>
                <span className="material-symbols-outlined filled">check_circle</span>
                <div>
                  <p className="academy-promo__feature-title">Análisis de Video Avanzado</p>
                  <p className="academy-promo__feature-desc">Desglose fotograma a fotograma de tu rendimiento.</p>
                </div>
              </li>
              <li>
                <span className="material-symbols-outlined filled">check_circle</span>
                <div>
                  <p className="academy-promo__feature-title">Pruebas Fisiológicas</p>
                  <p className="academy-promo__feature-desc">Seguimiento biométrico y planes de fitness personalizados.</p>
                </div>
              </li>
            </ul>
            <button className="btn btn--dark btn--round" onClick={() => navigate('/academy')}>
              Reserva tu Plaza de Prueba
              <span className="material-symbols-outlined">arrow_outward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="testimonials">
        <div className="testimonials__inner">
          <div className="testimonials__header">
            <h2 className="section-title">Impacto<br />Probado.</h2>
            <div className="testimonials__bar" />
          </div>
          <div className="testimonials__quotes">
            <blockquote className="testimonials__quote">
              <span className="testimonials__mark">"</span>
              <p className="testimonials__text">
                "El nivel de entrenamiento aquí es comparable al de una academia profesional en España. El equipamiento y el entrenamiento son de primer nivel."
              </p>
              <cite className="testimonials__cite">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSpco9q36eBOKo8H9CjCLdWmOCwFfXFl-myQsxt_3tp2wRBXaiiRu8hS6ebEOtU8gqnYGOe_Fwt9dphr4-abX1T3VhhMdNq5b3-9mbdBEfzEhGkKELWPQ60iDdHEQGt_varp43urZ1_y6osDo7vKdCluUyspWxawgUbI3x5QD-_-NjqHnxSMK1jcxXJHSZlN0qPVmqjZJ6kbPls0E6LVlqg7hd9fwh4WOw1MdUPaIUoqF1EJBgXoaaoEr-PXBXOKhgA56RgCAiF6I"
                  alt="Marco V."
                  className="testimonials__avatar"
                />
                <div>
                  <p className="testimonials__name">Marco V.</p>
                  <p className="testimonials__role">Prospecto de la Selección Nacional Sub-19</p>
                </div>
              </cite>
            </blockquote>
            <blockquote className="testimonials__quote">
              <span className="testimonials__mark">"</span>
              <p className="testimonials__text">
                "Finalmente encontré una marca que entiende los requisitos cinéticos del juego de alta velocidad. Las botas Velocity cambian el juego."
              </p>
              <cite className="testimonials__cite">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCE1T1T6-Y73I41KTiLUHZIc-m9mh4O5GHL2pAHOyzobQEGp0Fz2rJQwEtWbnvRE1-OYcWdNK16SJQnqxIrH5a-5TnQYOEbGgwq9kezQ1LorRP6go3oaXjodMLCiJXDUliJ3PCb8CwXvznIjtKP0N9j8Lis57MiJpx7jtZTXmJebQiVN5IrWrw7HFs-kLjA0OnjQiNIwk0qmjPOi5xiwVEkw2XUrc3hW2zW17-IibSdfIhYNsomP3pyhZy0JqhSFFseohi1QpgPWfM"
                  alt="David K."
                  className="testimonials__avatar"
                />
                <div>
                  <p className="testimonials__name">David K.</p>
                  <p className="testimonials__role">Centrocampista Profesional</p>
                </div>
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="final-cta__wrapper">
          <div className="final-cta__bg">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbj6swlDhI0gGj5rzIRRgmPLBec6Ij1btzMDvYxdyCbUcDlt-9tRbyvf3xLNfuMahiMjBHovv7wpT3cAsh1S2iIcA3LZLnnRmLGjMc1D22wJn3WLfdmtnnVQDJS-gKv9UFCyaBaJT7xAgEjnG4SZPdVgBZx4Yr5ttbGRvf_oeLzVdY9i8fIrX-mzWnu2skvbE5L4U-s12lHyEn3mNXeuqUmpPoSQijP-g08xPBcqM6tyiYqZPL607shWvxCrGxG-lyp_9KQKHFpto"
              alt="Textura de césped de estadio"
            />
          </div>
          <div className="final-cta__content">
            <h2 className="final-cta__title">HAZ TU MEJOR TIRO.</h2>
            <p className="final-cta__desc">
              Ya sea que necesites el equipo para rendir o el entrenamiento para crecer, KINETIC es tu socio definitivo en el campo.
            </p>
            <div className="final-cta__buttons">
              <button className="btn btn--primary btn--round" onClick={() => navigate('/catalog')}>Explorar Tienda</button>
              <button className="btn btn--white btn--round" onClick={() => navigate('/academy')}>Postular a la Academia</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


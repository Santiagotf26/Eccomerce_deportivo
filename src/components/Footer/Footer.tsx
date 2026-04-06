import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <span className="footer__logo">KINETIC</span>
          <p className="footer__tagline">
            Liderando la próxima generación de rendimiento en el fútbol a través de la innovación y la educación de élite.
          </p>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Tienda</h4>
          <ul className="footer__list">
            <li><Link to="/catalog" className="footer__link">Novedades</Link></li>
            <li><Link to="/catalog" className="footer__link">Calzado</Link></li>
            <li><Link to="/catalog" className="footer__link">Equipación de entrenamiento</Link></li>
            <li><Link to="/catalog" className="footer__link">Accesorios</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Empresa</h4>
          <ul className="footer__list">
            <li><a href="#" className="footer__link">Política de privacidad</a></li>
            <li><a href="#" className="footer__link">Términos de servicio</a></li>
            <li><a href="#" className="footer__link">Envíos</a></li>
            <li><a href="#" className="footer__link">Preguntas frecuentes</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Boletín informativo</h4>
          <div className="footer__newsletter">
            <input
              type="email"
              className="footer__input"
              placeholder="ÚNETE AL IMPULSO"
            />
            <button className="footer__subscribe-btn">Suscribirse</button>
          </div>
          <div className="footer__social">
            <div className="footer__social-icon">
              <span className="material-symbols-outlined">public</span>
            </div>
            <div className="footer__social-icon">
              <span className="material-symbols-outlined">share</span>
            </div>
            <div className="footer__social-icon">
              <span className="material-symbols-outlined">podcasts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">© 2024 KINETIC MOMENTUM. TODOS LOS DERECHOS RESERVADOS.</p>
        <div className="footer__bottom-links">
          <span>Instagram</span>
          <span>X / Twitter</span>
          <span>Youtube</span>
        </div>
      </div>
    </footer>
  );
}


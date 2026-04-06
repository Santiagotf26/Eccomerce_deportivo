import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <span className="footer__logo">KINETIC</span>
          <p className="footer__tagline">
            Leading the next generation of soccer performance through innovation and elite education.
          </p>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Shop</h4>
          <ul className="footer__list">
            <li><Link to="/catalog" className="footer__link">New Arrivals</Link></li>
            <li><Link to="/catalog" className="footer__link">Footwear</Link></li>
            <li><Link to="/catalog" className="footer__link">Training Kit</Link></li>
            <li><Link to="/catalog" className="footer__link">Accessories</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Company</h4>
          <ul className="footer__list">
            <li><a href="#" className="footer__link">Privacy Policy</a></li>
            <li><a href="#" className="footer__link">Terms of Service</a></li>
            <li><a href="#" className="footer__link">Shipping</a></li>
            <li><a href="#" className="footer__link">FAQ</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Newsletter</h4>
          <div className="footer__newsletter">
            <input
              type="email"
              className="footer__input"
              placeholder="JOIN THE MOMENTUM"
            />
            <button className="footer__subscribe-btn">Subscribe</button>
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
        <p className="footer__copyright">© 2024 KINETIC MOMENTUM. ALL RIGHTS RESERVED.</p>
        <div className="footer__bottom-links">
          <span>Instagram</span>
          <span>X / Twitter</span>
          <span>Youtube</span>
        </div>
      </div>
    </footer>
  );
}

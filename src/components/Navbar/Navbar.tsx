import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <div className="navbar__left">
          <span className="navbar__logo" onClick={() => navigate('/')}>KINETIC</span>
          <div className="navbar__links">
            <NavLink to="/catalog" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>Shop</NavLink>
            <NavLink to="/academy" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>Soccer School</NavLink>
            <NavLink to="/#about" className="navbar__link">About</NavLink>
            <NavLink to="/#contact" className="navbar__link">Contact</NavLink>
          </div>
        </div>
        <div className="navbar__actions">
          <button className="navbar__icon-btn" onClick={() => navigate('/checkout')} aria-label="Cart">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
          <button className="navbar__icon-btn" aria-label="Account">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

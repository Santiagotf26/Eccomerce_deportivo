import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <div className="navbar__left">
          <span className="navbar__logo" onClick={() => { navigate('/'); closeMenu(); }}>KINETIC</span>
          <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
            <NavLink to="/catalog" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'} onClick={closeMenu}>Tienda</NavLink>
            <NavLink to="/academy" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'} onClick={closeMenu}>Escuela de Fútbol</NavLink>
            <NavLink to="/#about" className="navbar__link" onClick={closeMenu}>Nosotros</NavLink>
            <NavLink to="/#contact" className="navbar__link" onClick={closeMenu}>Contacto</NavLink>
            {isAuthenticated && (
              <NavLink to="/admin" className={({ isActive }) => isActive ? 'navbar__link navbar__link--admin navbar__link--active' : 'navbar__link navbar__link--admin'} onClick={closeMenu}>
                <span className="material-symbols-outlined" style={{ fontSize: '1rem', marginRight: '4px' }}>admin_panel_settings</span>
                Admin
              </NavLink>
            )}
          </div>
        </div>
        <div className="navbar__actions">
          <button className="navbar__icon-btn navbar__cart-btn" onClick={() => navigate('/checkout')} aria-label="Carrito">
            <span className="material-symbols-outlined">shopping_cart</span>
            {totalItems > 0 && <span className="navbar__cart-badge">{totalItems}</span>}
          </button>
          <button
            className="navbar__icon-btn"
            aria-label="Cuenta"
            onClick={() => navigate(isAuthenticated ? '/admin' : '/login')}
          >
            <span className="material-symbols-outlined">account_circle</span>
          </button>
          <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>
      {/* Overlay */}
      {menuOpen && <div className="navbar__overlay" onClick={closeMenu} />}
    </nav>
  );
}

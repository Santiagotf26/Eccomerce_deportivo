import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css';
import Swal from 'sweetalert2';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que quieres salir del panel de administración?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    });

    if (isConfirmed) {
      await logout();
      navigate('/');
    }
  };

  const navItems = [
    { to: '/admin', icon: 'dashboard', label: 'Dashboard', end: true },
    { to: '/admin/orders', icon: 'shopping_cart', label: 'Pedidos', end: false },
    { to: '/admin/products', icon: 'inventory_2', label: 'Productos', end: false },
    { to: '/admin/categories', icon: 'category', label: 'Categorías', end: false },
    { to: '/admin/settings', icon: 'settings', label: 'Configuración', end: false },
  ];

  return (
    <div className="admin">
      {/* Sidebar */}
      <aside className="admin__sidebar">
        <div className="admin__sidebar-top">
          <span className="admin__logo" onClick={() => navigate('/')}>KINETIC</span>
          <span className="admin__role-badge">Admin</span>
        </div>

        <nav className="admin__nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin__nav-item ${isActive ? 'admin__nav-item--active' : ''}`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin__sidebar-bottom">
          <div className="admin__user">
            <div className="admin__user-avatar">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div className="admin__user-info">
              <p className="admin__user-name">{user?.name}</p>
              <p className="admin__user-email">{user?.email}</p>
            </div>
          </div>
          <button className="admin__logout" onClick={handleLogout}>
            <span className="material-symbols-outlined">logout</span>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin__main">
        <Outlet />
      </main>
    </div>
  );
}

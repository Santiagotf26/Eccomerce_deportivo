import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { useOrders } from '../../hooks/useOrders';
import './Dashboard.css';

export default function Dashboard() {
  const { products } = useProducts();
  const { categories } = useCategories();
  const { orders, loading } = useOrders();

  if (loading) return <div className="loading-container">Inyectando datos KINETIC...</div>;

  const totalRevenue = (orders || []).reduce((sum, o) => sum + (o.total_amount || 0), 0);
  
  const stats = [
    { icon: 'inventory_2', label: 'Productos', value: products.length, color: 'var(--primary)' },
    { icon: 'category', label: 'Categorías', value: categories.length, color: 'var(--tertiary)' },
    { icon: 'shopping_cart', label: 'Pedidos Reales', value: (orders || []).length, color: '#2563eb' },
    { icon: 'payments', label: 'Ingresos KINETIC', value: `$${totalRevenue.toLocaleString('es-CO', { minimumFractionDigits: 0 })}`, color: '#16a34a' },
  ];

  const recentActivity = (orders || []).slice(0, 4).map(order => ({
    icon: 'shopping_bag',
    text: `Pedido #${order.order_number} por ${order.user?.first_name || order.customer_name || 'Invitado'}`,
    time: order.created_at ? new Date(order.created_at).toLocaleDateString() : 'Reciente',
    color: '#16a34a'
  }));

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1 className="dashboard__title">Dashboard</h1>
        <p className="dashboard__subtitle">Resumen general de tu tienda KINETIC</p>
      </div>

      {/* Stats Grid */}
      <div className="dashboard__stats">
        {stats.map((stat, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-card__icon" style={{ background: stat.color }}>
              <span className="material-symbols-outlined">{stat.icon}</span>
            </div>
            <div className="stat-card__info">
              <p className="stat-card__label">{stat.label}</p>
              <p className="stat-card__value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="dashboard__charts">
        <div className="chart-card">
          <h3 className="chart-card__title">Ventas por Categoría</h3>
          <div className="chart-card__bars">
            {categories.map((cat, i) => {
              const count = products.filter(p => p.categoryId === cat.id).length;
              const width = products.length > 0 ? (count / products.length) * 100 : 0;
              const colors = ['var(--primary)', 'var(--tertiary)', '#2563eb'];
              return (
                <div className="chart-bar" key={i}>
                  <span className="chart-bar__label">{cat.name}</span>
                  <div className="chart-bar__track">
                    <div className="chart-bar__fill" style={{ width: `${width}%`, background: colors[i % 3] }} />
                  </div>
                  <span className="chart-bar__value">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-card__title">Actividad Reciente</h3>
          <div className="activity-list">
            {recentActivity.map((item, i) => (
              <div className="activity-item" key={i}>
                <div className="activity-item__icon" style={{ color: item.color }}>
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div className="activity-item__info">
                  <p className="activity-item__text">{item.text}</p>
                  <p className="activity-item__time">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

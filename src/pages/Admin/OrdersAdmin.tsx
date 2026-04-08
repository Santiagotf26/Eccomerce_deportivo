import { useState } from 'react';
import { useOrders, type OrderDetail } from '../../hooks/useOrders';
import './OrdersAdmin.css';
import Swal from 'sweetalert2';

export default function OrdersAdmin() {
  const { orders, loading, updateStatus } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    return `status-badge status-badge--${s}`;
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const result = await Swal.fire({
      title: '¿Actualizar estado?',
      text: `El pedido pasará a estado: ${newStatus}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary)',
      confirmButtonText: 'Sí, actualizar'
    });

    if (result.isConfirmed) {
      const success = await updateStatus(orderId, newStatus);
      if (success) {
        Swal.fire('¡Actualizado!', 'El estado ha sido cambiado.', 'success');
        if (selectedOrder?.id === orderId) {
          setSelectedOrder(prev => prev ? { ...prev, order_status: newStatus } : null);
        }
      }
    }
  };

  if (loading) return <div className="loading-container">Cargando gestión de ventas...</div>;

  return (
    <div className="orders-admin">
      <div className="orders-admin__header">
        <div>
          <h1 className="orders-admin__title">Gestión de Ventas</h1>
          <p className="dashboard__subtitle">Supervisa y controla cada impulso de tus clientes</p>
        </div>
      </div>

      <div className="orders-stats">
        <div className="order-stat">
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>shopping_basket</span>
          <div>
            <p className="stat-card__label">Total Pedidos</p>
            <p className="stat-card__value">{orders.length}</p>
          </div>
        </div>
        <div className="order-stat">
          <span className="material-symbols-outlined" style={{ color: '#10b981' }}>payments</span>
          <div>
            <p className="stat-card__label">Ingresos Totales</p>
            <p className="stat-card__value">
              ${orders.reduce((acc, o) => acc + o.total_amount, 0).toLocaleString('es-CO', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td><span className="order-num">#{order.order_number}</span></td>
                <td>
                  <div className="order-client">
                    <span className="order-client__name">
                      {order.user 
                        ? `${order.user.first_name} ${order.user.last_name}` 
                        : (order.customer_name || 'Invitado KINETIC')}
                    </span>
                    <span className="order-client__email">
                      {order.user?.email || order.customer_email || 'Sin contacto'}
                      {!order.user && <span className="guest-badge">GUEST</span>}
                    </span>
                  </div>
                </td>
                <td>{new Date(order.created_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                <td><span style={{ fontWeight: 700 }}>${order.total_amount.toLocaleString('es-CO')}</span></td>
                <td>
                  <span className={getStatusBadge(order.order_status)}>
                    {order.order_status}
                  </span>
                </td>
                <td>
                  <div className="order-actions">
                    <button className="btn-icon" title="Ver Detalles" onClick={() => setSelectedOrder(order)}>
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                    <button className="btn-icon" title="Cambiar Estado" onClick={() => {
                        Swal.fire({
                          title: 'Cambiar Estado',
                          input: 'select',
                          inputOptions: {
                            'PENDING': 'Pendiente',
                            'PAID': 'Pagado',
                            'SHIPPED': 'Enviado',
                            'DELIVERED': 'Entregado',
                            'CANCELLED': 'Cancelado'
                          },
                          inputValue: order.order_status,
                          showCancelButton: true,
                          confirmButtonText: 'Cambiar',
                          confirmButtonColor: 'var(--primary)'
                        }).then((result) => {
                          if (result.isConfirmed) handleStatusChange(order.id, result.value);
                        });
                    }}>
                      <span className="material-symbols-outlined">edit_square</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '4rem', color: 'var(--outline)' }}>
                  Aún no se han registrado ventas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="order-modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="order-modal" onClick={e => e.stopPropagation()}>
            <div className="order-modal__header">
              <h2 className="modal-title">Detalle de Pedido <span style={{ color: 'var(--primary)' }}>#{selectedOrder.order_number}</span></h2>
              <button className="btn-icon" onClick={() => setSelectedOrder(null)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="order-modal__body">
              <div className="modal-section">
                <p className="modal-section__title">Información del Cliente {!selectedOrder.user && '(Invitado)'}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="form-field__label">Nombre</label>
                    <p>
                      {selectedOrder.user 
                        ? `${selectedOrder.user.first_name} ${selectedOrder.user.last_name}` 
                        : (selectedOrder.customer_name || 'Desconocido')}
                    </p>
                  </div>
                  <div>
                    <label className="form-field__label">Email</label>
                    <p>{selectedOrder.user?.email || selectedOrder.customer_email || 'N/A'}</p>
                  </div>
                </div>
                {!selectedOrder.user && selectedOrder.shipping_address && (
                  <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <label className="form-field__label">Dirección de Envío (Guest)</label>
                    <p style={{ fontSize: '0.9rem' }}>
                      {selectedOrder.shipping_address.address}, {selectedOrder.shipping_address.city} {selectedOrder.shipping_address.zip}
                    </p>
                  </div>
                )}
              </div>

              <div className="modal-section">
                <p className="modal-section__title">Productos Comprados ({selectedOrder.orderItems.length})</p>
                <div className="modal-items">
                  {selectedOrder.orderItems.map((item, idx) => (
                    <div className="modal-item" key={idx}>
                      <img src={item.productVariant.product.image_url || ''} alt={item.productVariant.product.name} className="modal-item__img" />
                      <div className="modal-item__info">
                        <p className="modal-item__name">{item.productVariant.product.name}</p>
                        <p className="modal-item__details">
                          Talla: {item.productVariant.size} · Color: {item.productVariant.color} · Cantidad: {item.quantity}
                        </p>
                      </div>
                      <div className="modal-item__price">
                        ${(item.unit_price * item.quantity).toLocaleString('es-CO')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-section" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p className="modal-section__title" style={{ marginBottom: '4px' }}>Estado Actual</p>
                  <span className={getStatusBadge(selectedOrder.order_status)}>{selectedOrder.order_status}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p className="modal-section__title" style={{ marginBottom: '4px' }}>Total Cobrado</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)' }}>
                    ${selectedOrder.total_amount.toLocaleString('es-CO')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

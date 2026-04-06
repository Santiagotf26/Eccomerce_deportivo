import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('card');
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const taxes = totalPrice * 0.04;
  const total = totalPrice + taxes;

  if (items.length === 0) {
    return (
      <main className="checkout">
        <div className="checkout__empty">
          <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: 'var(--on-surface-variant)' }}>shopping_cart</span>
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos desde nuestro catálogo para continuar.</p>
          <button className="btn btn--primary btn--lg" onClick={() => navigate('/catalog')}>Ir al Catálogo</button>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout">
      <header className="checkout__header">
        <h1 className="checkout__title">Pago</h1>
        <p className="checkout__subtitle">Revisa tu equipo y finaliza tu impulso</p>
      </header>

      <div className="checkout__grid">
        <div className="checkout__left">
          <section className="checkout__section">
            <h2 className="checkout__section-title">Tu Selección ({items.length} artículo{items.length > 1 ? 's' : ''})</h2>
            <div className="checkout__items">
              {items.map(item => (
                <div className="cart-item" key={item.product.id}>
                  <div className="cart-item__image">
                    <img src={item.product.image} alt={item.product.name} />
                  </div>
                  <div className="cart-item__details">
                    <div className="cart-item__top">
                      <div>
                        <h3 className="cart-item__name">{item.product.name}</h3>
                        {item.size && <span className="cart-item__tag">Talla {item.size}</span>}
                      </div>
                      <span className="cart-item__price">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                    {item.product.description && <p className="cart-item__desc">{item.product.description}</p>}
                    <div className="cart-item__controls">
                      <div className="quantity-control">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                          <span className="material-symbols-outlined qty-icon">remove</span>
                        </button>
                        <span className="quantity-control__value">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                          <span className="material-symbols-outlined qty-icon">add</span>
                        </button>
                      </div>
                      <button className="cart-item__remove" onClick={() => removeFromCart(item.product.id)}>
                        <span className="material-symbols-outlined">delete</span> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="checkout__forms">
            <div className="form-card">
              <h2 className="form-card__title">
                <span className="material-symbols-outlined form-icon">local_shipping</span>
                Dirección de Envío
              </h2>
              <div className="form-card__fields">
                <div className="form-field">
                  <label className="form-field__label">Nombre Completo</label>
                  <input type="text" className="form-field__input" placeholder="Tu nombre" />
                </div>
                <div className="form-field">
                  <label className="form-field__label">Calle y Número</label>
                  <input type="text" className="form-field__input" placeholder="Calle del Campo 123" />
                </div>
                <div className="form-field__row">
                  <div className="form-field">
                    <label className="form-field__label">Ciudad</label>
                    <input type="text" className="form-field__input" placeholder="Madrid" />
                  </div>
                  <div className="form-field">
                    <label className="form-field__label">Código Postal</label>
                    <input type="text" className="form-field__input" placeholder="28001" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-card">
              <div className="form-card__header">
                <h2 className="form-card__title">
                  <span className="material-symbols-outlined form-icon">payments</span>
                  Información de Facturación
                </h2>
                <label className="form-card__toggle">
                  <input type="checkbox" checked={sameAsShipping} onChange={() => setSameAsShipping(!sameAsShipping)} />
                  <span className="form-card__toggle-text">Igual que el envío</span>
                </label>
              </div>
              <div className={`form-card__placeholders ${sameAsShipping ? 'form-card__placeholders--disabled' : ''}`}>
                <div className="form-card__placeholder" />
                <div className="form-card__placeholder" />
                <div className="form-card__placeholder" />
              </div>
            </div>
          </section>

          <section className="checkout__section">
            <h2 className="checkout__section-title">Método de Pago</h2>
            <div className="payment-methods">
              <div className={`payment-method ${paymentMethod === 'card' ? 'payment-method--active' : ''}`} onClick={() => setPaymentMethod('card')}>
                <span className="material-symbols-outlined payment-method__icon">credit_card</span>
                <span className="payment-method__label">Tarjeta de Crédito</span>
                {paymentMethod === 'card' && <span className="material-symbols-outlined payment-method__check">check_circle</span>}
              </div>
              <div className={`payment-method ${paymentMethod === 'paypal' ? 'payment-method--active' : ''}`} onClick={() => setPaymentMethod('paypal')}>
                <span className="material-symbols-outlined payment-method__icon">account_balance_wallet</span>
                <span className="payment-method__label">PayPal</span>
              </div>
              <div className={`payment-method ${paymentMethod === 'apple' ? 'payment-method--active' : ''}`} onClick={() => setPaymentMethod('apple')}>
                <span className="material-symbols-outlined payment-method__icon">contactless</span>
                <span className="payment-method__label">Apple Pay</span>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="card-form">
                <div className="form-field">
                  <label className="form-field__label">Número de Tarjeta</label>
                  <div className="card-form__input-wrap">
                    <input type="text" className="form-field__input" placeholder="0000 0000 0000 0000" />
                    <div className="card-form__brands"><div className="card-form__brand" /><div className="card-form__brand card-form__brand--alt" /></div>
                  </div>
                </div>
                <div className="form-field__row">
                  <div className="form-field">
                    <label className="form-field__label">Fecha de Vencimiento</label>
                    <input type="text" className="form-field__input" placeholder="MM / AA" />
                  </div>
                  <div className="form-field">
                    <label className="form-field__label">CVC / CVV</label>
                    <input type="text" className="form-field__input" placeholder="123" />
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="checkout__right">
          <div className="order-summary">
            <div className="order-summary__glow" />
            <div className="order-summary__content">
              <h2 className="order-summary__title">Resumen del Pedido</h2>
              <div className="order-summary__lines">
                <div className="order-summary__line">
                  <span>Productos ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                  <span className="order-summary__amount">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="order-summary__line">
                  <span>Envío</span>
                  <span className="order-summary__amount order-summary__amount--free">GRATIS</span>
                </div>
                <div className="order-summary__line">
                  <span>Impuestos (4%)</span>
                  <span className="order-summary__amount">${taxes.toFixed(2)}</span>
                </div>
              </div>
              <div className="order-summary__total">
                <span className="order-summary__total-label">Total</span>
                <span className="order-summary__total-value">${total.toFixed(2)}</span>
              </div>
              <div className="order-summary__actions">
                <button className="order-summary__place-btn">Realizar Pedido</button>
                <p className="order-summary__terms">
                  Al hacer clic en realizar pedido, aceptas nuestros <br />
                  <a href="#">Términos de Servicio</a> y <a href="#">Política de la Academia</a>
                </p>
              </div>
              <div className="order-summary__trust">
                <div className="trust-item">
                  <div className="trust-item__icon"><span className="material-symbols-outlined">verified_user</span></div>
                  <div>
                    <p className="trust-item__title">Pago Seguro</p>
                    <p className="trust-item__desc">Transacción encriptada SSL</p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-item__icon"><span className="material-symbols-outlined">undo</span></div>
                  <div>
                    <p className="trust-item__title">Devoluciones en 30 Días</p>
                    <p className="trust-item__desc">Excluye inscripciones de academia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

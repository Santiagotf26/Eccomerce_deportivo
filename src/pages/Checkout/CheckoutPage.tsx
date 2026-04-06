import { useState } from 'react';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('card');
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const productPrice = 189.00;
  const enrollmentFee = 450.00;
  const taxes = 28.50;
  const total = productPrice * quantity + enrollmentFee + taxes;

  return (
    <main className="checkout">
      <header className="checkout__header">
        <h1 className="checkout__title">Pago</h1>
        <p className="checkout__subtitle">Revisa tu equipo y finaliza tu impulso</p>
      </header>

      <div className="checkout__grid">
        {/* Left Column */}
        <div className="checkout__left">
          {/* Cart Items */}
          <section className="checkout__section">
            <h2 className="checkout__section-title">Tu Selección</h2>
            <div className="checkout__items">
              {/* Product Item */}
              <div className="cart-item">
                <div className="cart-item__image">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3aI6uaJG3SDckLWIjDsygObsuNQu6GwFalM09_cOBTmP-dz8_A8pTwNBPrV--2VJEMkrgKdB8rDDQburIQVdrdNOi2bc79KYylSGXdmw0-ilgEw0RX-NATwqAtfSmgNcfFYi4c-HKsBiooBC4D0ceiHViYFYd23rrDL9l6RzKpv060RbSq95DKbNFMGHKPZiMZSZi5dh7LzJmEiWEuzAY_gwkMWmePJZeUhn13CS_8HCNOKetRXIh0zkxnrKwdC-98XmWzAusATo" alt="Botas Kinetic Pro Strike" />
                </div>
                <div className="cart-item__details">
                  <div className="cart-item__top">
                    <h3 className="cart-item__name">Botas Kinetic Pro Strike</h3>
                    <span className="cart-item__price">${(productPrice * quantity).toFixed(2)}</span>
                  </div>
                  <p className="cart-item__desc">Ingeniería de precisión para delanteros de élite. Parte superior sintética aerodinámica con sistema de tracción adaptable.</p>
                  <div className="cart-item__controls">
                    <div className="quantity-control">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                        <span className="material-symbols-outlined qty-icon">remove</span>
                      </button>
                      <span className="quantity-control__value">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)}>
                        <span className="material-symbols-outlined qty-icon">add</span>
                      </button>
                    </div>
                    <button className="cart-item__remove">
                      <span className="material-symbols-outlined">delete</span> Eliminar
                    </button>
                  </div>
                </div>
              </div>

              {/* Enrollment Item */}
              <div className="cart-item">
                <div className="cart-item__image cart-item__image--enrollment">
                  <span className="cart-item__enrollment-badge">SS'24</span>
                </div>
                <div className="cart-item__details">
                  <div className="cart-item__top">
                    <div>
                      <h3 className="cart-item__name">Inscripción en la Academia</h3>
                      <span className="cart-item__tag">Intensivo de Verano</span>
                    </div>
                    <span className="cart-item__price">$450.00</span>
                  </div>
                  <p className="cart-item__desc">Jugador: Leo Martinez (U-14 Elite). Residencia táctica de 8 semanas y sesión de análisis de rendimiento.</p>
                  <div className="cart-item__controls">
                    <span className="cart-item__fixed">Suscripción Fija</span>
                    <button className="cart-item__remove cart-item__remove--cancel">
                      <span className="material-symbols-outlined">cancel</span> Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping & Billing */}
          <section className="checkout__forms">
            <div className="form-card">
              <h2 className="form-card__title">
                <span className="material-symbols-outlined form-icon">local_shipping</span>
                Dirección de Envío
              </h2>
              <div className="form-card__fields">
                <div className="form-field">
                  <label className="form-field__label">Nombre Completo</label>
                  <input type="text" className="form-field__input" defaultValue="Leo Martinez" />
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

          {/* Payment Method */}
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
                    <div className="card-form__brands">
                      <div className="card-form__brand" />
                      <div className="card-form__brand card-form__brand--alt" />
                    </div>
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

        {/* Right Column: Summary */}
        <div className="checkout__right">
          <div className="order-summary">
            <div className="order-summary__glow" />
            <div className="order-summary__content">
              <h2 className="order-summary__title">Resumen del Pedido</h2>
              <div className="order-summary__lines">
                <div className="order-summary__line">
                  <span>Productos ({quantity})</span>
                  <span className="order-summary__amount">${(productPrice * quantity).toFixed(2)}</span>
                </div>
                <div className="order-summary__line">
                  <span>Cuota de Inscripción</span>
                  <span className="order-summary__amount">$450.00</span>
                </div>
                <div className="order-summary__line">
                  <span>Envío</span>
                  <span className="order-summary__amount order-summary__amount--free">GRATIS</span>
                </div>
                <div className="order-summary__line">
                  <span>Impuestos</span>
                  <span className="order-summary__amount">$28.50</span>
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
                  <div className="trust-item__icon">
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                  <div>
                    <p className="trust-item__title">Pago Seguro</p>
                    <p className="trust-item__desc">Transacción encriptada SSL</p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-item__icon">
                    <span className="material-symbols-outlined">undo</span>
                  </div>
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


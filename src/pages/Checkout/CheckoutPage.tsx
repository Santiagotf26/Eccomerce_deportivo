import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/apiClient';
import './CheckoutPage.css';

// ==========================================
// SUB-COMPONENTES MODULARES
// ==========================================

const Stepper = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { id: 1, label: 'Equipamiento', icon: 'shopping_cart' },
    { id: 2, label: 'Envío', icon: 'local_shipping' },
    { id: 3, label: 'Pago', icon: 'payments' }
  ];

  return (
    <div className="stepper">
      {steps.map((step) => (
        <div 
          key={step.id} 
          className={`stepper__step ${currentStep === step.id ? 'stepper__step--active' : ''} ${currentStep > step.id ? 'stepper__step--complete' : ''}`}
        >
          <div className="stepper__circle">
            {currentStep > step.id ? (
              <span className="material-symbols-outlined step-icon">check</span>
            ) : (
              <span className="material-symbols-outlined step-icon">{step.icon}</span>
            )}
          </div>
          <span className="stepper__label">{step.label}</span>
        </div>
      ))}
    </div>
  );
};

// ==========================================
// PÁGINA PRINCIPAL
// ==========================================

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  
  // Estado del flujo
  const [step, setStep] = useState(1);
  const [paymentPhase, setPaymentPhase] = useState<'idle' | 'validating' | 'processing' | 'success' | 'error'>('idle');
  const [orderError, setOrderError] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Formulario y Validaciones
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zip: '',
    phone: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('card');

  // Cálculos
  const taxes = totalPrice * 0.04;
  const total = totalPrice + taxes;

  // Validación en tiempo real
  useEffect(() => {
    const newErrors: Record<string, string> = {};
    
    if (step === 2) {
      if (!customerInfo.name || customerInfo.name.length < 3) newErrors.name = 'Nombre demasiado corto';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!customerInfo.email || !emailRegex.test(customerInfo.email)) newErrors.email = 'Email inválido';
      if (!customerInfo.address) newErrors.address = 'La dirección es obligatoria';
      if (!customerInfo.city) newErrors.city = 'La ciudad es obligatoria';
      if (!customerInfo.zip || customerInfo.zip.length < 4) newErrors.zip = 'CP inválido';
    }

    setErrors(newErrors);
  }, [customerInfo, step]);

  const isStep2Valid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  if (items.length === 0 && !showSuccessAlert) {
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

  const handlePlaceOrder = async () => {
    setOrderError('');
    setPaymentPhase('validating');

    try {
      await new Promise(r => setTimeout(r, 1200));
      
      const payload = { 
        items: items.map(i => ({ 
          product_variant_id: i.variant?.id ?? i.product.id, 
          quantity: i.quantity 
        })),
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        shipping_address: {
          address: customerInfo.address,
          city: customerInfo.city,
          zip: customerInfo.zip
        }
      };

      setPaymentPhase('processing');
      const endpoint = isAuthenticated ? '/orders' : '/orders/guest';
      await api.post(endpoint, payload);

      await new Promise(r => setTimeout(r, 1500));
      
      setPaymentPhase('success');
      setShowSuccessAlert(true);
      clearCart();

      // Redirección después de mostrar el éxito
      setTimeout(() => {
        navigate('/');
      }, 6000);
      
    } catch (e: any) {
      setPaymentPhase('error');
      setOrderError(e.message || 'Error en la transacción. Revisa los datos.');
      setTimeout(() => setPaymentPhase('idle'), 3000);
    }
  };

  return (
    <main className="checkout">
      {/* Alerta de Éxito Final */}
      {showSuccessAlert && (
        <div className="success-alert">
          <div className="success-alert__icon">
            <span className="material-symbols-outlined">verified</span>
          </div>
          <div>
            <h3 className="success-alert__title">¡Compra Recibida!</h3>
            <p className="success-alert__desc">Tu pedido está en proceso. Recibirás una confirmación detallada en tu correo electrónico en breve.</p>
          </div>
        </div>
      )}

      <header className="checkout__header">
        <h1 className="checkout__title">KINETIC <span className="catalog__title--accent">Checkout</span></h1>
        <Stepper currentStep={step} />
      </header>

      <div className="checkout__container">
        <div className="checkout__main">
          
          {/* PASO 1: REVISIÓN DE EQUIPO */}
          {step === 1 && (
            <div className="checkout-card fade-in">
              <h2 className="checkout__section-title">Revisión de Equipo ({items.length})</h2>
              <div className="checkout__items">
                {items.map(item => (
                  <div className="cart-item" key={item.product.id}>
                    <div className="cart-item__image">
                      <img src={item.product.image} alt={item.product.name} />
                    </div>
                    <div className="cart-item__details">
                      <div className="cart-item__head">
                        <h3 className="cart-item__name">{item.product.name}</h3>
                        <span className="cart-item__price">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                      {item.variant && <p className="cart-item__tag">Talla {item.variant.size} · {item.variant.color}</p>}
                      <div className="cart-item__controls">
                        <div className="quantity-control">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}><span className="material-symbols-outlined qty-icon">remove</span></button>
                          <span className="quantity-control__value">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}><span className="material-symbols-outlined qty-icon">add</span></button>
                        </div>
                        <button className="cart-item__remove" onClick={() => removeFromCart(item.product.id)}>
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn--primary btn--lg" onClick={() => setStep(2)}>
                  Continuar al Envío <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* PASO 2: LOGÍSTICA DE DESPLIEGUE */}
          {step === 2 && (
            <div className="checkout-card fade-in">
              <h2 className="checkout__section-title">Datos de Despliegue</h2>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-field__label">Nombre Completo</label>
                  <input 
                    type="text" 
                    className={`checkout-input ${errors.name ? 'checkout-input--error' : ''}`}
                    placeholder="Tu nombre de atleta"
                    value={customerInfo.name}
                    onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                  />
                  {errors.name && <span className="error-message"><span className="material-symbols-outlined">error</span> {errors.name}</span>}
                </div>
                <div className="form-field">
                  <label className="form-field__label">Correo Electrónico</label>
                  <input 
                    type="email" 
                    className={`checkout-input ${errors.email ? 'checkout-input--error' : ''}`}
                    placeholder="atleta@kinetic.com"
                    value={customerInfo.email}
                    onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})}
                  />
                  {errors.email && <span className="error-message"><span className="material-symbols-outlined">error</span> {errors.email}</span>}
                </div>
                <div className="form-field" style={{ gridColumn: 'span 2' }}>
                  <label className="form-field__label">Dirección de Envío</label>
                  <input 
                    type="text" 
                    className={`checkout-input ${errors.address ? 'checkout-input--error' : ''}`}
                    placeholder="Calle, número, departamento"
                    value={customerInfo.address}
                    onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                  />
                </div>
                <div className="form-field">
                  <label className="form-field__label">Ciudad</label>
                  <input 
                    type="text" 
                    className={`checkout-input ${errors.city ? 'checkout-input--error' : ''}`}
                    value={customerInfo.city}
                    onChange={e => setCustomerInfo({...customerInfo, city: e.target.value})}
                  />
                </div>
                <div className="form-field">
                  <label className="form-field__label">Código Postal</label>
                  <input 
                    type="text" 
                    className={`checkout-input ${errors.zip ? 'checkout-input--error' : ''}`}
                    value={customerInfo.zip}
                    onChange={e => setCustomerInfo({...customerInfo, zip: e.target.value})}
                  />
                </div>
              </div>
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn btn--ghost" onClick={() => setStep(1)}>Regresar</button>
                <button 
                  className="btn btn--primary btn--lg" 
                  disabled={!isStep2Valid} 
                  onClick={() => setStep(3)}
                >
                  Confirmar Envío <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* PASO 3: IMPULSO FINAL (PAGO) */}
          {step === 3 && (
            <div className="checkout-card fade-in">
              <h2 className="checkout__section-title">Método de Impulso</h2>
              <div className="payment-methods">
                <div className={`payment-method ${paymentMethod === 'card' ? 'payment-method--active' : ''}`} onClick={() => setPaymentMethod('card')}>
                  <span className="material-symbols-outlined payment-method__icon">credit_card</span>
                  <span className="payment-method__label">Tarjeta</span>
                </div>
                <div className={`payment-method ${paymentMethod === 'paypal' ? 'payment-method--active' : ''}`} onClick={() => setPaymentMethod('paypal')}>
                  <span className="material-symbols-outlined payment-method__icon">account_balance_wallet</span>
                  <span className="payment-method__label">PayPal</span>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="card-form fade-in" style={{ marginTop: '2rem' }}>
                  <div className="form-field">
                    <label className="form-field__label">Número de Tarjeta</label>
                    <input type="text" className="checkout-input" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="form-grid" style={{ marginTop: '1rem' }}>
                    <div className="form-field">
                      <label className="form-field__label">Expiración</label>
                      <input type="text" className="checkout-input" placeholder="MM/AA" />
                    </div>
                    <div className="form-field">
                      <label className="form-field__label">CVV</label>
                      <input type="text" className="checkout-input" placeholder="***" />
                    </div>
                  </div>
                </div>
              )}

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn btn--ghost" onClick={() => setStep(2)}>Regresar</button>
                <button className="btn btn--primary btn--lg" onClick={handlePlaceOrder}>
                  Realizar Pago <span className="material-symbols-outlined">bolt</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RESUMEN LATERAL (Sticky) */}
        <aside className="checkout__sidebar">
          <div className="order-summary checkout-card--glass">
            <div className="order-summary__content">
              <h2 className="order-summary__title">Resumen del Impulso</h2>
              <div className="order-summary__lines">
                <div className="order-summary__line">
                  <span>Subtotal</span>
                  <span className="order-summary__amount">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="order-summary__line">
                  <span>Envío</span>
                  <span className="order-summary__amount" style={{color: 'var(--tertiary)'}}>GRATIS</span>
                </div>
                <div className="order-summary__line">
                  <span>Impuestos (4%)</span>
                  <span className="order-summary__amount">${taxes.toFixed(2)}</span>
                </div>
              </div>
              <div className="order-summary__total">
                <span className="order-summary__total-label">TOTAL</span>
                <span className="order-summary__total-value">${total.toFixed(2)}</span>
              </div>
              <p className="order-summary__terms" style={{ color: 'var(--outline)' }}>
                Transacción protegida por protocolo KINETIC SSL.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* OVERLAY DE PROCESAMIENTO */}
      {paymentPhase !== 'idle' && (
        <div className={`payment-overlay payment-overlay--${paymentPhase}`}>
          <div className="payment-overlay__content">
            {paymentPhase === 'validating' && (
              <>
                <div className="payment-overlay__loader payment-overlay__loader--scanner" />
                <h2 className="payment-overlay__title">Validando Inventario</h2>
                <p className="payment-overlay__text">Verificando disponibilidad de tu equipo...</p>
              </>
            )}
            {paymentPhase === 'processing' && (
              <>
                <div className="payment-overlay__loader payment-overlay__loader--pulse" />
                <h2 className="payment-overlay__title">Procesando Pago</h2>
                <p className="payment-overlay__text">Conectando con la red bancaria segura.</p>
              </>
            )}
            {paymentPhase === 'success' && (
              <>
                <div className="payment-overlay__success-icon">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <h2 className="payment-overlay__title">¡Éxito Total!</h2>
                <p className="payment-overlay__text">Tu pedido ha sido procesado. Redirigiendo al inicio...</p>
              </>
            )}
            {paymentPhase === 'error' && (
              <>
                <div className="payment-overlay__error-icon">
                  <span className="material-symbols-outlined">error</span>
                </div>
                <h2 className="payment-overlay__title">Fallo en el Salto</h2>
                <p className="payment-overlay__text">{orderError}</p>
                <button className="btn btn--outline" onClick={() => setPaymentPhase('idle')}>Corregir Datos</button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

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
        <h1 className="checkout__title">Checkout</h1>
        <p className="checkout__subtitle">Review your gear and finalize your momentum</p>
      </header>

      <div className="checkout__grid">
        {/* Left Column */}
        <div className="checkout__left">
          {/* Cart Items */}
          <section className="checkout__section">
            <h2 className="checkout__section-title">Your Selection</h2>
            <div className="checkout__items">
              {/* Product Item */}
              <div className="cart-item">
                <div className="cart-item__image">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3aI6uaJG3SDckLWIjDsygObsuNQu6GwFalM09_cOBTmP-dz8_A8pTwNBPrV--2VJEMkrgKdB8rDDQburIQVdrdNOi2bc79KYylSGXdmw0-ilgEw0RX-NATwqAtfSmgNcfFYi4c-HKsBiooBC4D0ceiHViYFYd23rrDL9l6RzKpv060RbSq95DKbNFMGHKPZiMZSZi5dh7LzJmEiWEuzAY_gwkMWmePJZeUhn13CS_8HCNOKetRXIh0zkxnrKwdC-98XmWzAusATo" alt="Kinetic Pro Strike Boots" />
                </div>
                <div className="cart-item__details">
                  <div className="cart-item__top">
                    <h3 className="cart-item__name">Kinetic Pro Strike Boots</h3>
                    <span className="cart-item__price">${(productPrice * quantity).toFixed(2)}</span>
                  </div>
                  <p className="cart-item__desc">Precision engineered for elite strikers. Aerodynamic synthetic upper with adaptive traction system.</p>
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
                      <span className="material-symbols-outlined">delete</span> Remove
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
                      <h3 className="cart-item__name">Academy Enrollment</h3>
                      <span className="cart-item__tag">Summer Intensive</span>
                    </div>
                    <span className="cart-item__price">$450.00</span>
                  </div>
                  <p className="cart-item__desc">Player: Leo Martinez (U-14 Elite). 8-week tactical residency and performance analysis session.</p>
                  <div className="cart-item__controls">
                    <span className="cart-item__fixed">Subscription Fixed</span>
                    <button className="cart-item__remove cart-item__remove--cancel">
                      <span className="material-symbols-outlined">cancel</span> Cancel
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
                Shipping Address
              </h2>
              <div className="form-card__fields">
                <div className="form-field">
                  <label className="form-field__label">Full Name</label>
                  <input type="text" className="form-field__input" defaultValue="Leo Martinez" />
                </div>
                <div className="form-field">
                  <label className="form-field__label">Street Address</label>
                  <input type="text" className="form-field__input" placeholder="123 Pitch Ave" />
                </div>
                <div className="form-field__row">
                  <div className="form-field">
                    <label className="form-field__label">City</label>
                    <input type="text" className="form-field__input" placeholder="London" />
                  </div>
                  <div className="form-field">
                    <label className="form-field__label">Postcode</label>
                    <input type="text" className="form-field__input" placeholder="SW1 1AA" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-card">
              <div className="form-card__header">
                <h2 className="form-card__title">
                  <span className="material-symbols-outlined form-icon">payments</span>
                  Billing Info
                </h2>
                <label className="form-card__toggle">
                  <input type="checkbox" checked={sameAsShipping} onChange={() => setSameAsShipping(!sameAsShipping)} />
                  <span className="form-card__toggle-text">Same as shipping</span>
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
            <h2 className="checkout__section-title">Payment Method</h2>
            <div className="payment-methods">
              <div className={`payment-method ${paymentMethod === 'card' ? 'payment-method--active' : ''}`} onClick={() => setPaymentMethod('card')}>
                <span className="material-symbols-outlined payment-method__icon">credit_card</span>
                <span className="payment-method__label">Credit Card</span>
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
                  <label className="form-field__label">Card Number</label>
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
                    <label className="form-field__label">Expiry Date</label>
                    <input type="text" className="form-field__input" placeholder="MM / YY" />
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
              <h2 className="order-summary__title">Order Summary</h2>
              <div className="order-summary__lines">
                <div className="order-summary__line">
                  <span>Products ({quantity})</span>
                  <span className="order-summary__amount">${(productPrice * quantity).toFixed(2)}</span>
                </div>
                <div className="order-summary__line">
                  <span>Enrollment Fee</span>
                  <span className="order-summary__amount">$450.00</span>
                </div>
                <div className="order-summary__line">
                  <span>Shipping</span>
                  <span className="order-summary__amount order-summary__amount--free">FREE</span>
                </div>
                <div className="order-summary__line">
                  <span>Taxes</span>
                  <span className="order-summary__amount">$28.50</span>
                </div>
              </div>

              <div className="order-summary__total">
                <span className="order-summary__total-label">Total</span>
                <span className="order-summary__total-value">${total.toFixed(2)}</span>
              </div>

              <div className="order-summary__actions">
                <button className="order-summary__place-btn">Place Order</button>
                <p className="order-summary__terms">
                  By clicking place order you agree to our <br />
                  <a href="#">Terms of Service</a> & <a href="#">Academy Policy</a>
                </p>
              </div>

              <div className="order-summary__trust">
                <div className="trust-item">
                  <div className="trust-item__icon">
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                  <div>
                    <p className="trust-item__title">Secure Checkout</p>
                    <p className="trust-item__desc">SSL encrypted transaction</p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-item__icon">
                    <span className="material-symbols-outlined">undo</span>
                  </div>
                  <div>
                    <p className="trust-item__title">30-Day Returns</p>
                    <p className="trust-item__desc">Excludes academy enrollments</p>
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

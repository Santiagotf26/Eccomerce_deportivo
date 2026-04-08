import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface StripePaymentFormProps {
  onSuccess: () => void;
  onError: (message: string) => void;
}

export default function StripePaymentForm({ onSuccess, onError }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      onError(error.message ?? 'Ocurrió un error inesperado');
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess();
    } else {
      onError('El pago no se pudo completar.');
      setIsProcessing(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="fade-in">
      <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
      
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          disabled={isProcessing || !stripe || !elements} 
          id="submit"
          className="btn btn--primary btn--lg"
          style={{ width: '100%' }}
        >
          <span id="button-text">
            {isProcessing ? (
              <div className="spinner" id="spinner"> Procesando...</div>
            ) : (
              <>
                CONFIRMAR PAGO <span className="material-symbols-outlined">bolt</span>
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  );
}

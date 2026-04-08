import { useState, useEffect } from 'react';
import { api } from '../lib/apiClient';

export interface OrderDetail {
  id: string;
  order_number: string;
  order_status: string;
  total_amount: number;
  created_at: string;
  user?: {
    first_name: string;
    last_name: string;
    email: string;
  } | null;
  customer_name?: string | null;
  customer_email?: string | null;
  customer_phone?: string | null;
  shipping_address?: {
    address: string;
    city: string;
    zip: string;
  } | null;
  orderItems: {
    quantity: number;
    unit_price: number;
    productVariant: {
      size: string;
      color: string;
      product: {
        name: string;
        image_url: string;
      };
    };
  }[];
}

export function useOrders() {
  const [orders, setOrders] = useState<OrderDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get<OrderDetail[]>('/orders/admin/all');
      setOrders(response || []);
    } catch (e: any) {
      setError(e.message || 'Error al cargar pedidos');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, status: string) => {
    try {
      await api.post(`/orders/admin/${orderId}/status`, { status });
      await fetchOrders(); // Recargar
      return true;
    } catch (e: any) {
      console.error(e);
      return false;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, loading, error, refreshOrders: fetchOrders, updateStatus };
}

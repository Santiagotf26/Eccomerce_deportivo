/**
 * Servicio de Autenticación — Simula backend auth
 * Credenciales: admin@kinetic.com / admin123
 */
import type { User } from '../types';

const TOKEN_KEY = 'kinetic_token';
const USER_KEY = 'kinetic_user';
const DELAY = 500;

// Usuarios registrados (simula base de datos)
const USERS_DB: Array<{ email: string; password: string; user: User }> = [
  {
    email: 'admin@kinetic.com',
    password: 'admin123',
    user: {
      id: 'usr-001',
      email: 'admin@kinetic.com',
      name: 'Santiago Admin',
      role: 'admin',
      avatar: '',
    },
  },
];

function delay<T>(data: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), DELAY));
}

function generateToken(): string {
  return `kt_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

export const authService = {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const record = USERS_DB.find(u => u.email === email && u.password === password);
    if (!record) {
      return delay(Promise.reject(new Error('Credenciales inválidas. Verifica tu correo y contraseña.')));
    }
    const token = generateToken();
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(record.user));
    return delay({ user: record.user, token });
  },

  async logout(): Promise<void> {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return delay(undefined);
  },

  getStoredAuth(): { user: User; token: string } | null {
    const token = localStorage.getItem(TOKEN_KEY);
    const userStr = localStorage.getItem(USER_KEY);
    if (token && userStr) {
      return { user: JSON.parse(userStr), token };
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};

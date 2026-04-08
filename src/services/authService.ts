/**
 * authService.ts — Conectado al backend NestJS real.
 * Endpoints: POST /auth/login | POST /auth/register
 */
import type { User } from '../types';
import { api } from '../lib/apiClient';

const TOKEN_KEY = 'kinetic_token';
const USER_KEY = 'kinetic_user';

interface LoginResponse { access_token: string; }
interface RegisterResponse { access_token: string; message: string; }

// Decodifica el payload de un JWT sin librerías externas
function decodeJwtPayload(token: string): any {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

function payloadToUser(payload: any): User {
  return {
    id: payload.sub,
    email: payload.email,
    name: payload.email.split('@')[0],
    role: payload.role,
  };
}

export const authService = {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const { access_token } = await api.post<LoginResponse>('/auth/login', { email, password });

    const payload = decodeJwtPayload(access_token);
    const user = payloadToUser(payload);

    localStorage.setItem(TOKEN_KEY, access_token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return { user, token: access_token };
  },

  async register(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    const { access_token } = await api.post<RegisterResponse>('/auth/register', {
      first_name,
      last_name,
      email,
      password,
    });

    const payload = decodeJwtPayload(access_token);
    const user = payloadToUser(payload);

    localStorage.setItem(TOKEN_KEY, access_token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return { user, token: access_token };
  },

  async logout(): Promise<void> {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getStoredAuth(): { user: User; token: string } | null {
    const token = localStorage.getItem(TOKEN_KEY);
    const userStr = localStorage.getItem(USER_KEY);
    if (!token || !userStr) return null;

    // Verificar que el token no ha expirado
    const payload = decodeJwtPayload(token);
    if (payload?.exp && Date.now() / 1000 > payload.exp) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      return null;
    }

    return { user: JSON.parse(userStr), token };
  },

  isAuthenticated(): boolean {
    const auth = this.getStoredAuth();
    return auth !== null;
  },
};

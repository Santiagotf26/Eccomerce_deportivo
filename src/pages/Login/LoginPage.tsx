import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!email.trim() || !password.trim()) {
      setLocalError('Por favor, completa todos los campos.');
      return;
    }

    try {
      await login(email, password);
      navigate('/admin');
    } catch {
      // error ya está en el AuthContext
    }
  };

  return (
    <main className="login-page">
      <div className="login-page__bg">
        <div className="login-page__orb login-page__orb--1" />
        <div className="login-page__orb login-page__orb--2" />
      </div>

      <div className="login-card">
        <div className="login-card__header">
          <span className="login-card__logo" onClick={() => navigate('/')}>KINETIC</span>
          <h1 className="login-card__title">Panel de Administración</h1>
          <p className="login-card__subtitle">Inicia sesión para gestionar tu tienda</p>
        </div>

        {(error || localError) && (
          <div className="login-card__error">
            <span className="material-symbols-outlined">error</span>
            <span>{localError || error}</span>
          </div>
        )}

        <form className="login-card__form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-field__label">Correo electrónico</label>
            <div className="login-field__input-wrap">
              <span className="material-symbols-outlined login-field__icon">mail</span>
              <input
                type="email"
                className="login-field__input"
                placeholder="admin@kinetic.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="login-field">
            <label className="login-field__label">Contraseña</label>
            <div className="login-field__input-wrap">
              <span className="material-symbols-outlined login-field__icon">lock</span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="login-field__input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="login-field__toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Mostrar contraseña"
              >
                <span className="material-symbols-outlined">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <button type="submit" className="login-card__submit" disabled={isLoading}>
            {isLoading ? (
              <span className="login-card__spinner" />
            ) : (
              <>
                Iniciar Sesión
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        <div className="login-card__footer">
          <p className="login-card__hint">
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>info</span>
            Demo: <strong>admin@kinetic.com</strong> / <strong>admin123</strong>
          </p>
        </div>
      </div>
    </main>
  );
}

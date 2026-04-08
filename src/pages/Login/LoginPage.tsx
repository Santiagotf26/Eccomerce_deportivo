import { useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

type Mode = 'login' | 'register';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register, isLoading, error } = useAuth();
  const [searchParams] = useSearchParams();
  const redirectParams = searchParams.get('redirect') || '/admin';

  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState('');

  const resetForm = () => {
    setEmail(''); setPassword(''); setFirstName(''); setLastName('');
    setLocalError(''); setSuccess('');
  };

  const switchMode = (m: Mode) => { setMode(m); resetForm(); };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError('');
    setSuccess('');

    if (mode === 'login') {
      if (!email.trim() || !password.trim()) {
        setLocalError('Completa todos los campos.');
        return;
      }
      try {
        await login(email, password);
        // Si hay redirect a checkout, enviamos a checkout, de lo contrario admin
        const destination = redirectParams;
        navigate(destination);
      } catch {
        // error en AuthContext
      }
    } else {
      if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
        setLocalError('Completa todos los campos.');
        return;
      }
      if (password.length < 8) {
        setLocalError('La contraseña debe tener mínimo 8 caracteres.');
        return;
      }
      try {
        await register(firstName, lastName, email, password);
        setSuccess('¡Cuenta creada con éxito! Redirigiendo...');
        // Si hay redirect a checkout, enviamos a checkout, de lo contrario home
        const destination = searchParams.get('redirect') || '/';
        setTimeout(() => navigate(destination), 1500);
      } catch {
        // error en AuthContext
      }
    }
  };

  const displayError = localError || error;

  return (
    <main className="login-page">
      <div className="login-page__bg">
        <div className="login-page__orb login-page__orb--1" />
        <div className="login-page__orb login-page__orb--2" />
      </div>

      <div className="login-card">
        <div className="login-card__header">
          <span className="login-card__logo" onClick={() => navigate('/')}>KINETIC</span>
          <h1 className="login-card__title">
            {mode === 'login' ? 'Panel de Administración' : 'Crear Cuenta'}
          </h1>
          <p className="login-card__subtitle">
            {mode === 'login' ? 'Inicia sesión para gestionar tu tienda' : 'Únete a la comunidad Kinetic'}
          </p>
        </div>

        {/* Tabs Login / Registro */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--outline-variant)', marginBottom: '1.5rem' }}>
          {(['login', 'register'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              style={{
                flex: 1, padding: '0.75rem', background: 'none', border: 'none', cursor: 'pointer',
                color: mode === m ? 'var(--primary)' : 'var(--on-surface-variant)',
                borderBottom: mode === m ? '2px solid var(--primary)' : '2px solid transparent',
                fontWeight: mode === m ? 700 : 400, fontSize: '0.9rem', transition: 'all 0.2s',
              }}
            >
              {m === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          ))}
        </div>

        {/* Error */}
        {displayError && (
          <div className="login-card__error">
            <span className="material-symbols-outlined">error</span>
            <span>{displayError}</span>
          </div>
        )}

        {/* Éxito */}
        {success && (
          <div className="login-card__error" style={{ background: 'rgba(0,200,100,0.12)', borderColor: 'rgba(0,200,100,0.3)', color: '#00c864' }}>
            <span className="material-symbols-outlined">check_circle</span>
            <span>{success}</span>
          </div>
        )}

        <form className="login-card__form" onSubmit={handleSubmit}>

          {/* Campos solo de Registro */}
          {mode === 'register' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="login-field">
                <label className="login-field__label">Nombre</label>
                <div className="login-field__input-wrap">
                  <span className="material-symbols-outlined login-field__icon">person</span>
                  <input
                    type="text" className="login-field__input" placeholder="Juan"
                    value={firstName} onChange={e => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className="login-field">
                <label className="login-field__label">Apellido</label>
                <div className="login-field__input-wrap">
                  <span className="material-symbols-outlined login-field__icon">badge</span>
                  <input
                    type="text" className="login-field__input" placeholder="Pérez"
                    value={lastName} onChange={e => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="login-field">
            <label className="login-field__label">Correo electrónico</label>
            <div className="login-field__input-wrap">
              <span className="material-symbols-outlined login-field__icon">mail</span>
              <input
                type="email" className="login-field__input"
                placeholder={mode === 'login' ? 'admin@kinetic.com' : 'tu@correo.com'}
                value={email} onChange={e => setEmail(e.target.value)} autoComplete="email"
              />
            </div>
          </div>

          <div className="login-field">
            <label className="login-field__label">Contraseña {mode === 'register' && <span style={{ color: 'var(--on-surface-variant)', fontWeight: 400 }}>(mín. 8 caracteres)</span>}</label>
            <div className="login-field__input-wrap">
              <span className="material-symbols-outlined login-field__icon">lock</span>
              <input
                type={showPassword ? 'text' : 'password'} className="login-field__input"
                placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
              <button type="button" className="login-field__toggle" onClick={() => setShowPassword(!showPassword)}>
                <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          <button type="submit" className="login-card__submit" disabled={isLoading}>
            {isLoading ? (
              <span className="login-card__spinner" />
            ) : (
              <>
                {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        <div className="login-card__footer">
          {mode === 'login' ? (
            <p className="login-card__hint">
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>info</span>
              Demo: <strong>admin@kinetic.com</strong> / <strong>admin123</strong>
            </p>
          ) : (
            <p className="login-card__hint" style={{ textAlign: 'center' }}>
              No necesitas cuenta para comprar.{' '}
              <span
                style={{ color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => navigate('/catalog')}
              >
                Ir al catálogo
              </span>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

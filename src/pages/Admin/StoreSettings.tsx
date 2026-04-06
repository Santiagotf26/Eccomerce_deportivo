import { useState, useEffect, type FormEvent } from 'react';
import type { StoreInfo } from '../../types';
import './StoreSettings.css';

const STORAGE_KEY = 'kinetic_store_info';

const DEFAULT_INFO: StoreInfo = {
  name: 'KINETIC',
  description: 'Plataforma de e-commerce deportivo y escuela de fútbol de élite.',
  logoUrl: '',
  email: 'contacto@kinetic.com',
  phone: '+57 300 123 4567',
  address: 'Bogotá, Colombia',
};

export default function StoreSettings() {
  const [form, setForm] = useState<StoreInfo>(DEFAULT_INFO);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setForm(JSON.parse(stored));
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = (field: keyof StoreInfo, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  return (
    <div className="store-settings">
      <div className="store-settings__header">
        <h1 className="store-settings__title">Configuración</h1>
        <p className="store-settings__subtitle">Actualiza la información de tu tienda</p>
      </div>

      <form className="store-settings__form" onSubmit={handleSubmit}>
        <div className="store-settings__card">
          <h3 className="store-settings__section-title">
            <span className="material-symbols-outlined">storefront</span>
            Información General
          </h3>
          <div className="ss-field">
            <label>Nombre de la Tienda</label>
            <input type="text" value={form.name} onChange={e => update('name', e.target.value)} />
          </div>
          <div className="ss-field">
            <label>Descripción</label>
            <textarea value={form.description} onChange={e => update('description', e.target.value)} rows={3} />
          </div>
          <div className="ss-field">
            <label>URL del Logo</label>
            <input type="url" value={form.logoUrl} onChange={e => update('logoUrl', e.target.value)} placeholder="https://..." />
          </div>
        </div>

        <div className="store-settings__card">
          <h3 className="store-settings__section-title">
            <span className="material-symbols-outlined">contact_mail</span>
            Contacto
          </h3>
          <div className="ss-field__row">
            <div className="ss-field">
              <label>Correo Electrónico</label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} />
            </div>
            <div className="ss-field">
              <label>Teléfono</label>
              <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} />
            </div>
          </div>
          <div className="ss-field">
            <label>Dirección</label>
            <input type="text" value={form.address} onChange={e => update('address', e.target.value)} />
          </div>
        </div>

        <div className="store-settings__actions">
          {saved && (
            <span className="store-settings__saved">
              <span className="material-symbols-outlined">check_circle</span>
              Guardado exitosamente
            </span>
          )}
          <button type="submit" className="store-settings__save-btn">
            <span className="material-symbols-outlined">save</span>
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}

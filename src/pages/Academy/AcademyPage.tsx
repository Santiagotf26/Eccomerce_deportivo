import { useState, type FormEvent } from 'react';
import { api } from '../../lib/apiClient';
import './AcademyPage.css';

export default function AcademyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [formData, setFormData] = useState({ name: '', dob: '', email: '', level: 'Descubrimiento (6-9)', notes: '' });
  const [enrolling, setEnrolling] = useState(false);
  const [enrollDone, setEnrollDone] = useState(false);
  const [enrollError, setEnrollError] = useState('');

  const handleEnroll = async (e: FormEvent) => {
    e.preventDefault();
    setEnrollError('');
    if (!formData.name || !formData.dob || !formData.email) {
      setEnrollError('Por favor completa los campos obligatorios.');
      return;
    }
    setEnrolling(true);
    try {
      await api.post('/academy/enroll', {
        prospect_name: formData.name,
        birth_date: new Date(formData.dob).toISOString(),
        parent_email: formData.email,
        level: formData.level,
        notes: formData.notes
      });
      setEnrollDone(true);
      setFormData({ name: '', dob: '', email: '', level: 'Descubrimiento (6-9)', notes: '' });
      setTimeout(() => setEnrollDone(false), 5000);
    } catch (err: any) {
      setEnrollError(err.message || 'Error al enviar inscripción.');
    } finally {
      setEnrolling(false);
    }
  };

  const faqs = [
    { q: '¿Qué equipamiento debo traer?', a: 'Los jugadores deben traer botas, espinilleras, una botella de agua marcada y una actitud positiva. Las equipaciones de entrenamiento se proporcionan tras la inscripción exitosa en el trimestre completo.' },
    { q: '¿Hay oportunidades de becas?', a: 'Sí, ofrecemos becas basadas en el talento y la necesidad económica. Por favor, contáctanos para más detalles.' },
    { q: '¿Pueden los padres ver las sesiones de entrenamiento?', a: 'Sí, tenemos áreas designadas para que los padres observen el progreso de sus hijos.' },
    { q: '¿Qué sucede en caso de mal tiempo?', a: 'En caso de condiciones climáticas extremas, las sesiones se pueden reprogramar o trasladar a nuestras instalaciones cubiertas partner.' },
  ];

  const sessions = [
    { day: 'Lun', date: 16, title: 'Fundamentos Técnicos', time: '16:30 - 18:00 • Campo A', spots: '4 Plazas Libres', available: true, accent: 'primary' },
    { day: 'Mar', date: 17, title: 'Especialización Delanteros y Porteros', time: '17:00 - 18:30 • Campo B', spots: 'Lleno', available: false, accent: 'secondary' },
    { day: 'Mié', date: 18, title: 'Inteligencia de Juego y Táctica', time: '18:00 - 19:30 • Estadio Principal', spots: '12 Plazas Libres', available: true, accent: 'tertiary' },
  ];

  return (
    <main className="academy">
      {/* Hero */}
      <section className="academy-hero">
        <div className="academy-hero__grid">
          <div className="academy-hero__text">
            <span className="academy-hero__eyebrow">Impulsa tu Potencial</span>
            <h1 className="academy-hero__title">
              ACADEMIA <br /><span className="academy-hero__title--accent">MOMENTUM</span> <br />DE ÉLITE
            </h1>
            <p className="academy-hero__desc">Entrenamiento de grado profesional para la próxima generación de estrellas del fútbol. Desarrolla velocidad, precisión e inteligencia táctica.</p>
            <div className="academy-hero__actions">
              <button className="btn btn--primary btn--lg academy-hero__enroll-btn">Inscribirse Ahora</button>
              <button className="btn btn--ghost btn--lg">Ver Niveles</button>
            </div>
          </div>
          <div className="academy-hero__image-wrap">
            <div className="academy-hero__bg-shape" />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWSVvAoA4-4qEkirTehXUNfkOfVuNK7FGtaRkdcOjO-FyDY4YimAjd8liKKkgNWdvQmmeV6r4ujv37eSWw54Z3e2JZo4TRQJG2XoU7usAPv3aUJK81EPX4HxPm_Cje2wztW6QrpLxSJsz8sh2T15BUJ--wKDSh4NPxz8ezD-NGcNmNraB746V-5WJERChTlUx_2MCch7b7HoZLcW6kJWFlQwfDEBxNHEMujLVjnZJSZtFeLM2D-Zys6l1OM2NBWFsNRuBPx9gnMek"
              alt="Joven jugador de fútbol en movimiento"
              className="academy-hero__img"
            />
          </div>
        </div>
      </section>

      {/* Training Pathways */}
      <section className="pathways">
        <div className="pathways__inner">
          <div className="pathways__header">
            <h2 className="pathways__title">RUTAS DE ENTRENAMIENTO</h2>
            <div className="pathways__bar" />
          </div>
          <div className="pathways__grid">
            {/* Discovery */}
            <div className="pathway pathway--discovery">
              <div>
                <span className="pathway__badge pathway__badge--tertiary">Edades 6 - 9</span>
                <h3 className="pathway__name">Fase de Descubrimiento</h3>
                <p className="pathway__desc">Enfocada en habilidades motoras fundamentales, dominio del balón y el placer del juego.</p>
                <ul className="pathway__list">
                  <li><span className="material-symbols-outlined pathway__check">check_circle</span> Dominio del balón 1v1</li>
                  <li><span className="material-symbols-outlined pathway__check">check_circle</span> Ejercicios de coordinación</li>
                  <li><span className="material-symbols-outlined pathway__check">check_circle</span> Juegos divertidos en espacios reducidos</li>
                </ul>
              </div>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuACQ6s9nGUtEsVI-eTVRlrT8tFAX28yNokSUX-h4zeOZ8hsty7xYjmu6e_XjSStzEeXTysOjtO9_2GrkJ9vLKLqa642RYW_zjCZLja6mBnVcGQoaRmdv4huB2YOvc-srIJgQdVWLR7fC-UWBMtb7MQI9aKRbF4zUaV1UAgThnZzL6ku7qGGygpR-uocFiYu_JOWEHFCa3tqlUozWPh33wrVjMGz3CwKUrUQvtWqpf4oQHUhbZPSmjGfZB3UsPV4sAvcjVcznolrLeY" alt="Niños pequeños jugando" className="pathway__img" />
            </div>

            {/* Development */}
            <div className="pathway pathway--development">
              <div className="pathway__row">
                <div className="pathway__row-text">
                  <span className="pathway__badge pathway__badge--primary">Edades 10 - 13</span>
                  <h3 className="pathway__name">Núcleo de Desarrollo</h3>
                  <p className="pathway__desc">Transición hacia la conciencia táctica y el juego posicional.</p>
                  <button className="pathway__link">
                    Saber Más <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjNGxv2K-4dCi3tsow_VsozhzPAwwko7YwoImXjXZGEHeaOfdSbLah3Bh-p_0G9-ZgPJvWud0WXAmHJ0F6whrd5Fp_QWQJlLkaUbl1DP8mWODWLMw5QjiW1rNgrBJtxkebBQ5Y7aPxWmUbXZPlNGDzE-KCRd5yRcTTbI7xipHpS3RzwzDNxLCwCDiLytFjsJ1e7YBMKreCKZv9x4sbCAm83YWQnvkbsgAYEb0JJn8N2XIfQHe9DyRgNfN25bFXSnQoH7HmGDK8blY" alt="Reunión del equipo juvenil" className="pathway__row-img" />
              </div>
            </div>

            {/* Performance */}
            <div className="pathway pathway--performance">
              <div className="pathway__row">
                <div className="pathway__row-text">
                  <span className="pathway__badge pathway__badge--white">Edades 14 - 18</span>
                  <h3 className="pathway__name">Élite de Rendimiento</h3>
                  <p className="pathway__desc">Configuraciones tácticas avanzadas, acondicionamiento físico y preparación universitaria.</p>
                </div>
                <div className="pathway__stats">
                  <div className="pathway__stat">
                    <div className="pathway__stat-value">100%</div>
                    <div className="pathway__stat-label">Enfoque Táctico</div>
                  </div>
                  <div className="pathway__stat">
                    <div className="pathway__stat-value">PRO</div>
                    <div className="pathway__stat-label">Red de Scouting</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="schedule">
        <div className="schedule__inner">
          <div className="schedule__header">
            <div>
              <h2 className="schedule__title">HORARIO DE ENTRENAMIENTO</h2>
              <p className="schedule__subtitle">Encuentra la sesión perfecta para tu ritmo.</p>
            </div>
            <div className="schedule__nav">
              <button className="schedule__nav-btn"><span className="material-symbols-outlined">chevron_left</span></button>
              <button className="schedule__nav-btn"><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
          </div>
          <div className="schedule__list">
            {sessions.map((s, i) => (
              <div className={`session ${s.accent === 'primary' ? 'session--primary' : s.accent === 'tertiary' ? 'session--tertiary' : ''}`} key={i}>
                <div className="session__left">
                  <div className="session__date">
                    <div className={`session__day session__day--${s.accent}`}>{s.day}</div>
                    <div className="session__num">{s.date}</div>
                  </div>
                  <div>
                    <h4 className="session__title">{s.title}</h4>
                    <p className="session__time">
                      <span className="material-symbols-outlined session__clock">schedule</span>
                      {s.time}
                    </p>
                  </div>
                </div>
                <div className="session__right">
                  <div className="session__availability">
                    <div className="session__avail-label">Disponibilidad</div>
                    <div className="session__avail-value">{s.spots}</div>
                  </div>
                  {s.available ? (
                    <button className="session__book-btn">Reservar Sesión</button>
                  ) : (
                    <button className="session__waitlist-btn" disabled>Lista de Espera</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaches */}
      <section className="coaches">
        <div className="coaches__inner">
          <div className="coaches__text">
            <h2 className="coaches__title">LAS MENTES <br />DETRÁS DEL <br />IMPULSO</h2>
            <p className="coaches__desc">Aprende de exfutbolistas profesionales y entrenadores con licencia UEFA dedicados a tu crecimiento.</p>
            <button className="coaches__btn">Conoce al Equipo</button>
          </div>
          <div className="coaches__cards">
            <div className="coach-card">
              <div className="coach-card__image">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq7AGymI5k2s1ya-LjWesfi4pot7Tr9T0XL4XrW4MLXNko841EAH0_z6aO1pWP6psFwbTnsDYvaJNcVsvqjYcDC6C_VkpM0rMJZHwoxF15PtCfh3wr10AIOUTMoPtW7SziJikevUruew76ynsDYAEplQ0e4U4R1bEt5mvhWTjsfIlw2tgsaMrjhJL9wYto_Vh9aaabpWUYRN3jNvp30l6TLQ1roKDh8a6LUYXVISkgl5PYROeS6bsBQoh71NUdGxE8uzB3usm7EjQ" alt="Marcus Sterling" />
                <div className="coach-card__overlay">
                  <h4>Marcus Sterling</h4>
                  <p>Director de la Academia</p>
                </div>
              </div>
            </div>
            <div className="coach-card coach-card--offset">
              <div className="coach-card__image">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq7z9afDb5J-F84MM9XwdtxO6sNEH-EZUOJmb6hRIkVai2MCw8MH2vhAg1k3Dp-PfQKk_JYYvjQ4YQIqEwUCuoc35UOdgkKcG_wvNMGKt4cKIHDx7b3q0xbKpSJ2xahBnjttkVkGCADNhGYNltkXGmlXVZt6SsOjRAeWZ_WI3V7ZBsNDPEmD_SAr4aFOMUDmcDaBjMHed35q6rHBoL7PhgmpW94S0bBqNqUs1Q98Wzv1X7hwF8lLy23tN4N6xRgVuNPccKZghMP1g" alt="Elena Rossi" />
                <div className="coach-card__overlay">
                  <h4>Elena Rossi</h4>
                  <p>Directora Técnica</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section className="enrollment">
        <div className="enrollment__card">
          <div className="enrollment__gradient-corner" />
          <div className="enrollment__header">
            <h2 className="enrollment__title">ÚNETE A LA ACADEMIA</h2>
            <p className="enrollment__subtitle">Completa el formulario a continuación para comenzar tu sesión de prueba.</p>
          </div>
          <form className="enrollment__form" onSubmit={handleEnroll}>
            <div className="enrollment__row">
              <div className="enrollment__field">
                <label>Nombre Completo del Atleta *</label>
                <input type="text" placeholder="Ej. Juan Pérez" value={formData.name} onChange={e => setFormData(d => ({ ...d, name: e.target.value }))} />
              </div>
              <div className="enrollment__field">
                <label>Fecha de Nacimiento *</label>
                <input type="date" value={formData.dob} onChange={e => setFormData(d => ({ ...d, dob: e.target.value }))} />
              </div>
              <div className="enrollment__field">
                <label>Correo del Padre/Tutor *</label>
                <input type="email" placeholder="email@ejemplo.com" value={formData.email} onChange={e => setFormData(d => ({ ...d, email: e.target.value }))} />
              </div>
              <div className="enrollment__field">
                <label>Nivel de Entrenamiento</label>
                <select value={formData.level} onChange={e => setFormData(d => ({ ...d, level: e.target.value }))}>
                  <option value="Descubrimiento (6-9)">Descubrimiento (6-9)</option>
                  <option value="Desarrollo (10-13)">Desarrollo (10-13)</option>
                  <option value="Rendimiento (14-18)">Rendimiento (14-18)</option>
                </select>
              </div>
            </div>
            <div className="enrollment__field">
              <label>Experiencia Previa / Notas Médicas</label>
              <textarea placeholder="Cuéntanos sobre tu trayectoria en el fútbol..." rows={4} value={formData.notes} onChange={e => setFormData(d => ({ ...d, notes: e.target.value }))} />
            </div>

            {enrollError && <p style={{ color: 'var(--error)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span className="material-symbols-outlined">error</span> {enrollError}</p>}
            {enrollDone && <p style={{ color: '#00c864', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,200,100,0.1)', padding: '1rem', borderRadius: '8px' }}><span className="material-symbols-outlined">check_circle</span> Solicitud enviada con éxito. Nos pondremos en contacto pronto.</p>}

            <div className="enrollment__submit-wrap">
              <button type="submit" className="btn btn--primary btn--lg enrollment__submit-btn" disabled={enrolling || enrollDone}>
                {enrolling ? 'Enviando...' : enrollDone ? 'Inscripción Enviada ✓' : 'ENVIAR INSCRIPCIÓN'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="faq__inner">
          <div className="faq__left">
            <h2 className="faq__title">Preguntas Frecuentes</h2>
            <p className="faq__desc">Preguntas comunes sobre nuestros programas e instalaciones.</p>
            <div className="faq__help-card">
              <span className="material-symbols-outlined faq__help-icon">support_agent</span>
              <h5>¿Necesitas más ayuda?</h5>
              <p>Nuestro equipo de soporte está disponible 24/7 para responder dudas específicas.</p>
            </div>
          </div>
          <div className="faq__right">
            {faqs.map((faq, i) => (
              <div className="faq-item" key={i}>
                <button className="faq-item__toggle" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined">{openFaq === i ? 'remove' : 'add'}</span>
                </button>
                {openFaq === i && faq.a && (
                  <div className="faq-item__answer">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


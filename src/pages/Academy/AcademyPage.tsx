import { useState } from 'react';
import './AcademyPage.css';

export default function AcademyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: 'What equipment do I need to bring?', a: 'Players should bring cleats, shin guards, a labeled water bottle, and a positive attitude. Training kits are provided upon successful enrollment in the full term.' },
    { q: 'Are there scholarship opportunities?', a: '' },
    { q: 'Can parents watch the training sessions?', a: '' },
    { q: 'What happens in case of bad weather?', a: '' },
  ];

  const sessions = [
    { day: 'Mon', date: 16, title: 'Technical Foundations', time: '16:30 - 18:00 • Pitch A', spots: '4 Spots Left', available: true, accent: 'primary' },
    { day: 'Tue', date: 17, title: 'Striker & Keeper Specialized', time: '17:00 - 18:30 • Pitch B', spots: 'Full', available: false, accent: 'secondary' },
    { day: 'Wed', date: 18, title: 'Game Intelligence & Tactics', time: '18:00 - 19:30 • Main Stadium', spots: '12 Spots Left', available: true, accent: 'tertiary' },
  ];

  return (
    <main className="academy">
      {/* Hero */}
      <section className="academy-hero">
        <div className="academy-hero__grid">
          <div className="academy-hero__text">
            <span className="academy-hero__eyebrow">Fuel Your Potential</span>
            <h1 className="academy-hero__title">
              ELITE <br /><span className="academy-hero__title--accent">MOMENTUM</span> <br />ACADEMY
            </h1>
            <p className="academy-hero__desc">Professional-grade training for the next generation of soccer stars. Build speed, precision, and tactical intelligence.</p>
            <div className="academy-hero__actions">
              <button className="btn btn--primary btn--lg academy-hero__enroll-btn">Enroll Now</button>
              <button className="btn btn--ghost btn--lg">View Levels</button>
            </div>
          </div>
          <div className="academy-hero__image-wrap">
            <div className="academy-hero__bg-shape" />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWSVvAoA4-4qEkirTehXUNfkOfVuNK7FGtaRkdcOjO-FyDY4YimAjd8liKKkgNWdvQmmeV6r4ujv37eSWw54Z3e2JZo4TRQJG2XoU7usAPv3aUJK81EPX4HxPm_Cje2wztW6QrpLxSJsz8sh2T15BUJ--wKDSh4NPxz8ezD-NGcNmNraB746V-5WJERChTlUx_2MCch7b7HoZLcW6kJWFlQwfDEBxNHEMujLVjnZJSZtFeLM2D-Zys6l1OM2NBWFsNRuBPx9gnMek"
              alt="Young soccer player in motion"
              className="academy-hero__img"
            />
          </div>
        </div>
      </section>

      {/* Training Pathways */}
      <section className="pathways">
        <div className="pathways__inner">
          <div className="pathways__header">
            <h2 className="pathways__title">TRAINING PATHWAYS</h2>
            <div className="pathways__bar" />
          </div>
          <div className="pathways__grid">
            {/* Discovery */}
            <div className="pathway pathway--discovery">
              <div>
                <span className="pathway__badge pathway__badge--tertiary">Ages 6 - 9</span>
                <h3 className="pathway__name">Discovery Phase</h3>
                <p className="pathway__desc">Focusing on fundamental motor skills, ball mastery, and the joy of the game.</p>
                <ul className="pathway__list">
                  <li><span className="material-symbols-outlined pathway__check">check_circle</span> 1v1 Ball Mastery</li>
                  <li><span className="material-symbols-outlined pathway__check">check_circle</span> Coordination Drills</li>
                  <li><span className="material-symbols-outlined pathway__check">check_circle</span> Fun Small-Sided Games</li>
                </ul>
              </div>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuACQ6s9nGUtEsVI-eTVRlrT8tFAX28yNokSUX-h4zeOZ8hsty7xYjmu6e_XjSStzEeXTysOjtO9_2GrkJ9vLKLqa642RYW_zjCZLja6mBnVcGQoaRmdv4huB2YOvc-srIJgQdVWLR7fC-UWBMtb7MQI9aKRbF4zUaV1UAgThnZzL6ku7qGGygpR-uocFiYu_JOWEHFCa3tqlUozWPh33wrVjMGz3CwKUrUQvtWqpf4oQHUhbZPSmjGfZB3UsPV4sAvcjVcznolrLeY" alt="Young kids playing" className="pathway__img" />
            </div>

            {/* Development */}
            <div className="pathway pathway--development">
              <div className="pathway__row">
                <div className="pathway__row-text">
                  <span className="pathway__badge pathway__badge--primary">Ages 10 - 13</span>
                  <h3 className="pathway__name">Development Core</h3>
                  <p className="pathway__desc">Transitioning into tactical awareness and positional play.</p>
                  <button className="pathway__link">
                    Learn More <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjNGxv2K-4dCi3tsow_VsozhzPAwwko7YwoImXjXZGEHeaOfdSbLah3Bh-p_0G9-ZgPJvWud0WXAmHJ0F6whrd5Fp_QWQJlLkaUbl1DP8mWODWLMw5QjiW1rNgrBJtxkebBQ5Y7aPxWmUbXZPlNGDzE-KCRd5yRcTTbI7xipHpS3RzwzDNxLCwCDiLytFjsJ1e7YBMKreCKZv9x4sbCAm83YWQnvkbsgAYEb0JJn8N2XIfQHe9DyRgNfN25bFXSnQoH7HmGDK8blY" alt="Youth team huddle" className="pathway__row-img" />
              </div>
            </div>

            {/* Performance */}
            <div className="pathway pathway--performance">
              <div className="pathway__row">
                <div className="pathway__row-text">
                  <span className="pathway__badge pathway__badge--white">Ages 14 - 18</span>
                  <h3 className="pathway__name">Performance Elite</h3>
                  <p className="pathway__desc">Advanced tactical setups, physical conditioning, and collegiate preparation.</p>
                </div>
                <div className="pathway__stats">
                  <div className="pathway__stat">
                    <div className="pathway__stat-value">100%</div>
                    <div className="pathway__stat-label">Tactical Focus</div>
                  </div>
                  <div className="pathway__stat">
                    <div className="pathway__stat-value">PRO</div>
                    <div className="pathway__stat-label">Scouting Network</div>
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
              <h2 className="schedule__title">TRAINING SCHEDULE</h2>
              <p className="schedule__subtitle">Find the perfect session for your pace.</p>
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
                    <div className="session__avail-label">Availability</div>
                    <div className="session__avail-value">{s.spots}</div>
                  </div>
                  {s.available ? (
                    <button className="session__book-btn">Book Session</button>
                  ) : (
                    <button className="session__waitlist-btn" disabled>Waitlist</button>
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
            <h2 className="coaches__title">THE MINDS <br />BEHIND THE <br />MOMENTUM</h2>
            <p className="coaches__desc">Learn from former professionals and UEFA licensed coaches dedicated to your growth.</p>
            <button className="coaches__btn">Meet the Team</button>
          </div>
          <div className="coaches__cards">
            <div className="coach-card">
              <div className="coach-card__image">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq7AGymI5k2s1ya-LjWesfi4pot7Tr9T0XL4XrW4MLXNko841EAH0_z6aO1pWP6psFwbTnsDYvaJNcVsvqjYcDC6C_VkpM0rMJZHwoxF15PtCfh3wr10AIOUTMoPtW7SziJikevUruew76ynsDYAEplQ0e4U4R1bEt5mvhWTjsfIlw2tgsaMrjhJL9wYto_Vh9aaabpWUYRN3jNvp30l6TLQ1roKDh8a6LUYXVISkgl5PYROeS6bsBQoh71NUdGxE8uzB3usm7EjQ" alt="Marcus Sterling" />
                <div className="coach-card__overlay">
                  <h4>Marcus Sterling</h4>
                  <p>Head of Academy</p>
                </div>
              </div>
            </div>
            <div className="coach-card coach-card--offset">
              <div className="coach-card__image">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq7z9afDb5J-F84MM9XwdtxO6sNEH-EZUOJmb6hRIkVai2MCw8MH2vhAg1k3Dp-PfQKk_JYYvjQ4YQIqEwUCuoc35UOdgkKcG_wvNMGKt4cKIHDx7b3q0xbKpSJ2xahBnjttkVkGCADNhGYNltkXGmlXVZt6SsOjRAeWZ_WI3V7ZBsNDPEmD_SAr4aFOMUDmcDaBjMHed35q6rHBoL7PhgmpW94S0bBqNqUs1Q98Wzv1X7hwF8lLy23tN4N6xRgVuNPccKZghMP1g" alt="Elena Rossi" />
                <div className="coach-card__overlay">
                  <h4>Elena Rossi</h4>
                  <p>Technical Director</p>
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
            <h2 className="enrollment__title">JOIN THE ACADEMY</h2>
            <p className="enrollment__subtitle">Fill out the form below to start your trial session.</p>
          </div>
          <form className="enrollment__form" onSubmit={(e) => e.preventDefault()}>
            <div className="enrollment__row">
              <div className="enrollment__field">
                <label>Athlete Name</label>
                <input type="text" placeholder="Full Name" />
              </div>
              <div className="enrollment__field">
                <label>Date of Birth</label>
                <input type="date" />
              </div>
              <div className="enrollment__field">
                <label>Parent/Guardian Email</label>
                <input type="email" placeholder="email@example.com" />
              </div>
              <div className="enrollment__field">
                <label>Training Level</label>
                <select>
                  <option>Discovery (6-9)</option>
                  <option>Development (10-13)</option>
                  <option>Performance (14-18)</option>
                </select>
              </div>
            </div>
            <div className="enrollment__field">
              <label>Previous Experience / Medical Notes</label>
              <textarea placeholder="Tell us about your soccer journey..." rows={4} />
            </div>
            <div className="enrollment__submit-wrap">
              <button type="submit" className="btn btn--primary btn--lg enrollment__submit-btn">SUBMIT ENROLLMENT</button>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="faq__inner">
          <div className="faq__left">
            <h2 className="faq__title">FAQ</h2>
            <p className="faq__desc">Common questions about our programs and facilities.</p>
            <div className="faq__help-card">
              <span className="material-symbols-outlined faq__help-icon">support_agent</span>
              <h5>Need more help?</h5>
              <p>Our support team is available 24/7 to answer specific queries.</p>
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

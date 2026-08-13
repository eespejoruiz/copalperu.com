import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider';
import { useModal } from '../components/Layout/Layout';
import Footer from '../components/Footer/Footer';
import data from '../data.json';
import dataEs from '../data.es.json';
import '../sass/sustainability.scss';

const Sustainability = () => {
  const { locale } = useI18n();
  const { openModal } = useModal();
  const src = locale === 'es' ? dataEs : data;
  const p = src.sustainabilityPage;
  const footerData = src.footerData;
  const home = locale === 'es' ? '/es' : '/';

  useEffect(() => {
    const prevTitle = document.title;
    document.title = p.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    const prevDesc = desc ? desc.getAttribute('content') : null;
    if (desc) desc.setAttribute('content', p.meta.description);
    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
      if (desc && prevDesc) desc.setAttribute('content', prevDesc);
    };
  }, [p]);

  return (
    <main className="wrapper sustainability-page">
      {/* Hero */}
      <header className="sus-hero">
        <div className="sus-hero__bg" style={{ backgroundImage: `url(${p.hero.image})` }} aria-hidden="true"></div>
        <div className="container sus-hero__inner">
          <nav className="sus-breadcrumb" aria-label="Breadcrumb">
            <Link to={home}>{locale === 'es' ? 'Inicio' : 'Home'}</Link>
            <span aria-hidden="true"> / </span>
            <span>{p.hero.title}</span>
          </nav>
          <span className="sus-eyebrow">{p.hero.eyebrow}</span>
          <h1 className="sus-hero__title">{p.hero.title}</h1>
          <p className="sus-hero__subtitle">{p.hero.subtitle}</p>
        </div>
      </header>

      {/* Intro */}
      <section className="sus-section">
        <div className="container">
          <h2 className="section-title text-center">{p.intro.title}</h2>
          <div className="sus-prose">
            {p.intro.paragraphs.map((t, i) => <p key={i}>{t}</p>)}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="sus-section sus-section--muted">
        <div className="container">
          <div className="sus-grid">
            {p.commitments.map((c, i) => (
              <article className="sus-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="sus-card__icon"><Icon icon={c.icon} /></div>
                <h3 className="sus-card__title">{c.title}</h3>
                <p className="sus-card__text">{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Harvest */}
      <section className="sus-section">
        <div className="container">
          <div className="row align-items-center sus-split">
            <div className="col-lg-6">
              <h2 className="section-title">{p.harvest.title}</h2>
              <div className="sus-prose">
                {p.harvest.paragraphs.map((t, i) => <p key={i}>{t}</p>)}
              </div>
              <ul className="sustainability-list">
                {p.harvest.points.map((pt, i) => (
                  <li className="sustainability-item" key={i}>
                    <Icon icon="mdi:check-circle" className="check-icon" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6">
              <img src={p.harvest.image} alt={p.harvest.title} className="img-fluid rounded sus-img" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="sus-section sus-section--muted">
        <div className="container">
          <div className="sus-cert">
            <div className="sus-cert__badge"><Icon icon="mdi:certificate" /></div>
            <div>
              <h2 className="section-title">{p.certification.title}</h2>
              <p className="sus-prose">{p.certification.text}</p>
              <p className="sus-cert__note">{p.certification.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community stats */}
      <section className="sus-section">
        <div className="container">
          <h2 className="section-title text-center">{p.community.title}</h2>
          <p className="sus-prose text-center">{p.community.text}</p>
          <div className="sus-stats">
            {p.community.stats.map((s, i) => (
              <div className="sus-stat" key={i}>
                <span className="sus-stat__value">{s.value}</span>
                <span className="sus-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sus-cta">
        <div className="container text-center">
          <h2 className="sus-cta__title">{p.cta.title}</h2>
          <p className="sus-cta__text">{p.cta.text}</p>
          <button className="btn btn-secondary cta-button" onClick={openModal}>{p.cta.buttonText}</button>
        </div>
      </section>

      <Footer data={footerData} />
    </main>
  );
};

export default Sustainability;

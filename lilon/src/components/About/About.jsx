import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useModal } from '../Layout/Layout';
import { useI18n } from '../../i18n/I18nProvider';

const About = ({ data }) => {
  const { openModal } = useModal();

  const handleContactClick = (e) => {
    e.preventDefault();
    openModal();
  };
  const { t } = useI18n();
  return (
    <section id="what-is-black-copal" className="section about-section">
      <div className="container">
        <div className="row gy-5 align-items-center" data-aos="fade-up" data-aos-duration="400" data-aos-delay="100">
          {/* Left Column - Image */}
          <div className="col-lg-6">
            <div className="about-image" data-aos="fade-right" data-aos-duration="400" data-aos-delay="150">
              <img 
                src="/images/home-banner.png" 
                alt={t('sections.about.image_alt')}
                className="img-fluid rounded"
              />
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div className="col-lg-6">
            <div className="about-content" data-aos="fade-left" data-aos-duration="400" data-aos-delay="200">
              <h2 className="section-title mb-4">{t('sections.about.title')}</h2>
              
              <p className="lead mb-4" dangerouslySetInnerHTML={{ __html: t('sections.about.lead') }} />
              
              <p className="mb-4">{t('sections.about.paragraph2')}</p>
              
              {/* Bullet Points */}
              <ul className="copal-features mb-5">
                <li className="feature-item" data-aos="fade-up" data-aos-duration="300" data-aos-delay="250">
                  <Icon icon="mdi:leaf" className="feature-icon" />
                  <span>{t('sections.about.bullet1')}</span>
                </li>
                <li className="feature-item" data-aos="fade-up" data-aos-duration="300" data-aos-delay="300">
                  <Icon icon="mdi:fire" className="feature-icon" />
                  <span>{t('sections.about.bullet2')}</span>
                </li>
                <li className="feature-item" data-aos="fade-up" data-aos-duration="300" data-aos-delay="350">
                  <Icon icon="mdi:sparkles" className="feature-icon" />
                  <span>{t('sections.about.bullet3')}</span>
                </li>
                <li className="feature-item" data-aos="fade-up" data-aos-duration="300" data-aos-delay="400">
                  <Icon icon="mdi:earth" className="feature-icon" />
                  <span>{t('sections.about.bullet4')}</span>
                </li>
              </ul>
              
              {/* CTA Button */}
              <div className="btn-bar" data-aos="fade-up" data-aos-duration="400" data-aos-delay="450">
                <button 
                  onClick={handleContactClick}
                  className="px-btn px-btn-primary"
                  aria-label={t('sections.about.cta_aria')}
                >
                  {t('sections.about.cta_text')}
                  <Icon icon="bi:arrow-up-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

About.propTypes = {
  data: PropTypes.object,
};

export default About;

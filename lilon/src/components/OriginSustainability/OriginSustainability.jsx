import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { getParallaxStyles } from '../../utils/deviceDetection';
import { useI18n } from '../../i18n/I18nProvider';

const OriginSustainability = ({ data }) => {
  const { title, intro, harvestTitle, harvestPoints, globalTitle, globalText, timeline, cta, image } = data;
  const { t } = useI18n();

  return (
    <section id="origin-sustainability" className="origin-sustainability-section parallax-section">
      {/* Parallax Background */}
      <div className="parallax-bg" style={getParallaxStyles('/images/bg-origen.webp', { opacity: 0.8 })}></div>
      
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="intro-text text-center mb-5">
              <h2 className="section-title">{title}</h2>
              <p className="section-description">{intro}</p>
            </div>
          </div>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-lg-6">
            <div className="sustainability-content">
              <h3 className="content-subtitle">{harvestTitle}</h3>
              <p className="mb-4">{t('sections.origin.practices_intro')}</p>
              <ul className="sustainability-list">
                {harvestPoints.map((point, index) => (
                  <li key={index} className="sustainability-item">
                    <Icon icon="mdi:check-circle" className="check-icon" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="sustainability-image">
              <img 
                src={image.src} 
                alt={image.alt}
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-lg-12">
            <h3 className="content-subtitle text-center mb-4">{globalTitle}</h3>
            <p className="text-center mb-5">{globalText}</p>
            
            <div className="timeline-container">
              <div className="timeline">
                {timeline.map((step, index) => (
                  <div key={index} className="timeline-item" data-aos="fade-up" data-aos-delay={index * 200}>
                    <div className="timeline-icon">
                      <Icon icon={step.icon} />
                    </div>
                    <div className="timeline-content">
                      <h4 className="timeline-title">{step.title}</h4>
                      <p className="timeline-description">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 text-center">
            <a 
              href={cta.link} 
              className="btn btn-secondary cta-button"
              aria-label={cta.ariaLabel}
            >
              {cta.text}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

OriginSustainability.propTypes = {
  data: PropTypes.object.isRequired,
};

export default OriginSustainability;
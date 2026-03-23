import PropTypes from 'prop-types';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useI18n } from '../../i18n/I18nProvider';
import { useModal } from '../Layout/Layout';
import { getParallaxStyles } from '../../utils/deviceDetection';

const UsesAndBenefits = ({ data }) => {
  const { title, intro, benefits, howToBurn, popularBlends, cta } = data;
  const { t } = useI18n();
  const { openModal } = useModal();

  const handleContactClick = (e) => {
    e.preventDefault();
    openModal();
  };

  return (
    <section id="uses-benefits" className="section uses-benefits-section parallax-section">
      {/* Parallax Background */}
      <div className="parallax-bg" style={getParallaxStyles('/images/bg-sirve.webp', { opacity: 0.8 })}></div>
      
      <div className="container">
        <SectionHeading title={title} subTitle={t('nav.uses')} />
        
        {/* Intro Text */}
        <div className="row mb-5">
          <div className="col-lg-10 mx-auto">
            <p className="intro-text text-center" data-aos="fade-up" data-aos-duration="400">
              {intro}
            </p>
          </div>
        </div>

        {/* Benefits Accordion */}
        <div className="accordion accordion-flush mb-5" id="accordion_benefits">
          {benefits.map((element, index) => (
            <div
              className="accordion-item"
              key={index}
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-delay={index * 100}
            >
              <div className="accordion-header">
                <button
                  className={`accordion-button ${
                    element.triger !== 'One' ? 'collapsed' : ''
                  }`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${element.triger}`}
                  aria-expanded={`${element.triger === 'One' ? 'true' : 'false'}`}
                  aria-controls={`${element.triger}`}
                >
                  <span className="services-title">{element.title}</span>
                  <span className="services-small-desc">{element.heading}</span>
                  <span className="accordion-icon" />
                </button>
              </div>
              <div
                id={`${element.triger}`}
                className={`accordion-collapse collapse ${
                  element.triger === 'One' ? 'show' : ''
                }`}
                data-bs-parent="#accordion_benefits"
              >
                <div className="accordion-body">
                  <div className="row gy-4">
                    <div className="col-sm-6 col-md-4">
                      <div className="s-img">
                        <img
                          src={element.imgLink}
                          title={element.imgTitle || ""}
                          alt={element.imgAlt || `Black copal resin for ${element.title.toLowerCase()}`}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-8">
                      <div className="s-text">{element.text}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How to Burn Section */}
        <div className="how-to-burn-section mb-5" data-aos="fade-up" data-aos-duration="400">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <h3 className="text-center mb-4">{howToBurn.title}</h3>
              <ol className="burn-steps">
                {howToBurn.steps.map((step, index) => (
                  <li key={index} className="burn-step" data-aos="fade-up" data-aos-duration="300" data-aos-delay={index * 100}>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="safety-note mt-4" data-aos="fade-up" data-aos-duration="300">
                <em>{howToBurn.safetyNote}</em>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Blends Section */}
        <div className="popular-blends-section mb-5" data-aos="fade-up" data-aos-duration="400">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h3 className="mb-4">{popularBlends.title}</h3>
              <div className="blends-chips">
                {popularBlends.blends.map((blend, index) => (
                  <span 
                    key={index} 
                    className="blend-chip"
                    data-aos="fade-up" 
                    data-aos-duration="300" 
                    data-aos-delay={index * 100}
                  >
                    {blend}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section text-center" data-aos="fade-up" data-aos-duration="400">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div className="cta-buttons">
                <button 
                  onClick={handleContactClick}
                  className="btn btn-primary me-3 mb-3"
                  aria-label={cta.shopButton.ariaLabel}
                >
                  {cta.shopButton.text}
                </button>
                <a 
                  href="https://wa.me/51937189509"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary mb-3"
                  aria-label={cta.wholesaleButton.ariaLabel}
                >
                  {cta.wholesaleButton.text}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* JSON-LD Schema */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How do you burn black copal resin?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Light a charcoal disc until it glows, place it in a heat-safe burner, and add a small piece of black copal. Let it smolder with proper ventilation and never leave it unattended."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is black copal used for?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Traditional uses include energy cleansing, protection, meditation, and creating aromatic ambiance in sacred and wellness spaces."
                  }
                }
              ]
            })
          }}
        />
      </div>
    </section>
  );
};

UsesAndBenefits.propTypes = {
  data: PropTypes.object.isRequired,
};

export default UsesAndBenefits;
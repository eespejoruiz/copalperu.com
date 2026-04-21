import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useModal } from '../Layout/Layout';

const WhoWeAre = ({ data }) => {
  const { title, intro, commitmentTitle, commitmentPoints, whyChooseTitle, whyChooseIntro, whyChoosePoints, closingText, cta, image } = data;
  const { openModal } = useModal();

  const handleContactClick = (e) => {
    e.preventDefault();
    openModal();
  };

  return (
    <section id="who-we-are" className="section who-we-are-section">
      <div className="container">
        <div className="row gy-5 align-items-center" data-aos="fade-up" data-aos-duration="400" data-aos-delay="100">
          {/* Left Column - Image */}
          <div className="col-lg-6">
            <div className="who-we-are-image" data-aos="fade-right" data-aos-duration="400" data-aos-delay="150">
              <img 
                src={image.src} 
                alt={image.alt}
                className="img-fluid rounded"
              />
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div className="col-lg-6">
            <div className="who-we-are-content" data-aos="fade-left" data-aos-duration="400" data-aos-delay="200">
              <h2 className="section-title mb-4">{title}</h2>
              
              <p className="lead mb-4">
                {intro}
              </p>
              
              {/* Our Commitment Section */}
              <h3 className="content-subtitle mb-3">{commitmentTitle}</h3>
              <ul className="commitment-list mb-4">
                {commitmentPoints.map((point, index) => (
                  <li key={index} className="commitment-item" data-aos="fade-up" data-aos-duration="300" data-aos-delay={250 + (index * 50)}>
                    <span className="commitment-icon">{point.icon}</span>
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
              
              {/* Why Choose Us Section */}
              <h3 className="content-subtitle mb-3">{whyChooseTitle}</h3>
              <p className="mb-3">{whyChooseIntro}</p>
              <ul className="why-choose-list mb-4">
                {whyChoosePoints.map((point, index) => (
                  <li key={index} className="why-choose-item" data-aos="fade-up" data-aos-duration="300" data-aos-delay={350 + (index * 50)}>
                    <Icon icon="mdi:check-circle" className="why-choose-icon" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              
              {/* Closing Text */}
              <p className="closing-text mb-4">
                {closingText}
              </p>
              
              {/* CTA Button */}
              <div className="btn-bar" data-aos="fade-up" data-aos-duration="400" data-aos-delay="450">
                <button 
                  onClick={handleContactClick}
                  className="px-btn px-btn-primary"
                  aria-label={cta.ariaLabel}
                >
                  {cta.text}
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

WhoWeAre.propTypes = {
  data: PropTypes.object.isRequired,
};

export default WhoWeAre;
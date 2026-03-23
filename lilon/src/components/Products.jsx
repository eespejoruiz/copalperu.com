import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useModal } from './Layout/Layout';
import { useI18n } from '../i18n/I18nProvider';

const Products = ({ data }) => {
  const { openModal } = useModal();
  const { t } = useI18n();

  const handleContactClick = (e) => {
    e.preventDefault();
    openModal();
  };

  if (!data) return null;

  // Take only the first 3 products for the card display
  const featuredProducts = data.products.slice(0, 3);

  return (
    <section id="products" className="products-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{data.title}</h2>
          <p className="section-intro">{data.intro}</p>
        </div>

        <div className="products-cards-container">
          {featuredProducts.map((product, index) => (
            <div 
              key={index} 
              className="product-card"
              data-aos="fade-up" 
              data-aos-duration="400" 
              data-aos-delay={100 + (index * 100)}
            >
              <div className="product-image">
                <img 
                  src={product.image || '/images/copal-default.webp'} 
                  alt={product.imageAlt || product.title}
                  loading="lazy"
                />
                <div className="product-overlay">
                  <div className="overlay-content">
                    <h4>{t('sections.products.overlay_premium')}</h4>
                    <p>{t('sections.products.overlay_serfor')}</p>
                  </div>
                </div>
              </div>
              
              <div className="product-content">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                
                {product.features && product.features.length > 0 && (
                  <ul className="product-highlights">
                    {product.features.slice(0, 2).map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                )}
                
                <div className="product-cta">
                  <a 
                    href={product.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary product-btn"
                    aria-label={`${product.ctaText} for ${product.title}`}
                  >
                    <FaShoppingCart />
                    {product.ctaText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data.bottomCta && (
          <div className="products-bottom-cta">
            <p className="bottom-cta-text">{data.bottomCta.text}</p>
            <button 
              onClick={handleContactClick}
              className="btn btn-secondary"
              aria-label={data.bottomCta.ariaLabel}
            >
              {data.bottomCta.buttonText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
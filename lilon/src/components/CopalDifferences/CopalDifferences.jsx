import React, { useState, useEffect } from 'react';
import { useModal } from '../Layout/Layout';
import { useI18n } from '../../i18n/I18nProvider';

const CopalDifferences = ({ data }) => {
  const [openAccordions, setOpenAccordions] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const { openModal } = useModal();
  const { locale } = useI18n();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('copal-differences');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const toggleAccordion = (blockType, attributeName) => {
    const key = `${blockType}-${attributeName}`;
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const ComparisonTable = ({ comparisonData, blockType }) => {
    return (
      <div className="comparison-block">
        <h3 className="comparison-title">{comparisonData.title}</h3>
        <p className="comparison-intro">{comparisonData.intro}</p>
        
        {/* Desktop Table */}
        <div className={`comparison-table ${isVisible ? 'animate' : ''}`}>
          <div className="table-header">
            <div className="header-cell">Attribute</div>
            <div className="header-cell">{comparisonData.leftColumn.title}</div>
            <div className="header-cell">{comparisonData.rightColumn.title}</div>
          </div>
          {comparisonData.attributes.map((attribute, index) => (
            <div key={index} className="table-row" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="table-cell attribute-cell">
                <i className={`icon ${attribute.icon}`}></i>
                {attribute.name}
              </div>
              <div className="table-cell value-cell">{attribute.leftValue}</div>
              <div className="table-cell value-cell">{attribute.rightValue}</div>
            </div>
          ))}
        </div>

        {/* Mobile Accordion */}
        <div className="comparison-accordion">
          {comparisonData.attributes.map((attribute, index) => {
            const accordionKey = `${blockType}-${attribute.name}`;
            const isOpen = openAccordions[accordionKey];
            
            return (
              <div key={index} className="accordion-item">
                <div 
                  className="accordion-header"
                  onClick={() => toggleAccordion(blockType, attribute.name)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleAccordion(blockType, attribute.name);
                    }
                  }}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-content-${accordionKey}`}
                >
                  <div className="attribute-name">
                    <i className={`icon ${attribute.icon}`}></i>
                    {attribute.name}
                  </div>
                  <i className={`chevron mdi mdi-chevron-down ${isOpen ? 'open' : ''}`}></i>
                </div>
                <div 
                  id={`accordion-content-${accordionKey}`}
                  className={`accordion-content ${isOpen ? 'open' : ''}`}
                  aria-hidden={!isOpen}
                >
                  <div className="content-grid">
                    <div className="content-cell">
                      <div className="cell-title">{comparisonData.leftColumn.title}</div>
                      <div className="cell-value">{attribute.leftValue}</div>
                    </div>
                    <div className="content-cell">
                      <div className="cell-title">{comparisonData.rightColumn.title}</div>
                      <div className="cell-value">{attribute.rightValue}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (!data) return null;

  // FAQ content for JSON-LD (bilingual)
  const faqEn = [
    {
      "@type": "Question",
      name: "What is the difference between Peruvian and Mexican copal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Peruvian copal comes from the Amazon rainforest and is harvested by Achuar communities in Iquitos. It has an earthy, resinous, balsamic aroma with dense smoke. Mexican copal is primarily harvested in Oaxaca and has a sweeter, citrusy, lighter aroma. Peruvian copal is certified and harvested under SERFOR forest plans, while Mexican copal is often wild-collected with less standardization."
      }
    },
    {
      "@type": "Question",
      name: "What is the difference between black copal and white copal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Black copal (copal negro) is dark brown to black with a deep, earthy, balsamic aroma that produces thick, heavy white smoke. It's best for energy cleansing, protection, and grounding rituals. White copal (copal blanco) is pale, golden or white with a sweet, citrusy, uplifting aroma that produces lighter, more delicate smoke. It's ideal for clarity, illumination, and raising vibrations."
      }
    },
    {
      "@type": "Question",
      name: "Which type of copal is best for meditation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Black copal is excellent for deep meditation and heavy ceremonies due to its grounding properties and thick smoke. White copal is better for daily rituals and gentle meditation with its uplifting and clarifying properties. Amazonian black copal from Peru is particularly prized for spiritual practices due to its potency and sustainable harvesting methods."
      }
    },
    {
      "@type": "Question",
      name: "Is Peruvian copal more sustainable than other types?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Peruvian copal is harvested under certified SERFOR forest management plans, ensuring sustainable practices that protect the Amazon rainforest. The Achuar communities of Iquitos use traditional methods that have been passed down for generations, maintaining ecological balance while preserving the resin's potency."
      }
    }
  ];
  const faqEs = [
    {
      "@type": "Question",
      name: "¿Cuál es la diferencia entre el copal peruano y el copal mexicano?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El copal peruano proviene de la selva amazónica y es recolectado por comunidades Achuar en Iquitos. Tiene un aroma terroso, resinoso y balsámico con humo denso. El copal mexicano se recolecta principalmente en Oaxaca y presenta un aroma más dulce, cítrico y ligero. El copal peruano está certificado y se recolecta bajo planes forestales SERFOR, mientras que el copal mexicano suele ser de recolección silvestre con menos estandarización."
      }
    },
    {
      "@type": "Question",
      name: "¿Cuál es la diferencia entre el copal negro y el copal blanco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El copal negro es marrón oscuro a negro, con un aroma profundo, terroso y balsámico que produce humo blanco denso y pesado. Es ideal para limpieza energética, protección y rituales de arraigo. El copal blanco es pálido, dorado o blanco, con un aroma dulce, cítrico y elevador que produce humo más ligero y delicado; es ideal para claridad, iluminación y elevar vibraciones."
      }
    },
    {
      "@type": "Question",
      name: "¿Qué tipo de copal es mejor para la meditación?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El copal negro es excelente para meditación profunda y ceremonias intensas por sus propiedades de arraigo y su humo espeso. El copal blanco es mejor para rituales diarios y meditación suave por sus propiedades elevadoras y clarificadoras. El copal negro amazónico del Perú es particularmente apreciado en prácticas espirituales por su potencia y cosecha sostenible."
      }
    },
    {
      "@type": "Question",
      name: "¿El copal peruano es más sostenible que otros tipos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, el copal peruano se recolecta bajo planes de manejo forestal certificados por SERFOR, garantizando prácticas sostenibles que protegen la selva amazónica. Las comunidades Achuar de Iquitos utilizan métodos tradicionales transmitidos por generaciones, manteniendo el equilibrio ecológico y preservando la potencia de la resina."
      }
    }
  ];
  const faq = locale === 'es' ? faqEs : faqEn;

  return (
    <>
      <section id="copal-differences" className="copal-differences-section">
        <div className="container">
          <h2 className="section-title">{data.title}</h2>
          
          <ComparisonTable 
            comparisonData={data.peruVsMexico} 
            blockType="peru-mexico"
          />
          
          <ComparisonTable 
            comparisonData={data.blackVsWhite} 
            blockType="black-white"
          />
          
          <div className="closing-section">
            <p className="closing-text">{data.closingText}</p>
            <div className="cta-buttons">
              {data.cta.map((button, index) => {
                // Si es el botón de cotización mayorista, usar el modal
                if (button.link === "/wholesale") {
                  return (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        openModal();
                      }}
                      className={`btn ${button.type}`}
                      aria-label={button.ariaLabel}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      {button.text}
                    </button>
                  );
                }
                
                // Para otros botones, usar enlace normal
                return (
                  <a
                    key={index}
                    href={button.link}
                    className={`btn ${button.type}`}
                    aria-label={button.ariaLabel}
                    target={button.link.startsWith('http') ? '_blank' : '_self'}
                    rel={button.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    {button.text}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema for FAQ SEO (bilingual) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faq
          })
        }}
      />
    </>
  );
};

export default CopalDifferences;
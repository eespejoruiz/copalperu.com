import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './LeadModal.scss';
import { heroData } from '../../data.json';

const LeadModal = ({ isOpen, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Fallback: si no carga en X segundos, mostramos error
  useEffect(() => {
    if (!isLoaded) {
      const timer = setTimeout(() => {
        if (!isLoaded) {
          setHasError(true);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, isOpen]);

  // Close modal when clicking on backdrop
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="lead-modal-overlay"
      onClick={handleBackdropClick}
      style={{
        visibility: isOpen ? 'visible' : 'hidden',
        pointerEvents: isOpen ? 'auto' : 'none',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out',
      }}
    >
      <div className="lead-modal-container">
        <div className="lead-modal-header">
          <h3>Contact Us</h3>
          <button 
            className="lead-modal-close" 
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className={`lead-modal-content ${!isLoaded && !hasError ? 'is-loading' : ''} ${hasError ? 'has-error' : ''}`}>
          {hasError && (
            <div className="lead-fallback">
              <h4>Problemas cargando el formulario</h4>
              <p>
                Estamos teniendo dificultades para cargar el formulario embebido. Puedes abrirlo directamente en una nueva pestaña:
              </p>
              <a
                className="lead-fallback-button"
                href="https://link.up-sells.com/widget/form/55g4wtKfzxYC3dtsZ6Bc"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir formulario
              </a>
              <div className="lead-fallback-alt">
                <p>O contáctanos directamente:</p>
                <p>
                  Email: <a href={`mailto:${heroData.email}`}>{heroData.email}</a>
                </p>
                <p>
                  WhatsApp: <a href={`https://wa.me/${heroData.phoneNumber.replace(/\s+/g, '').replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer">{heroData.phone}</a>
                </p>
              </div>
            </div>
          )}
          <iframe 
            src="https://link.up-sells.com/widget/form/55g4wtKfzxYC3dtsZ6Bc" 
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '4px'
            }}
            loading="eager"
            onLoad={() => { setIsLoaded(true); setHasError(false); }}
            onError={() => { setHasError(true); }}
            referrerPolicy="no-referrer"
            id="inline-55g4wtKfzxYC3dtsZ6Bc" 
            data-layout="{'id':'INLINE'}" 
            data-trigger-type="alwaysShow" 
            data-trigger-value="" 
            data-activation-type="alwaysActivated" 
            data-activation-value="" 
            data-deactivation-type="neverDeactivate" 
            data-deactivation-value="" 
            data-form-name="" 
            data-height="undefined" 
            data-layout-iframe-id="inline-55g4wtKfzxYC3dtsZ6Bc" 
            data-form-id="55g4wtKfzxYC3dtsZ6Bc" 
            title="Contact Form"
          />
        </div>
      </div>
    </div>
  );
};

LeadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LeadModal;
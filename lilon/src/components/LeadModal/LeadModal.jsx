import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './LeadModal.scss';

const FORM_URL = 'https://api-saas.selvagencia.com/api/v1/public/forms/copalperucom/view';

const LeadModal = ({ isOpen, onClose }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    // Auto-resize del iframe según la altura que reporta el form (postMessage)
    const handleMessage = (e) => {
      if (
        e.data &&
        e.data.type === 'selva-form-height' &&
        e.data.slug === 'copalperucom' &&
        iframeRef.current
      ) {
        iframeRef.current.style.height = e.data.height + 'px';
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      window.addEventListener('message', handleMessage);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('message', handleMessage);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div
      className={`lead-modal-overlay ${isOpen ? 'is-open' : ''}`}
      onClick={handleBackdropClick}
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

        <div className="lead-modal-content">
          {isOpen && (
            <iframe
              ref={iframeRef}
              src={FORM_URL}
              title="Copal Peru — Contacto"
              loading="lazy"
              allowTransparency="true"
              style={{
                width: '100%',
                border: 'none',
                minHeight: '520px',
                borderRadius: '16px',
                background: 'transparent',
              }}
            />
          )}
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

import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './LeadModal.scss';

const LeadModal = ({ isOpen, onClose }) => {
  // Referencia al div donde inyectaremos el script del SaaS
  const formContainerRef = useRef(null);

  useEffect(() => {
    // Cerrar con tecla Escape
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevenir scroll de fondo

      // 1. Inyectar el script del SaaS dinámicamente si el modal está abierto
      if (formContainerRef.current && !formContainerRef.current.hasChildNodes()) {
        const script = document.createElement('script');
        script.src = 'https://api-saas.selvagencia.com/api/v1/public/forms/copalperucom/embed.js';
        script.async = true;
        formContainerRef.current.appendChild(script);

        // 2. Geolocalización e Inyección del País (mismo método que usamos antes)
        fetch('https://ipapi.co/json/')
          .then(response => response.json())
          .then(data => {
            const countryName = data.country_name;
            
            const waitForForm = setInterval(() => {
              const countryInput = document.querySelector('input[name="country"]');
              if (countryInput) {
                countryInput.value = countryName;
                clearInterval(waitForForm);
              }
            }, 500);

            setTimeout(() => clearInterval(waitForForm), 10000); // Stop after 10s
          })
          .catch(error => console.error("Error obteniendo ubicación:", error));
      }

    } else {
      // 3. Limpieza: Vaciar el contenedor cuando se cierra el modal 
      // para que vuelva a cargar limpio la próxima vez
      if (formContainerRef.current) {
        formContainerRef.current.innerHTML = '';
      }
    }

    // Cleanup del useEffect
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Cerrar al hacer clic fuera del modal
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`lead-modal-overlay ${isOpen ? 'is-open' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className="lead-modal-container">
        
        {/* Mantenemos el Header original con el botón de cerrar (X) */}
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
           {/* Contenedor desnudo: Aquí adentro se dibujará el formulario del SaaS */}
           <div id="selva-form-copalperucom" ref={formContainerRef} className="saas-form-wrapper"></div>
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
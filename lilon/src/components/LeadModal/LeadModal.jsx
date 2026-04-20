import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './LeadModal.scss';

const LeadModal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState({ loading: false, error: null, success: false });
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: '',
    sms_consent: false
  });
  
  // Referencias para controlar el renderizado del reCAPTCHA en el Modal
  const captchaRef = useRef(null);
  const widgetIdRef = useRef(null);

  // Manejo de eventos del teclado (Escape) y renderizado del Captcha
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevenir scroll de fondo
      
      // Función para renderizar explícitamente el reCAPTCHA
      const renderCaptcha = () => {
         if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
            if (captchaRef.current && widgetIdRef.current === null) {
               try {
                  widgetIdRef.current = window.grecaptcha.render(captchaRef.current, {
                     sitekey: '6Ld5gassAAAAALBRofkCUY9gROxxWFL5FWi1nc-j'
                  });
               } catch (error) {
                  console.error('Error rendering reCAPTCHA:', error);
               }
            }
         } else {
            // Reintentar si grecaptcha no está listo o no tiene render()
            setTimeout(renderCaptcha, 100);
         }
      };

      // Cargar script de Google si no existe
      const scriptId = 'recaptcha-script';
      let script = document.getElementById(scriptId);

      if (!script) {
         script = document.createElement('script');
         script.id = scriptId;
         script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
         script.async = true;
         script.defer = true;
         script.onload = () => setTimeout(renderCaptcha, 200);
         document.body.appendChild(script);
      } else {
         // Si el script ya existe, intentamos renderizar (con un pequeño delay por seguridad)
         setTimeout(renderCaptcha, 100);
      }

    } else {
       // Resetear el captcha y limpiar estado cuando se cierra el modal
       if (window.grecaptcha && widgetIdRef.current !== null) {
          window.grecaptcha.reset(widgetIdRef.current);
       }
       setStatus({ loading: false, error: null, success: false });
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Función invisible para dispositivo
  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "Tablet";
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "Mobile";
    return "Desktop";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let recaptchaResponse = '';
    if (window.grecaptcha && widgetIdRef.current !== null) {
       recaptchaResponse = window.grecaptcha.getResponse(widgetIdRef.current);
    }
    
    if (!recaptchaResponse) {
      setStatus({ loading: false, error: 'Please verify that you are not a robot.', success: false });
      return;
    }

    setStatus({ loading: true, error: null, success: false });

    // Extracción silenciosa de IP
    let userCountry = 'Unknown';
    try {
      const geoResponse = await fetch('https://ipapi.co/json/');
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        userCountry = geoData.country_name || 'Unknown';
      }
    } catch (error) {
      console.log('No se pudo obtener la geolocalización');
    }

    const templateParams = {
      origen: 'Copal Peru',
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      sms_consent: formData.sms_consent ? 'Yes' : 'No',
      country: userCountry,
      device: getDeviceType(),
      'g-recaptcha-response': recaptchaResponse
    };

    const payload = {
      service_id: 'service_tmd8buu',
      template_id: 'template_rmj664s',
      user_id: 'qFap-U1RnzrPNslJi',
      template_params: templateParams
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus({ loading: false, error: null, success: true });
        setFormData({ first_name: '', last_name: '', email: '', phone: '', message: '', sms_consent: false });
        if (window.grecaptcha && widgetIdRef.current !== null) window.grecaptcha.reset(widgetIdRef.current);
      } else {
        const errText = await response.text();
        setStatus({ loading: false, error: errText, success: false });
        if (window.grecaptcha && widgetIdRef.current !== null) window.grecaptcha.reset(widgetIdRef.current);
      }
    } catch (error) {
      setStatus({ loading: false, error: 'Network error. Please try again.', success: false });
      if (window.grecaptcha && widgetIdRef.current !== null) window.grecaptcha.reset(widgetIdRef.current);
    }
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
          {status.success && (
            <div className="status-message success">
              Thank you! Your message has been sent successfully.
            </div>
          )}
          
          {status.error && (
            <div className="status-message error">
              {status.error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: status.success ? 'none' : 'block' }}>
            <div className="form-row">
              <input type="text" name="first_name" placeholder="First Name *" required value={formData.first_name} onChange={handleChange} />
              <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} />
            </div>
            
            <input type="email" name="email" placeholder="Email *" required value={formData.email} onChange={handleChange} />
            <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
            
            <textarea name="message" placeholder="Message *" rows="3" required value={formData.message} onChange={handleChange}></textarea>
            
            {/* reCAPTCHA */}
            <div className="captcha-container">
               <div ref={captchaRef}></div>
            </div>

            {/* Checkbox SMS */}
            <div className="sms-consent-wrapper">
              <input 
                type="checkbox" 
                id="sms_consent" 
                name="sms_consent" 
                checked={formData.sms_consent} 
                onChange={handleChange} 
              />
              <label htmlFor="sms_consent">
                I Consent to Receive SMS Notifications, Alerts & Occasional Marketing Communication from company. Message frequency varies. Message & data rates may apply.
              </label>
            </div>

            {/* Botón */}
            <button 
              type="submit" 
              className="submit-button"
              disabled={status.loading}
            >
              {status.loading ? 'sending...' : 'send message'}
            </button>
          </form>
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
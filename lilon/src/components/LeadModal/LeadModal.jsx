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
                     sitekey: '6Ld3massAAAAAHblsnwKq0FuYn5FjagIQAUJQfI9'
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

  // Objeto de estilos minimalistas solicitado
  const inputStyle = {
    width: '100%',
    padding: '12px 0',
    marginBottom: '20px',
    border: 'none',
    borderBottom: '1px solid #9a948e',
    backgroundColor: 'transparent',
    color: '#9a948e',
    fontSize: '15px',
    outline: 'none',
    fontFamily: 'inherit',
    fontWeight: 'normal'
  };

  return (
    <div
      className="lead-modal-overlay"
      onClick={handleBackdropClick}
      style={{
        display: isOpen ? 'flex' : 'none',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 0.2s ease-in-out',
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}
    >
      <div 
        className="lead-modal-container" 
        style={{ 
          padding: '40px', 
          backgroundColor: '#fff', 
          borderRadius: '12px', 
          maxWidth: '550px', 
          width: '90%', 
          maxHeight: '90vh', 
          overflowY: 'auto' 
        }}
      >
        <div className="lead-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h3 style={{ margin: 0, color: '#333', fontSize: '24px', fontWeight: 'bold' }}>Contact Us</h3>
          <button 
            className="lead-modal-close" 
            onClick={onClose}
            aria-label="Close modal"
            style={{ background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: '#9a948e', padding: 0, lineHeight: 1 }}
          >
            ×
          </button>
        </div>
        
        <div className="lead-modal-content">
          {status.success && (
            <div style={{ padding: '15px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '20px', textAlign: 'center', border: '1px solid #c3e6cb' }}>
              Thank you! Your message has been sent successfully.
            </div>
          )}
          
          {status.error && (
            <div style={{ padding: '15px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '20px', textAlign: 'center', border: '1px solid #f5c6cb' }}>
              {status.error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: status.success ? 'none' : 'block' }}>
            <div style={{ display: 'flex', gap: '15px' }}>
              <input type="text" name="first_name" placeholder="First Name *" required value={formData.first_name} onChange={handleChange} style={inputStyle} />
              <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} style={inputStyle} />
            </div>
            
            <input type="email" name="email" placeholder="Email *" required value={formData.email} onChange={handleChange} style={inputStyle} />
            <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} style={inputStyle} />
            
            <textarea name="message" placeholder="Message *" rows="3" required value={formData.message} onChange={handleChange} style={{ ...inputStyle, resize: 'none' }}></textarea>
            
            {/* reCAPTCHA renderizado vía Referencia */}
            <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
               <div ref={captchaRef}></div>
            </div>

            {/* Checkbox de Consentimiento SMS */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '30px' }}>
              <input 
                type="checkbox" 
                id="sms_consent" 
                name="sms_consent" 
                checked={formData.sms_consent} 
                onChange={handleChange} 
                style={{ marginTop: '3px', cursor: 'pointer' }} 
              />
              <label htmlFor="sms_consent" style={{ color: '#e0e0e0', fontSize: '13px', lineHeight: '1.5', fontWeight: 'normal', cursor: 'pointer', margin: 0 }}>
                I Consent to Receive SMS Notifications, Alerts & Occasional Marketing Communication from company. Message frequency varies. Message & data rates may apply.
              </label>
            </div>

            {/* Botón Minimalista */}
            <button 
              type="submit" 
              disabled={status.loading}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: 'normal',
                cursor: status.loading ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.3s',
                opacity: status.loading ? 0.7 : 1,
                textTransform: 'lowercase'
              }}
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
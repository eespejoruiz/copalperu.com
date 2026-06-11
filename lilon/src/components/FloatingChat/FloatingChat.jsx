import React, { useState } from 'react';
import { FaComments, FaWhatsapp, FaTelegram, FaComment, FaWeixin } from 'react-icons/fa';
import './FloatingChat.scss';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const showQRModal = () => {
    setIsQRModalOpen(true);
  };

  const closeQRModal = () => {
    setIsQRModalOpen(false);
  };

  const handleWhatsAppClick = (event) => {
    // Permitir que el enlace funcione normalmente
    // Solo reportar conversión si gtag está disponible
    if (typeof window !== 'undefined' && typeof window.gtag_report_conversion === 'function') {
      window.gtag_report_conversion('https://wa.me/51937189509');
    }
    // No prevenir el comportamiento por defecto para que el enlace funcione
  };

  const safeGtagReportConversion = (url) => {
    if (typeof window !== 'undefined' && typeof window.gtag_report_conversion === 'function') {
      window.gtag_report_conversion(url);
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <>
      <div className={`floating-chat ${isOpen ? 'is-open' : ''}`}>
        <button 
          className="chat-toggle" 
          onClick={toggleChat}
          aria-label="Toggle chat options"
        >
          <FaComments />
        </button>
        <div className="chat-options">
          <a 
            href="https://wa.me/51937189509" 
            target="_blank" 
            rel="noopener noreferrer"
            className="chat-option whatsapp" 
            onClick={handleWhatsAppClick}
          >
            <FaWhatsapp />
            <span>WhatsApp</span>
          </a>
          <a 
            href="https://t.me/munaykiresinas" 
            target="_blank" 
            rel="noopener noreferrer"
            className="chat-option telegram"
          >
            <FaTelegram />
            <span>Telegram</span>
          </a>
          <a 
            href="https://open.kakao.com/o/sMunayKi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="chat-option kakaotalk"
          >
            <FaComment />
            <span>KakaoTalk</span>
          </a>
          <button 
            className="chat-option wechat" 
            onClick={() => setIsQRModalOpen(true)}
          >
            <FaWeixin />
            <span>WeChat</span>
          </button>
        </div>
      </div>

      {/* QR Modal */}
      {isQRModalOpen && (
        <div className="qr-modal" onClick={closeQRModal}>
          <div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeQRModal}>&times;</button>
            <img 
              src="/images/qrwechatmunay.webp" 
              alt="WeChat QR Code" 
              title="WeChat QR Code" 
              className="qr-code"
            />
            <p>Escanea el código QR para chatear en WeChat</p>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChat;
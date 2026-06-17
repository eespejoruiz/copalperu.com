import PropTypes from 'prop-types';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { socialData } from '../../data.json';
import { useModal } from '../Layout/Layout';
import '../LeadModal/ContactButton.scss';
import { useI18n } from '../../i18n/I18nProvider';

const Header = ({ data }) => {
  const { openModal } = useModal();
  const { t, locale } = useI18n();
  const location = useLocation();

  const handleContactClick = (e) => {
    e.preventDefault();
    openModal();
  };
  const { logoDark, logoLight } = data;

  const [mobileToggle, setMobileToggle] = useState(false);

  const handleMobileToggle = (e) => {
    e?.stopPropagation?.();
    setMobileToggle(!mobileToggle);
  };

  const handleNavClick = () => {
    setMobileToggle(false);
  };

  return (
    <header>
      {/* Mob header */}
      <div className="mob-header">
        <div className="mob-h-left">
          <Link className="navbar-brand" to="/">
            <img className="logo-dark" title="Copal Peru" alt="Copal Peru Logo" src={logoDark} />
            <img className="logo-light" title="Copal Peru" alt="Copal Peru Logo" src={logoLight} />
          </Link>
        </div>
        <div className="mob-h-right">
          <button className="toggler-menu" onClick={handleMobileToggle}>
            <span />
          </button>
        </div>
      </div>
      {/* End */}
      {/* Header Top */}
      <div
        className={`header-left-fixed one-page-nav ${
          mobileToggle ? 'menu-open' : ''
        }`}
      >
        {/* Brand */}
        <div className="logo">
          <Link className="navbar-brand" to="/">
            <img
              className="logo-dark"
              title="Copal Peru"
              alt="Copal Peru Logo"
              src={logoDark}
            />
            <img
              className="logo-light"
              title="Copal Peru"
              alt="Copal Peru Logo"
              src={logoLight}
            />
          </Link>
        </div>
        {/* / */}
        <ul className="main-menu">
          <li>
            <ScrollLink
              to="home"
              spy={true}
              duration={500}
              onClick={() => setMobileToggle(false)}
            >
              {locale === 'es' ? 'Inicio' : 'Home'}
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="what-is-black-copal"
              spy={true}
              duration={500}
              onClick={() => setMobileToggle(false)}
            >
              {t('nav.what_is')}
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="uses-benefits"
              spy={true}
              duration={500}
              onClick={() => setMobileToggle(false)}
            >
              {t('nav.uses')}
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="origin-sustainability"
              spy={true}
              duration={500}
              onClick={() => setMobileToggle(false)}
            >
              {t('nav.origin')}
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="who-we-are"
              spy={true}
              duration={500}
              onClick={() => setMobileToggle(false)}
            >
              {t('nav.who')}
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="products"
              spy={true}
              duration={500}
              onClick={() => setMobileToggle(false)}
            >
              {t('nav.products')}
            </ScrollLink>
          </li>
          <li>
            <button
              onClick={handleContactClick}
              className="contact-nav-button"
            >
              {t('nav.contact')}
            </button>
          </li>
          <li>
            {/* Language switch navigates to / or /es */}
            {locale === 'es' ? (
              <Link to="/" className="contact-nav-button" onClick={() => setMobileToggle(false)}>EN</Link>
            ) : (
              <Link to="/es" className="contact-nav-button" onClick={() => setMobileToggle(false)}>ES</Link>
            )}
          </li>
        </ul>
        <ul className="nav social-link">
          {socialData.map((element, index) => (
            <li key={index}>
              <a href={element.link} target="_blank" rel="noopener noreferrer">
                <Icon icon={`fa6-brands:${element.icon}`} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* End Header Top */}
    </header>
  );
};

Header.propTypes = {
  data: PropTypes.object,
};

export default Header;

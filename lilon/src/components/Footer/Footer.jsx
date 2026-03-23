import PropTypes from 'prop-types';
import { useI18n } from '../../i18n/I18nProvider';

const Footer = ({ data }) => {
  const { ImgLink, name, websiteLinks, address } = data;
  const { t } = useI18n();
  const date = new Date;
  const currentYear = date.getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-info">
          <div className="footer-avatar">
            <img src={ImgLink} title="" alt={name || "Copal Peru"} />
          </div>
          <h6>{t('footer.name')}</h6>
          <p className="footer-address">{t('footer.address')}</p>
          {websiteLinks && (
            <div className="footer-links">
              <h6>{name ? `Links to ${name}` : 'Links'}</h6>
              <ul>
                {websiteLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <p className="copyright">© {currentYear} copyright all right reserved</p>
      </div>
    </footer>
  )
}
Footer.propTypes = {
  data: PropTypes.object
}

export default Footer;

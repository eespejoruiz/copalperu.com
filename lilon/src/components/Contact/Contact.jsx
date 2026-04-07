import PropTypes from "prop-types"
import { Icon } from "@iconify/react";
import SectionHeading from "../SectionHeading/SectionHeading";
import { useI18n } from "../../i18n/I18nProvider";

const Contact = ({ data }) => {
  const { contactInfo } = data;
  const { t } = useI18n();

  return (
    <section
      id="contact"
      data-scroll-index={5}
      className="section contact-section"
    >
      <div className="container">
        <div className="row gy-5 justify-content-center">
          <div className="col-lg-8">
            <SectionHeading title={t('sections.contact.title')} subTitle={t('sections.contact.subtitle')} />
            <div className="contact-info">
              <ul className="d-flex justify-content-center align-items-stretch gap-3 flex-wrap flex-md-nowrap">
                {contactInfo.map((element, index) => (
                  <li key={index} data-aos="fade-up" data-aos-duration="800" data-aos-delay="400" className="flex-fill d-flex contact-card" style={{maxWidth: '320px', minWidth: '300px', margin: '0', overflow: 'hidden'}}>
                    <div className="d-flex w-100 align-items-start">
                      <div className="icon flex-shrink-0">
                        <Icon icon={`bi:${element.icon}`} />
                      </div>
                      <div className="text flex-grow-1" style={{wordWrap: 'break-word', overflowWrap: 'break-word', minWidth: '0'}}>
                        <label style={{display: 'block', lineHeight: '1.3', marginBottom: '8px'}}>{element.title}</label>
                        <p style={{lineHeight: '1.4', wordBreak: 'break-word', hyphens: 'auto'}}>
                          {element.text}
                        </p>
                        {element.emailLink &&
                          <p style={{lineHeight: '1.4', wordBreak: 'break-all'}}>
                            <a
                              className="text-reset"
                              href={`mailto:${element.emailLink}`}
                              style={{wordBreak: 'break-all'}}
                            >
                              {element.emailLink}
                            </a>
                          </p>
                        }
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

Contact.propTypes = {
  data: PropTypes.object
}

export default Contact;
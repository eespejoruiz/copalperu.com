import PropTypes from "prop-types"
import { Icon } from "@iconify/react";
import SectionHeading from "../SectionHeading/SectionHeading";
import { useI18n } from "../../i18n/I18nProvider";
import { useState } from "react";


const Contact = ({ data }) => {
  const { contactInfo, contactForm } = data;
  const { t } = useI18n();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Handler for input field changes
  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    formData.append("access_key", "fcc74231-656a-425b-a54f-aff38354fadb");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false)
    }
  };
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

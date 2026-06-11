import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import perser from 'html-react-parser';
import { useModal } from '../Layout/Layout';
import { useI18n } from '../../i18n/I18nProvider';


const Hero = ({ data }) => {
  const { title, subTitle, phone, phoneNumber, email, socialData } = data;
  const { openModal } = useModal();
  const { locale } = useI18n();

  const handleContactClick = (e) => {
    e.preventDefault();
    openModal();
  };

  // Crear enlace de WhatsApp
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\s+/g, '').replace(/\+/g, '')}`;

  // Determinar partes del título según el idioma
  const titlePrefix = locale === 'es' ? 'Bienvenido al' : 'Welcome to';
  const titleSecond = locale === 'es' ? '' : 'Amazonian ';
  const titleSuffix = locale === 'es' ? ' Amazónico...' : '...';

  // Generar valores únicos para cada partícula con delays completamente únicos
  const generateUniqueParticleValues = () => {
    const particles = [];
    const usedDelays = new Set();
    const usedCombinations = new Set();
    
    for (let i = 0; i < 69; i++) {
      let unique = false;
      let attempts = 0;
      let particleData;
      
      while (!unique && attempts < 200) {
        // Generar delay único garantizado - cada partícula tendrá un delay diferente
        let delay;
        let delayAttempts = 0;
        do {
          // Usar distribución más amplia y precisa para evitar duplicados
          delay = Math.round((i * 0.072 + Math.random() * 4.8) * 100) / 100; // 0-10s con alta precisión
          delayAttempts++;
        } while (usedDelays.has(delay) && delayAttempts < 50);
        
        // Si no se pudo generar delay único, usar valor forzado único
        if (usedDelays.has(delay)) {
          delay = Math.round((i * 0.145) * 100) / 100; // Delay forzado único basado en índice
        }
        
        const duration = Math.round((5 + (i * 0.25) + Math.random() * 18) * 100) / 100; // 5-23s con mayor rango
        const x = Math.round((-350 + (i * 10.14) + Math.random() * 300) * 10) / 10; // -350 a +350px más distribuido
        const y = Math.round((-300 - (i * 8.7) - Math.random() * 600) * 10) / 10; // -300 a -1200px más variado
        const rotate = Math.round((i * 5.22 + Math.random() * 220) * 10) / 10; // 0-360° con mayor aleatoriedad
        const scale = Math.round((0.1 + (i * 0.022) + Math.random() * 1.4) * 100) / 100; // 0.1-1.7 más variado
        const opacity = Math.round((0.1 + (i * 0.014) + Math.random() * 0.8) * 100) / 100; // 0.1-0.9 más rango
        
        // Crear una clave única basada en los valores redondeados
        const combinationKey = `${delay}-${duration}-${x}-${y}-${rotate}-${scale}-${opacity}`;
        
        if (!usedCombinations.has(combinationKey)) {
          usedDelays.add(delay);
          usedCombinations.add(combinationKey);
          particleData = { delay, duration, x, y, rotate, scale, opacity };
          unique = true;
        }
        attempts++;
      }
      
      // Si no se pudo generar un valor único después de 200 intentos, usar valores forzados únicos
      if (!unique) {
        const forcedDelay = Math.round((i * 0.145) * 100) / 100;
        usedDelays.add(forcedDelay);
        particleData = {
          delay: forcedDelay,
          duration: 5 + (i * 0.26) % 18,
          x: -350 + (i * 10.14) % 700,
          y: -300 - (i * 8.7) % 900,
          rotate: (i * 5.22) % 360,
          scale: 0.1 + (i * 0.024) % 1.6,
          opacity: 0.1 + (i * 0.012) % 0.8
        };
      }
      
      particles.push(particleData);
    }
    
    return particles;
  };

  const uniqueParticles = generateUniqueParticleValues();

  return (
    <section id="home" className="home-section bg-dark">
      {/* Partículas de humo comentadas - ahora nacen desde Copal */}
      {/* <div className="smoke-particle-1"></div>
      <div className="smoke-particle-2"></div>
      <div className="smoke-particle-3"></div>
      <div className="smoke-particle-4"></div>
      <div className="smoke-particle-5"></div>
      <div className="smoke-particle-6"></div> */}
      
      <div className="container">
        <div className="row  min-vh-100 align-items-center">
          <div className="col-lg-7 col-xl-7 col-xxl-6">
            <div className="hb-text">
              <h1 data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
                {titlePrefix}<br />{titleSecond}
                <span style={{position: 'relative', display: 'inline-block'}}>
                  {/* Generar partículas con valores únicos garantizados - 69 total distribuidas */}
                  <span style={{position: 'relative', display: 'inline-block'}}>
                    C
                    {Array.from({length: 14}, (_, i) => {
                      const particleIndex = i; // Partículas 0-13 para C (14 partículas)
                      const particle = uniqueParticles[particleIndex];
                      
                      return (
                        <div 
                          key={`c-${i}`} 
                          className="spark-particle"
                          style={{
                            '--delay': `${particle.delay}s`,
                            '--duration': `${particle.duration}s`,
                            '--x': `${particle.x}px`,
                            '--y': `${particle.y}px`,
                            '--rotate': `${particle.rotate}deg`,
                            '--scale': particle.scale,
                            '--opacity': particle.opacity
                          }}
                        ></div>
                      );
                    })}
                  </span>
                  <span style={{position: 'relative', display: 'inline-block'}}>
                    o
                    {Array.from({length: 14}, (_, i) => {
                      const particleIndex = 14 + i; // Partículas 14-27 para O (14 partículas)
                      const particle = uniqueParticles[particleIndex];
                      
                      return (
                        <div 
                          key={`o-${i}`} 
                          className="spark-particle"
                          style={{
                            '--delay': `${particle.delay}s`,
                            '--duration': `${particle.duration}s`,
                            '--x': `${particle.x}px`,
                            '--y': `${particle.y}px`,
                            '--rotate': `${particle.rotate}deg`,
                            '--scale': particle.scale,
                            '--opacity': particle.opacity
                          }}
                        ></div>
                      );
                    })}
                  </span>
                  <span style={{position: 'relative', display: 'inline-block'}}>
                    p
                    {Array.from({length: 14}, (_, i) => {
                      const particleIndex = 28 + i; // Partículas 28-41 para P (14 partículas)
                      const particle = uniqueParticles[particleIndex];
                      
                      return (
                        <div 
                          key={`p-${i}`} 
                          className="spark-particle"
                          style={{
                            '--delay': `${particle.delay}s`,
                            '--duration': `${particle.duration}s`,
                            '--x': `${particle.x}px`,
                            '--y': `${particle.y}px`,
                            '--rotate': `${particle.rotate}deg`,
                            '--scale': particle.scale,
                            '--opacity': particle.opacity
                          }}
                        ></div>
                      );
                    })}
                  </span>
                  <span style={{position: 'relative', display: 'inline-block'}}>
                    a
                    {Array.from({length: 14}, (_, i) => {
                      const particleIndex = 42 + i; // Partículas 42-55 para A (14 partículas)
                      const particle = uniqueParticles[particleIndex];
                      
                      return (
                        <div 
                          key={`a-${i}`} 
                          className="spark-particle"
                          style={{
                            '--delay': `${particle.delay}s`,
                            '--duration': `${particle.duration}s`,
                            '--x': `${particle.x}px`,
                            '--y': `${particle.y}px`,
                            '--rotate': `${particle.rotate}deg`,
                            '--scale': particle.scale,
                            '--opacity': particle.opacity
                          }}
                        ></div>
                      );
                    })}
                  </span>
                  <span style={{position: 'relative', display: 'inline-block'}}>
                    l
                    {Array.from({length: 13}, (_, i) => {
                      const particleIndex = 56 + i; // Partículas 56-68 para L (13 partículas)
                      const particle = uniqueParticles[particleIndex];
                      
                      return (
                        <div 
                          key={`l-${i}`} 
                          className="spark-particle"
                          style={{
                            '--delay': `${particle.delay}s`,
                            '--duration': `${particle.duration}s`,
                            '--x': `${particle.x}px`,
                            '--y': `${particle.y}px`,
                            '--rotate': `${particle.rotate}deg`,
                            '--scale': particle.scale,
                            '--opacity': particle.opacity
                          }}
                        ></div>
                      );
                    })}
                  </span>
                  ...
                </span>
                {titleSuffix}
              </h1>
              <p className="lead" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">{perser(subTitle)}</p>
              <div className="btn-bar" data-aos="fade-up" data-aos-duration="800" data-aos-delay="500">
                <button onClick={handleContactClick} className="px-btn" aria-label={data.btnText}>
                  {data.btnText}
                  <Icon icon="bi:arrow-up-right" />
                </button>
              </div>
              <div className="info-bar" data-aos="fade-up" data-aos-duration="800" data-aos-delay="600">
                <p>
                  <Icon icon="bi-whatsapp" />
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>
                    <span>{phone}</span>
                  </a>
                </p>
                <p><Icon icon="bi-envelope" /><span>{email}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="social-fix">
        <div className="social-links" >
          {
            socialData.map((element, index) => (
              <a href={element.link} key={index} target="_blank" rel="noopener noreferrer">
                <Icon icon={`fa6-brands:${element.icon}`} />
              </a>
            ))
          }
        </div>
      </div>
    </section>
  )
}

Hero.propTypes = {
  data: PropTypes.object
}

export default Hero;

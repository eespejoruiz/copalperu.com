import { lazy, Suspense } from 'react';
import { useI18n } from "../i18n/I18nProvider";
import data from "../data.json";
import dataEs from "../data.es.json";

// 1. CARGA NORMAL (Crítico para el LCP - Above the fold)
import Hero from "../components/Hero/Hero";

// 2. CARGA DIFERIDA (No bloquea la carga inicial - Below the fold)
const About = lazy(() => import("../components/About/About"));
const UsesAndBenefits = lazy(() => import("../components/UsesAndBenefits/UsesAndBenefits"));
const OriginSustainability = lazy(() => import("../components/OriginSustainability/OriginSustainability"));
const CopalDifferences = lazy(() => import("../components/CopalDifferences/CopalDifferences"));
const WhoWeAre = lazy(() => import("../components/WhoWeAre/WhoWeAre"));
const Products = lazy(() => import("../components/Products"));
const Contact = lazy(() => import("../components/Contact/Contact"));
const Footer = lazy(() => import("../components/Footer/Footer"));

const Home = () => {
  const { locale } = useI18n();

  // Asignación de datos
  const heroData = locale === 'es' ? dataEs.heroData : data.heroData;
  const aboutData = data.aboutData;
  const usesAndBenefitsData = locale === 'es' ? dataEs.usesAndBenefitsData : data.usesAndBenefitsData;
  const copalDifferencesData = locale === 'es' ? dataEs.copalDifferencesData : data.copalDifferencesData;
  const contactData = locale === 'es' ? dataEs.contactData : data.contactData;
  const footerData = locale === 'es' ? dataEs.footerData : data.footerData;
  const originSustainabilityData = locale === 'es' ? dataEs.originSustainabilityData : data.originSustainabilityData;
  const whoWeAreData = locale === 'es' ? dataEs.whoWeAreData : data.whoWeAreData;
  const productsData = locale === 'es' ? dataEs.productsData : data.productsData;

  return (
    <>
      <main className="wrapper">
        {/* El Hero se renderiza inmediatamente */}
        <Hero data={heroData} />
        
        {/* El resto se descarga de fondo. El fallback puede ser un div vacío o un spinner */}
        <Suspense fallback={<div style={{ minHeight: '100vh' }}>Cargando contenido...</div>}>
          <About data={aboutData} />
          <UsesAndBenefits data={usesAndBenefitsData} />
          <OriginSustainability data={originSustainabilityData} />
          <CopalDifferences data={copalDifferencesData} />
          <WhoWeAre data={whoWeAreData} />
          <Products data={productsData} />
          <Contact data={contactData} />
          <Footer data={footerData} />
        </Suspense>
      </main>
    </>
  )
}

export default Home;
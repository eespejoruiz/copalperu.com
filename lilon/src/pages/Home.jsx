import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Products from "../components/Products";
import UsesAndBenefits from "../components/UsesAndBenefits/UsesAndBenefits";
import OriginSustainability from "../components/OriginSustainability/OriginSustainability";
import CopalDifferences from "../components/CopalDifferences/CopalDifferences";
import WhoWeAre from "../components/WhoWeAre/WhoWeAre";
import data from "../data.json";
import dataEs from "../data.es.json";
import { useI18n } from "../i18n/I18nProvider";


const Home = () => {
  const { locale } = useI18n();
  // Use Spanish data only for sections backed by data.es.json
  const heroData = locale === 'es' ? dataEs.heroData : data.heroData;
  const aboutData = data.aboutData; // About now uses i18n keys internally
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
        <Hero data={heroData} />
        <About data={aboutData} />
        <UsesAndBenefits data={usesAndBenefitsData} />
        <OriginSustainability data={originSustainabilityData} />
        <CopalDifferences data={copalDifferencesData} />
        <WhoWeAre data={whoWeAreData} />
        <Products data={productsData} />
        <Contact data={contactData} />
        <Footer data={footerData} />
      </main>
    </>
  )
}

export default Home;

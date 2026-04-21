import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import FloatingChat from './components/FloatingChat/FloatingChat';
import Home from './pages/Home';
import './sass/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import I18nProvider from './i18n/I18nProvider';

const App = () => {
  useEffect(() => {
    Aos.init({ once: true });
  }, []);
  const WithI18n = () => {
    const location = useLocation();
    return (
      <I18nProvider pathname={location.pathname}>
        <Routes>
          {/* English root */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
          {/* Spanish */}
          <Route path="/es" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
        <FloatingChat />
      </I18nProvider>
    );
  };
  return (
    <BrowserRouter>
      <WithI18n />
    </BrowserRouter>
  );
};

export default App;

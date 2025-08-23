import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import HolidayPackages from './pages/HolidayPackages';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import useInitializeScripts from './hooks/useInitializeScripts';
import './style.css';

function AppContent() {
  const location = useLocation();
  
  useInitializeScripts();

  // Add loaded class to body after page loads to re-enable animations
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.add('loaded');
    }, 2000); // Wait 2 seconds after page load

    return () => clearTimeout(timer);
  }, []);

  // Reinitialize scripts when route changes
  useEffect(() => {
    const timer = setTimeout(() => {
      // Reset initialization flag to allow reinitialization on route change
      if (window.globetrottersInitialized) {
        window.globetrottersInitialized = false;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/holiday-packages" element={<HolidayPackages />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
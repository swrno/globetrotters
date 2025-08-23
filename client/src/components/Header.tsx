import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Add scroll event listener for header movement
    const handleScroll = () => {
      const scroll = window.scrollY;
      const header = document.querySelector('header');
      if (scroll > 10) {
        header?.classList.add('headerMoveDown');
      } else {
        header?.classList.remove('headerMoveDown');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('menuOpen');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('menuOpen');
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path ? 'current-menu-item' : '';
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <Link className="logo" to="/">
            <img src="/images/logo.svg" alt="logo" />
          </Link>
          <button 
            className={`navbar-toggler ${!isMenuOpen ? 'collapsed' : ''}`}
            type="button" 
            onClick={toggleMenu}
            aria-controls="navbarSupportedContent" 
            aria-expanded={isMenuOpen} 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className={isActiveLink('/')}>
                <Link to="/" onClick={closeMenu}>home</Link>
              </li>
              <li className={isActiveLink('/holiday-packages')}>
                <Link to="/holiday-packages" onClick={closeMenu}>Holiday Packages</Link>
              </li>
              <li className={isActiveLink('/about')}>
                <Link to="/about" onClick={closeMenu}>About Us</Link>
              </li>
              <li className={isActiveLink('/faq')}>
                <Link to="/faq" onClick={closeMenu}>FAQ</Link>
              </li>
              <li className={isActiveLink('/contact')}>
                <Link to="/contact" onClick={closeMenu}>Contact Us</Link>
              </li>
            </ul>
            <button className="closebtn" onClick={closeMenu}>
              <img src="/images/closeicon.png" alt="" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

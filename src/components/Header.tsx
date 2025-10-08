import Link from 'next/link';
import CloseBtn from '../components/CloseBtn';
interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
  

  
  return (
    
    <header className="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <Link className="logo" href="/">
            <img src="/logo.svg" alt="logo" />
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className={currentPage === 'home' ? 'current-menu-item' : ''}>
                <Link href="/">home</Link>
              </li>
              <li className={currentPage === 'holiday-packages' ? 'current-menu-item' : ''}>
                <Link href="/holiday-packages">Holiday Packages</Link>
              </li>
              <li className={currentPage === 'about' ? 'current-menu-item' : ''}>
                <Link href="/about">About Us</Link>
              </li>
              <li className={currentPage === 'faq' ? 'current-menu-item' : ''}>
                <Link href="/faq">FAQ</Link>
              </li>
              <li className={currentPage === 'contact' ? 'current-menu-item' : ''}>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
            <CloseBtn/>
            {/* <button className="closebtn" type="button" onClick={closeMenuBtn}>
              <img src="/closeicon.png" alt="" />
            </button> */}
          </div>
        </nav>
      </div>
    </header>
  );
}
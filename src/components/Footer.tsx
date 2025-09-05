import Link from 'next/link';
import NewsletterSignup from './NewsletterSignup';

export default function Footer() {
  return (
    <footer className="footer gapsec">
      <div className="container">
        <div className="footerTop">
          <div className="row">
            <div className="col-lg-5">
              <h2>Subscribe to Our Newsletter</h2>
            </div>
            <div className="col-lg-7">
              <NewsletterSignup />
            </div>
          </div>
        </div>
        <div className="footerBot">
          <div className="footLogo">
            <Link href="/">
              <img src="/footlogo.png" alt="" />
            </Link>
          </div>
          <div className="footNav">
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/holiday-packages">Holiday Packages</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="socialsec">
            <ul>
              <li><Link href="#"><img src="/fb.svg" alt="" /></Link></li>
              <li><Link href="#"><img src="/insta.svg" alt="" /></Link></li>
              <li><Link href="#"><img src="/wh.svg" alt="" /></Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}